<?php

/**
 * Plugin Name: S Kanban
 * Plugin URI: https://kanbanplugin.com/
 * Description: Project Management Simplified
 * Version: 0.11.1
 * Author: S-Tier Dev
 * Author URI: https://stierdev.com/
 * License: GPLv2 or later
 */


// Include the update checker library
require plugin_dir_path(__FILE__) . 'plugin-update-checker/plugin-update-checker.php';

use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

// Initialize the update checker
$updateChecker = PucFactory::buildUpdateChecker(
    'https://github.com/ZeljkoSkipic/s-tier-kanban/', // Replace with your GitHub repo
    __FILE__,                                     // Full path to the main plugin file
    's-tier-kanban'                                   // Plugin slug
);

$updateChecker->setBranch('main'); // Change 'main' if your default branch is different


// Customize plugin action links
add_filter('plugin_action_links_s-tier-kanban/s-tier-kanban.php', 'stk_customize_plugin_action_links', 20); // Higher priority
add_filter('plugin_row_meta', 'stk_customize_plugin_row_meta', 20, 2); // Higher priority

function stk_customize_plugin_action_links($links) {
    // Your existing code in stk_add_settings_link will still run with priority 10
    return $links;
}

function stk_customize_plugin_row_meta($links, $file) {
    if ($file !== 's-tier-kanban/s-tier-kanban.php') {
        return $links;
    }

    // Remove "View details" link added by plugin-update-checker
    foreach ($links as $key => $link) {
        if (strpos($link, 'plugin-install.php?tab=plugin-information') !== false &&
            strpos($link, 'View details') !== false) {
            unset($links[$key]);
        }
    }

    // Add back "Visit plugin site" link
    $links[] = '<a href="https://kanbanplugin.com/" target="_blank">' . __('Visit plugin site', 'kanban') . '</a>';

    return $links;
}

// Plugin Path Constants

!defined('PLUGIN_ROOT_PATH') ? define('PLUGIN_ROOT_PATH', plugin_dir_path(__FILE__)) : "";
!defined('PLUGIN_ROOT_URL') ? define('PLUGIN_ROOT_URL', plugin_dir_url(__FILE__)) : "";


// Load plugin files

include_once plugin_dir_path(__FILE__) . 'admin/KanbanUpdate.php';
include_once plugin_dir_path(__FILE__) . 'admin/dashboard.php';
include_once plugin_dir_path(__FILE__) . 'post-types.php';
include_once plugin_dir_path(__FILE__) . 'admin/project.php';
include_once plugin_dir_path(__FILE__) . 'includes/clean-kanban-posts.php';

KanbanUpdate::init();

function stk_scripts()
{

	$is_kanban_page = is_singular('kanban-project');

	if (!$is_kanban_page && !is_kanban_profile_page()) return;

	// Enqueue the CSS file
	// wp_enqueue_style('s-tier-kanban-css', plugin_dir_url(__FILE__) . 's-tier-kanban.css');
	wp_enqueue_style('s-tier-kanban-css', PLUGIN_ROOT_URL . 'dist/index.min.css');

	// Enqueue the JS file
	wp_enqueue_script('s-tier-kanban-js-vendor', PLUGIN_ROOT_URL . 'dist/vendor.min.js', array('jquery'), false, true);
	wp_enqueue_script('s-tier-kanban-js', PLUGIN_ROOT_URL . 'dist/plugin.min.js', array('jquery', 's-tier-kanban-js-vendor', 'sortable-js'), false, true);

	wp_enqueue_script('sweetalert-js', plugin_dir_url(__FILE__) . 'assets/js/sweetalert/sweetalert2.min.js', array(), false, true);
	wp_enqueue_script('sortable-js', plugin_dir_url(__FILE__) . 'assets/js/sortable/sortable.js', array(), false, true);

	wp_localize_script('s-tier-kanban-js', 'myAjax', array(
		'ajaxurl' => admin_url('admin-ajax.php'),
		'security' => wp_create_nonce('s-tier-kanban-nonce'),
	));
}

