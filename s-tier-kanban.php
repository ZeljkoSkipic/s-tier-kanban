<?php

/**
 * Plugin Name: S-Tier Kanban
 * Plugin URI: https://stierdev.com/s-tier-kanban
 * Description: A Kanban-style plugin for managing projects.
 * Version: 0.0.3
 * Author: S-Tier Dev
 * Author URI: https://stierdev.com/
 */

 // Plugin Path Constants

 !defined('PLUGIN_ROOT_PATH') ? define('PLUGIN_ROOT_PATH', plugin_dir_path(__FILE__)) : "";
 !defined('PLUGIN_ROOT_URL') ? define('PLUGIN_ROOT_URL', plugin_dir_url(__FILE__)) : "";


function stk_scripts()
{
    // Enqueue the CSS file
   // wp_enqueue_style('s-tier-kanban-css', plugin_dir_url(__FILE__) . 's-tier-kanban.css');
    wp_enqueue_style('s-tier-kanban-css', PLUGIN_ROOT_URL . 'dist/index.min.css');

    // Enqueue the JS file
    wp_enqueue_script('s-tier-kanban-js-vendor', PLUGIN_ROOT_URL . 'dist/vendor.min.js', array('jquery'), false, true);
    wp_enqueue_script('s-tier-kanban-js', PLUGIN_ROOT_URL . 'dist/theme.min.js', array('jquery', 's-tier-kanban-js-vendor'), false, true);


     wp_enqueue_script('sweetalert-js', plugin_dir_url(__FILE__) . 'assets/js/sweetalert/sweetalert2.min.js', array(), false, true);

    wp_localize_script('s-tier-kanban-js', 'myAjax', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
        'security' => wp_create_nonce('s-tier-kanban-nonce'),
    ));
}

function stk_admin_scripts() {
    wp_enqueue_style('s-tier-kanban-admin-css', PLUGIN_ROOT_URL . 'assets/admin/admin.css');
}
add_action('admin_enqueue_scripts', 'stk_admin_scripts');


add_action('wp_enqueue_scripts', 'stk_scripts');

include_once plugin_dir_path(__FILE__) . 'post-types.php';

include_once plugin_dir_path(__FILE__) . 'template-parts/backend/meta.php';

if (is_admin()) {
    include_once plugin_dir_path(__FILE__) . 'admin/admin.php';
}

// Create Column
function stk_add_column_callback()
{
    // Your nonce check and other validation here

    $projectId = intval($_POST['projectId']);
    $columnName = sanitize_text_field($_POST['columnName']);

    // Create the new Kanban column as a post of type 'kanban_column'
    $column_id = wp_insert_post(array(
        'post_title'    => $columnName,
        'post_type'     => 'kanban_column',
        'post_status'   => 'publish',
        'meta_input'    => array(
            'associated_project_id' => $projectId, // Custom field to associate this column with a project
        ),
    ));

    // Associate this column with a project using post meta
    if ($column_id && !is_wp_error($column_id)) {
        // Successfully created the column, send back the ID
        wp_send_json_success(array('columnId' => $column_id));
    } else {
        wp_send_json_error(array('message' => 'Failed to create column.'));
    }

    wp_send_json_success();
    wp_die();
}
add_action('wp_ajax_stk_add_column', 'stk_add_column_callback');

function stk_update_column_title()
{


    if (!wp_verify_nonce($_POST['security'], 's-tier-kanban-nonce')) {
        die(__('Security check', 'kanban'));
    } else {

        $columnId = isset($_POST['columnId']) ? wp_strip_all_tags($_POST['columnId']) : 0;
        $title = isset($_POST['title']) ? wp_strip_all_tags($_POST['title']) : null;

        if (!$columnId) {
            wp_send_json_error('Failed to update card, missing card id');
        }

        $column_data = [
            'ID' => $columnId
        ];

        if ($title !== null) {
            $column_data['post_title'] = $title;
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


// Delete Column
function stk_delete_column_callback()
{
    check_ajax_referer('s-tier-kanban-nonce', 'security'); // Check the nonce for security

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
        include PLUGIN_ROOT_PATH. 'template-parts/card.php';
        $card_html = ob_get_clean();
        wp_reset_postdata();

        wp_send_json_success(array('cardId' => $card_id, 'cardOrder' => $new_card_order, 'cardHTML' => $card_html ));
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

    if ($cardId > 0) {
        wp_delete_post($cardId, true); // True to bypass trash and force deletion
        wp_send_json_success();
    } else {
        wp_send_json_error(array('message' => 'Invalid card ID.'));
    }

    wp_die(); // Always terminate Ajax functions with wp_die()
}
add_action('wp_ajax_stk_delete_card', 'stk_delete_card_callback');

// Reorder Columns

function stk_update_column_order_callback()
{
    check_ajax_referer('s-tier-kanban-nonce', 'security');

    $columnOrder = isset($_POST['columnOrder']) ? $_POST['columnOrder'] : array();

    // Update column order in the database based on $columnOrder
    // This might involve updating a 'column_order' meta value for each column

    wp_send_json_success();
    wp_die();
}
add_action('wp_ajax_stk_update_column_order', 'stk_update_column_order_callback');


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

function stk_card_title_description_callback()
{
    if (!wp_verify_nonce($_POST['security'], 's-tier-kanban-nonce')) {
        die(__('Security check', 'kanban'));
    } else {

        $card_id = isset($_POST['cardId']) ? wp_strip_all_tags(intval($_POST['cardId'])) : 0;
        $title = isset($_POST['title']) ? wp_strip_all_tags($_POST['title']) : null;
        $description = isset($_POST['description']) ? wp_strip_all_tags($_POST['description']) : null;

        if (!$card_id) {
            wp_send_json_error('Failed to update card, missing card id');
        }

        $card_data = [
            'ID' => $card_id
        ];

        if ($title !== null) {
            $card_data['post_title'] = $title;
        }

        if ($description !== null) {
            $card_data['post_content'] = $description;
        }

        $updated = wp_update_post($card_data);

        if ($updated) {
            wp_send_json_success();
        } else {
            wp_send_json_error('Failed to update card.');
        }
    }

    die();
}
add_action('wp_ajax_stk_card_title_description', 'stk_card_title_description_callback');


add_action('wp_ajax_stk_card_description_save', 'stk_card_save_description');

function stk_card_save_description()
{
    if (!wp_verify_nonce($_POST['security'], 's-tier-kanban-nonce')) {
        die(__('Security check', 'kanban'));
    } else {
        $card_id = isset($_POST['cardId']) ? intval($_POST['cardId']) : 0;
        $description = isset($_POST['description']) ? wp_strip_all_tags(htmlspecialchars($_POST['description'])) : "";

        if (!$card_id) {
            wp_send_json_error('Failed to update card, missing card id');
        }

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

        $query->meta_query->parse_query_vars($query->query_vars );
    }
}

add_action('pre_get_comments', 'filter_kanban_comments');


// Restrict access to Projects

function restrict_project_post_type_access() {
    // Check if we're viewing a 'project' post type
    if (is_singular('project')) {
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

function add_kanban_user_role() {
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

function restrict_kanban_user_admin_access() {
    if (current_user_can('kanban-user') && !defined('DOING_AJAX')) {
        wp_redirect(home_url());
        exit;
    }
}
add_action('admin_init', 'restrict_kanban_user_admin_access');

function remove_admin_bar_for_kanban_user() {
    if (current_user_can('kanban-user')) {
        show_admin_bar(false);
    }
}
add_action('after_setup_theme', 'remove_admin_bar_for_kanban_user');
