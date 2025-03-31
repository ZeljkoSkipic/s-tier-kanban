<?php

// Register Kanban User Role

function add_kanban_user_role()
{
    // Add the regular kanban-user role (keep existing code)
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

    // Add the kanban-admin role with basic capabilities
    add_role(
        'kanban-admin',
        __('Kanban Admin'),
        array(
            'read'         => true,
            'edit_posts'   => false,
            'delete_posts' => false,
            'level_0'      => true,
            'read_private_posts' => true,
            'edit_kanban_projects' => true // Custom capability
        )
    );
}
add_action('init', 'add_kanban_user_role');

/* // Map custom capabilities to the kanban-project post type
function map_kanban_project_capabilities() {
    // Get the post type object
    $post_type_obj = get_post_type_object('kanban-project');

    // Only proceed if the post type exists
    if ($post_type_obj) {
        // Map the custom capability to the relevant post type capabilities
        $post_type_obj->cap->edit_post = 'edit_kanban_projects';
        $post_type_obj->cap->edit_posts = 'edit_kanban_projects';
        $post_type_obj->cap->edit_others_posts = 'edit_kanban_projects';
        $post_type_obj->cap->publish_posts = 'edit_kanban_projects';
        $post_type_obj->cap->read_post = 'read';
        $post_type_obj->cap->read_private_posts = 'read_private_posts';
        $post_type_obj->cap->delete_post = 'edit_kanban_projects';

        // Ensure create_posts capability is also mapped
        $post_type_obj->cap->create_posts = 'edit_kanban_projects';
    }
}
// Run after post types are registered but before capabilities are checked
add_action('init', 'map_kanban_project_capabilities', 999); */

// Add meta capability mapping filter to ensure proper permission checks
function map_kanban_admin_meta_caps($caps, $cap, $user_id, $args) {
    // Only process specific caps related to editing posts
    if (in_array($cap, array('edit_post', 'delete_post', 'publish_post'))) {
        // Check if we're working with a kanban project
        if (isset($args[0])) {
            $post_id = $args[0];
            $post_type = get_post_type($post_id);

            if ($post_type === 'kanban-project') {
                // For kanban-admin, replace standard caps with our custom cap
                if (user_can($user_id, 'kanban-admin')) {
                    return array('edit_kanban_projects');
                }
            }
        }
    }

    return $caps;
}
add_filter('map_meta_cap', 'map_kanban_admin_meta_caps', 10, 4);


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
	if (current_user_can('kanban-user') || current_user_can('kanban-admin')) {
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


function redirect_kanban_admin_to_custom_profile() {
    global $pagenow;

    // Check if user is kanban-admin and is trying to access profile.php
    if (current_user_can('kanban-admin') && !current_user_can('administrator')) {
        if ($pagenow === 'profile.php' || $pagenow === 'user-edit.php' || $pagenow === 'index.php' || $pagenow === 'edit.php') {
            wp_redirect(home_url('/kanban-profile'));
            exit;
        }
    }
}
add_action('admin_init', 'redirect_kanban_admin_to_custom_profile', 1);

// Hide the "+ New" content button in admin bar for kanban-admin users

function remove_new_content_for_kanban_admin($wp_admin_bar) {
    // Only apply to kanban-admin users who aren't also administrators
    if (current_user_can('kanban-admin') && !current_user_can('administrator')) {
        // Remove the '+ New' button
        $wp_admin_bar->remove_node('new-content');
    }
}
add_action('admin_bar_menu', 'remove_new_content_for_kanban_admin', 999);