function stk_admin_scripts()
{
	wp_enqueue_style('s-tier-kanban-admin-css', PLUGIN_ROOT_URL . 'assets/admin/admin.css');
	wp_enqueue_script('s-tier-kanban-admin-js', PLUGIN_ROOT_URL . 'assets/admin/admin.js', array(), false, true);

}
add_action('admin_enqueue_scripts', 'stk_admin_scripts');


add_action('wp_enqueue_scripts', 'stk_scripts');

// Create Column
function stk_add_column_callback()
{
	// Your nonce check and other validation here

	if (!wp_verify_nonce($_POST['security'], 's-tier-kanban-nonce')) {
		die(__('Security check', 'kanban'));
	} else {
		$projectId = intval($_POST['projectId']);
		$columnName = sanitize_text_field($_POST['columnName']);

		// Check column order

		$args = array(
			'post_type' => 'kanban_column',
			'posts_per_page' => 1,
			'orderby' => 'meta_value_num',
			'order' => 'DESC',
			'meta_key' => 'column_order',
			'meta_query' => array(
				array(
					'key' => 'associated_project_id',
					'value' => $projectId,
					'compare' => '='
				)
			)
		);
		$last_column_query = new WP_Query($args);
		$last_column_order = 0;
		if ($last_column_query->have_posts()) {
			$last_column_query->the_post();
			$last_column_order = (int) get_post_meta(get_the_ID(), 'column_order', true);
		}
		wp_reset_postdata();

		$new_column_order = $last_column_order + 1;

		// Create the new Kanban column as a post of type 'kanban_column'
		$column_id = wp_insert_post(array(
			'post_title'    => $columnName,
			'post_type'     => 'kanban_column',
			'post_status'   => 'publish',
			'meta_input'    => array(
				'associated_project_id' => $projectId, // Custom field to associate this column with a project,
				'column_order'			=> $new_column_order
			),
		));

		// Associate this column with a project using post meta
		if ($column_id && !is_wp_error($column_id)) {

			$column = get_post($column_id);
			global $post;
			$post = $column;
			setup_postdata($post);
			ob_start();
			include PLUGIN_ROOT_PATH . 'template-parts/column.php';
			$colum_html = ob_get_clean();
			wp_reset_postdata();
			wp_send_json_success(array('columnHtml' => $colum_html, 'columnID' => $column_id));
		} else {
			wp_send_json_error(array('message' => 'Failed to create column.'));
		}

		wp_send_json_success();
		wp_die();
	}
}
add_action('wp_ajax_stk_add_column', 'stk_add_column_callback');

function stk_update_column_title()
{
	if (!wp_verify_nonce($_POST['security'], 's-tier-kanban-nonce')) {
		die(__('Security check', 'kanban'));
	} else {

		if (!is_user_kanban_admin()) return  wp_send_json_error('You can not do that!', 403);

		$columnId = isset($_POST['columnId']) ? wp_strip_all_tags($_POST['columnId']) : 0;
		$columnTitle = isset($_POST['columnTitle']) ? wp_strip_all_tags($_POST['columnTitle']) : null;

		if (!$columnId) {
			wp_send_json_error('Failed to update card, missing card id');
		}

		$column_data = [
			'ID' => $columnId
		];

		if ($columnTitle !== null) {
			$column_data['post_title'] = $columnTitle;
		}

		$updated = wp_update_post($column_data);

		if ($updated) {
			wp_send_json_success();
		} else {
			wp_send_json_error('Failed to update column title.');
		}
	}

	die();
}

add_action('wp_ajax_stk_update_column_title', 'stk_update_column_title');


// Delete Column
function stk_delete_column_callback()
{
	check_ajax_referer('s-tier-kanban-nonce', 'security'); // Check the nonce for security

	if (!is_user_kanban_admin()) return  wp_send_json_error('You can not do that!', 403);

	$columnId = isset($_POST['columnId']) ? intval($_POST['columnId']) : 0;

	if ($columnId > 0) {
		wp_delete_post($columnId, true); // True: force delete, skipping trash
		wp_send_json_success();
	} else {
		wp_send_json_error(array('message' => 'Invalid column ID.'));
	}

	wp_die(); // Always end Ajax functions to prevent further execution
}
add_action('wp_ajax_stk_delete_column', 'stk_delete_column_callback');


