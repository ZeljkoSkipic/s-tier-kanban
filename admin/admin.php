<?php

 // Define your plugin activation callback function
 function stk_activate() {
    // Ensure our custom post type is registered before flushing rewrite rules
    register_kanban_post_types();

    // Flush rewrite rules to ensure custom post types or taxonomies permalink structures are updated
    flush_rewrite_rules();

}

// Register the activation hook for your plugin
register_activation_hook(__FILE__, 'stk_activate');

// Hook into the plugin_action_links filter for the s-tier-kanban.php file
add_filter('plugin_action_links_s-tier-kanban/s-tier-kanban.php', 'stk_add_settings_link');

function stk_add_settings_link($links) {
    // Construct the Settings link. Replace 'admin.php?page=s-tier-kanban-settings' with your actual settings page URL
    $settings_link = '<a href="' . admin_url('admin.php?page=kanban-settings') . '">Settings</a>';
    array_unshift($links, $settings_link); // Add the Settings link to the beginning of the links array
    return $links;
}

// Define your plugin deactivation callback function
function stk_deactivate() {
    // Flush rewrite rules to clean up after deactivation
    flush_rewrite_rules();
}

// Register the deactivation hook for your plugin
register_deactivation_hook(__FILE__, 'stk_deactivate');


// Settings pages
function stk_add_admin_menu() {
    // Add the main menu page
    add_menu_page(
        'Kanban Options',       		// Page title
        'Kanban',               		// Menu title
        'manage_options',          		// Capability required to see this option
        'kanban-settings',       		// Menu slug
        'stk_options_page',  	// Function to display the options page content
        'dashicons-editor-spellcheck', 	// Icon URL (optional)
        6                         		// Position in the menu (optional)
    );
    // Add the Project submenu page
    add_submenu_page(
        'kanban-settings',             	// Parent slug
        'All Kanban Projects',          // Page title
        'All Projects',                 // Menu title
        'manage_options',             	// Capability required
        'edit.php?post_type=project'  	// Use the edit posts screen for the 'project' post type
    );
	add_submenu_page(
        'kanban-settings', 				// Parent menu (Pages menu)
        'Add New Kanban Project',  		// Page title
        'Add New Project', 				// Menu title
        'edit_pages', 					// Capability
        'post-new.php?post_type=project', // Direct link to the 'Add New JP Page' screen
        '', 							// Callback function (not needed since it's just a link)
        3 								// Position (Adjust this value as needed)
    );
	// Add the Columns submenu page
	/* add_submenu_page(
        'kanban-settings',             	// Parent slug
        'Columns',               		// Page title
        'Columns',                		// Menu title
        'manage_options',             	// Capability required
        'edit.php?post_type=kanban_column'     // Use the edit posts screen for the 'project' post type
    ); */
	// Add the Cards submenu page
	/* add_submenu_page(
        'kanban-settings',				// Parent slug
        'Cards',                      	// Page title
        'Cards',                      	// Menu title
        'manage_options',               // Capability required
        'edit.php?post_type=kanban_card'     // Use the edit posts screen for the 'project' post type
    ); */
}

add_action('admin_menu', 'stk_add_admin_menu');


function stk_options_page() {
    ?>
    <div class="wrap">
        <h2>My Plugin Options</h2>
        <p>Settings and options for My Plugin.</p>
        <!-- Your options form or other content here -->
    </div>
    <?php
}