// Create Card
function stk_add_card_callback()
{
	// Security and validation checks here...
	check_ajax_referer('s-tier-kanban-nonce', 'security');

	$columnId = isset($_POST['columnId']) ? intval($_POST['columnId']) : 0;
	$title = isset($_POST['title']) ? sanitize_text_field($_POST['title']) : '';

	// Determine the next card_order value for the new card
	$args = array(
		'post_type' => 'kanban_card',
		'posts_per_page' => 1,
		'orderby' => 'meta_value_num',
		'order' => 'DESC',
		'meta_key' => 'card_order',
		'meta_query' => array(
			array(
				'key' => 'associated_column_id',
				'value' => $columnId,
				'compare' => '='
			)
		)
	);
	$last_card_query = new WP_Query($args);
	$last_card_order = 0;
	if ($last_card_query->have_posts()) {
		$last_card_query->the_post();
		$last_card_order = (int) get_post_meta(get_the_ID(), 'card_order', true);
	}
	wp_reset_postdata();
	$new_card_order = $last_card_order + 1;

	// Create a new kanban_card post with the determined card_order
	$card_id = wp_insert_post(array(
		'post_title'    => $title,
		'post_content'  => '', // Use the static description
		'post_status'   => 'publish',
		'post_type'     => 'kanban_card',
		'meta_input'    => array(
			'associated_column_id' => $columnId,
			'card_order' => $new_card_order, // Include the card_order in the meta_input array
		),

	));

	if ($card_id && !is_wp_error($card_id)) {
		$card = get_post($card_id);
		global $post;
		$post = $card;
		setup_postdata($post);
		$status = get_post_meta(get_the_ID(), 'status', true);
		$priority = get_post_meta(get_the_ID(), 'priority', true);
		$title = get_the_title();
		$description = htmlspecialchars_decode(get_the_content());
		ob_start();
		include PLUGIN_ROOT_PATH . 'template-parts/card.php';
		$card_html = ob_get_clean();
		wp_reset_postdata();

		wp_send_json_success(array('cardId' => $card_id, 'cardOrder' => $new_card_order, 'cardHTML' => $card_html));
	} else {
		wp_send_json_error(array('message' => 'Failed to create card.'));
	}

	wp_die();
}
add_action('wp_ajax_stk_add_card', 'stk_add_card_callback');

// Delete Card
function stk_delete_card_callback()
{
	check_ajax_referer('s-tier-kanban-nonce', 'security'); // Check the nonce for security

	$cardId = isset($_POST['cardId']) ? intval($_POST['cardId']) : 0;
	$card_object = get_post($cardId);

	if ($card_object) {
		if (!is_user_kanban_creation($card_object->post_author) && !is_user_kanban_admin()) return  wp_send_json_error('You can not do that!', 403);

		wp_delete_post($cardId, true);
		wp_send_json_success();
	} else {
		wp_send_json_error('Provide valid comment ID', 400);
	}

	wp_die();
}
add_action('wp_ajax_stk_delete_card', 'stk_delete_card_callback');

// Reorder Columns

function stk_update_column_order_callback()
{
	check_ajax_referer('s-tier-kanban-nonce', 'security');

	$columnID = isset($_POST['columnID']) ? intval($_POST['columnID']) : 0;
	$newOrder = isset($_POST['newOrder']) ? $_POST['newOrder'] : array();

	// Update the order of cards in the new column
	foreach ($newOrder as $order => $id) {
		update_post_meta($id, 'column_order', $order);
	}

	wp_send_json_success();
	wp_die();
}
add_action('wp_ajax_stk_move_column', 'stk_update_column_order_callback');


// Reorder Cards

function stk_move_card_callback()
{
	// Security checks and nonce verification...

	$cardId = isset($_POST['cardId']) ? intval($_POST['cardId']) : 0;
	$newColumnId = isset($_POST['newColumnId']) ? intval($_POST['newColumnId']) : 0;
	// Assuming you're also sending the new order of all cards in the target column
	$newOrder = isset($_POST['newOrder']) ? $_POST['newOrder'] : array();

	// Update the card's associated column
	update_post_meta($cardId, 'associated_column_id', $newColumnId);

	// Update the order of cards in the new column
	foreach ($newOrder as $order => $id) {
		update_post_meta($id, 'card_order', $order);
	}

	wp_send_json_success();
	wp_die();
}
add_action('wp_ajax_stk_move_card', 'stk_move_card_callback');

// update card status and priority

function stk_status_priority_callback()
{

	if (!wp_verify_nonce($_POST['security'], 's-tier-kanban-nonce')) {
		die(__('Security check', 'kanban'));
	} else {

		$cardId = isset($_POST['cardId']) ? wp_strip_all_tags(intval($_POST['cardId'])) : 0;
		$status = isset($_POST['status']) ? $_POST['status'] : "";
		$priority = isset($_POST['priority']) ? $_POST['priority'] : "";

		if ($cardId) {
			update_post_meta($cardId, 'status', $status);
			update_post_meta($cardId, 'priority', $priority);
			wp_send_json_success();
		} else {
			wp_send_json_error(['error' => 'missing data'], 422);
		}
	}

	wp_die();
}
add_action('wp_ajax_stk_status_priority', 'stk_status_priority_callback');

//

function stk_card_title_callback()
{
	if (!wp_verify_nonce($_POST['security'], 's-tier-kanban-nonce')) {
		die(__('Security check', 'kanban'));
	} else {

		$card_id = isset($_POST['cardId']) ? wp_strip_all_tags(intval($_POST['cardId'])) : 0;
		$title = isset($_POST['title']) ? wp_strip_all_tags($_POST['title']) : null;


		$card = get_post($card_id);
		$user_id = $card->post_author;

		if ($card) {

			if (!is_user_kanban_creation($user_id) && !is_user_kanban_admin()) return  wp_send_json_error('You can not do that!', 403);

			$card_data = [
				'ID' => $card_id
			];

			if ($title !== null) {
				$card_data['post_title'] = $title;
			}

			$updated = wp_update_post($card_data);

			if ($updated) {
				wp_send_json_success();
			} else {
				wp_send_json_error('Failed to update card.');
			}
		} else {
			wp_send_json_error('Provide valid card ID', 400);
		}
	}

	die();
}
add_action('wp_ajax_stk_card_title', 'stk_card_title_callback');


add_action('wp_ajax_stk_card_description_save', 'stk_card_save_description');

function stk_card_save_description()
{
	if (!wp_verify_nonce($_POST['security'], 's-tier-kanban-nonce')) {
		die(__('Security check', 'kanban'));
	} else {
		$card_id = isset($_POST['cardId']) ? intval($_POST['cardId']) : 0;
		$description = isset($_POST['description']) ? wp_strip_all_tags(htmlspecialchars($_POST['description'])) : "";


		$card = get_post($card_id);
		$user_id = $card->post_author;

		if (!is_user_kanban_creation($user_id) && !is_user_kanban_admin()) return  wp_send_json_error('You can not do that!', 403);

		if ($card) {
			$card_data = [
				'ID' => $card_id
			];

			$card_data['post_content'] = $description;
			$updated = wp_update_post($card_data);

			if ($updated && !is_wp_error($updated)) {
				$card = get_post($updated);
				$data = [
					'description' =>  htmlspecialchars_decode($card->post_content)
				];
				wp_send_json_success($data);
			} else {
				wp_send_json_error('Failed to update card.');
			}
		} else {
			return wp_send_json_error('Provide valid comment ID', 400);
		}
	}
}


function stk_card_comments()
{
	if (!wp_verify_nonce($_POST['security'], 's-tier-kanban-nonce')) {
		die(__('Security check', 'kanban'));
	} else {

		$card_id = isset($_POST['cardId']) ? intval($_POST['cardId']) : 0;
		$comment = isset($_POST['comment']) ? wp_strip_all_tags(htmlspecialchars($_POST['comment'])) : "";


		if (!$card_id || !$comment) {
			wp_send_json_error('Failed to insert card comment, missing data');
		}

		$commentData = [
			'comment_post_ID'       => $card_id,
			'comment_content'       => $comment,
			'user_id'               => get_current_user_id(),
			'comment_meta'          => ['kanbanType' => true]
		];

		$insert_comment = wp_insert_comment($commentData);

		// Get user avatar

		$data = [
			'user_avatar' => get_avatar(get_current_user_id()),
			'user_id'     => get_current_user_id()
		];

		if ($insert_comment) {
			wp_send_json_success($data);
		} else {
			wp_send_json_error('Failed to insert a comment.');
		}
	}

	die();
}
add_action('wp_ajax_stk_card_comments', 'stk_card_comments');


// Show which users commented on a card
function getCardComments($card_id)
{

	global $wpdb;

	$query = $wpdb->prepare(
		'SELECT *
        FROM wp_comments
        JOIN wp_commentmeta
        ON wp_comments.comment_ID = wp_commentmeta.comment_id
        WHERE wp_comments.comment_post_ID = %d
        AND wp_commentmeta.meta_key = %s',
		$card_id,
		'kanbanType'
	);

	return $wpdb->get_results($query);
}


function getCommentsUsers($card_id)
{
	$users = [];
	$comments = getCardComments($card_id);
	if ($comments && is_array($comments)) {
		$user_ids = array_unique(array_column($comments, 'user_id'));

		foreach ($user_ids as $user_id) {
			$user = get_user_by('id', $user_id);
			if ($user) {
				$users[] = $user;
			}
		}
	}

	return $users;
}

function is_user_kanban_admin()
{
	$user = wp_get_current_user();
	return in_array('administrator',  $user->roles);
}

function is_user_kanban_creation(int $post_user_id)
{
	$user_id = get_current_user_id();
	return $user_id === $post_user_id;
}


function stk_get_comments()
{
	if (!wp_verify_nonce($_POST['security'], 's-tier-kanban-nonce')) {
		die(__('Security check', 'kanban'));
	} else {

		$card_id = isset($_POST['cardId']) ? intval($_POST['cardId']) : 0;



		if (!$card_id) {
			wp_send_json_error('Failed to get comments, missing data');
		}


		$args = array(
			'post_id'       => $card_id,
			'meta_query'    => [[
				'key'          => 'kanbanType',
				'compare'      => 'EXISTS'
			]],
			'number' => ""
		);

		$comments = get_comments($args);

		if ($comments) {
			ob_start();
			foreach ($comments as $comment) {
				include plugin_dir_path(__FILE__) . 'template-parts/comment.php';
			}

			$respose = [
				'comments' => ob_get_clean()
			];

			wp_send_json_success($respose);
		} else {

			$respose = [
				'comments' => ""
			];

			wp_send_json_success($respose);
		}
	}

	die();
}
add_action('wp_ajax_stk_get_comments', 'stk_get_comments');


function stk_comments_actions()
{
	if (!wp_verify_nonce($_POST['security'], 's-tier-kanban-nonce')) {
		die(__('Security check', 'kanban'));
	} else {

		$comment_id = isset($_POST['commentID']) ? wp_strip_all_tags(intval($_POST['commentID'])) : 0;
		$comment_action = isset($_POST['commentAction']) ? wp_strip_all_tags($_POST['commentAction']) : "";
		$comment = isset($_POST['comment']) ? wp_strip_all_tags(htmlspecialchars($_POST['comment'])) : "";

		$comment_object = get_comment($comment_id);

		if ($comment_object) {


			if (!is_user_kanban_creation($comment_object->user_id) && !is_user_kanban_admin()) return  wp_send_json_error('You can not do that!', 403);

			if (!$comment_id && !$comment_action) {
				wp_send_json_error('Failed comment action');
			}

			if ($comment_action === 'delete') {
				$is_comment_deleted = wp_delete_comment($comment_id, true);

				if ($is_comment_deleted) {
					wp_send_json_success();
				}
			} elseif ($comment_action === 'edit') {
				$commentarr = [];
				$commentarr['comment_ID'] = $comment_id;
				$commentarr['comment_content'] = $comment;

				$is_comment_updated = wp_update_comment($commentarr, true);

				if ($is_comment_updated) {
					wp_send_json_success();
				} else {
					wp_send_json_error('Failed to edit comment.');
				}
			}
		} else {
			wp_send_json_error('Provide valid comment ID', 400);
		}
	}

	die();
}
add_action('wp_ajax_stk_comments_actions', 'stk_comments_actions');

// Filter comments from backend

function filter_kanban_comments($query)
{
	global $pagenow;


	if ($pagenow == 'edit-comments.php' || $pagenow == 'index.php') {
		$query->query_vars['meta_query'] = [
			[
				'key'          => 'kanbanType',
				'compare'      => 'NOT EXISTS'
			],
		];

		$query->meta_query->parse_query_vars($query->query_vars);
	}
}

add_action('pre_get_comments', 'filter_kanban_comments');


// Restrict access to Projects

function restrict_project_post_type_access()
{
	// Check if we're viewing a 'kanban-project' post type
	if (is_singular('kanban-project')) {
		// Check if the user is not logged in or not an administrator
		if (!is_user_logged_in() || !current_user_can('administrator')) {
			$current_user_id = get_current_user_id();
			$allowed_users = get_post_meta(get_the_ID(), '_allowed_kanban_users', true) ?: array();

			// Redirect to the homepage or login page if the user is not allowed
			if (!in_array($current_user_id, $allowed_users)) {
				wp_redirect(home_url());
				// You can use wp_redirect(wp_login_url()) to redirect to the login page instead
				exit;
			}
		}
	}
}
add_action('template_redirect', 'restrict_project_post_type_access');


// Register Kanban User Role

function add_kanban_user_role()
{
	add_role(
		'kanban-user',
		__('Kanban User'),
		array(
			'read'         => true,
			'edit_posts'   => false,
			'delete_posts' => false,
			'level_0'      => true, // This capability is required to log in
		)
	);
}
add_action('init', 'add_kanban_user_role');

function restrict_kanban_user_admin_access()
{
	if (current_user_can('kanban-user') && !defined('DOING_AJAX')) {
		wp_redirect(home_url());
		exit;
	}
}
add_action('admin_init', 'restrict_kanban_user_admin_access');

function remove_admin_bar_for_kanban_user()
{
	if (current_user_can('kanban-user')) {
		show_admin_bar(false);
	}
}
add_action('after_setup_theme', 'remove_admin_bar_for_kanban_user');

// Redirect Kanban User to Account Page after login
function redirect_kanban_user_to_account_page($redirect_to, $request, $user)
{
	// Check if the user is a kanban-user
	if (isset($user->roles) && in_array('kanban-user', $user->roles)) {
		return get_site_url() . '/kanban-profile';
	}

	return $redirect_to;
}
add_filter('login_redirect', 'redirect_kanban_user_to_account_page', 10, 3);

// Update user account

function stk_update_user()
{
	if (!wp_verify_nonce($_POST['security'], 's-tier-kanban-nonce')) {
		die(__('Security check', 'kanban'));
	} else {

		$user_id = get_current_user_id();
		$first_name = isset($_POST['first_name']) ? wp_strip_all_tags($_POST['first_name']) : "";
		$last_name = isset($_POST['last_name']) ? wp_strip_all_tags($_POST['last_name']) : "";
		$password = isset($_POST['password']) ? wp_strip_all_tags($_POST['password']) : "";
		$confirm_password = isset($_POST['password_confirm']) ? wp_strip_all_tags($_POST['password_confirm']) : "";

		if (!$first_name || !$last_name) {
			return wp_send_json_error('First name and last name are mandatory fields', 400);
		}


		$user_data = [
			'ID' 			=> $user_id,
			'first_name' 	=> $first_name,
			'last_name'		=> $last_name,
		];

		if ($password && $password === $confirm_password && preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/', $password)) {
			$user_data['user_pass'] = $password;
		}

		$user = wp_update_user($user_data);


		if ($user && !is_wp_error($user)) {
			return wp_send_json_success();
		}
	}

	die();
}
add_action('wp_ajax_stk_update_user', 'stk_update_user');
