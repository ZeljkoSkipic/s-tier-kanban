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
        'edit.php?post_type=kanban-project'  	// Use the edit posts screen for the 'project' post type
    );
	add_submenu_page(
        'kanban-settings', 				// Parent menu (Pages menu)
        'Add New Kanban Project',  		// Page title
        'Add New Project', 				// Menu title
        'edit_pages', 					// Capability
        'post-new.php?post_type=kanban-project', // Direct link to the 'Add New JP Page' screen
        '', 							// Callback function (not needed since it's just a link)
        3 								// Position (Adjust this value as needed)
    );
}

add_action('admin_menu', 'stk_add_admin_menu');



// Set parent item active when editing a 'kanban-project' post
add_filter('parent_file', function ($parent_file) {
    global $post, $pagenow;

    if ($pagenow === 'post.php' && isset($_GET['post'])) {
        $post_id = $_GET['post'];
        $post_type = get_post_type($post_id);

        if ($post_type === 'kanban-project') {
            return 'kanban-settings'; // Set 'Kanban' as the active parent menu
        }
    }

    return $parent_file;
});

add_filter('submenu_file', function ($submenu_file) {
    global $post, $pagenow;

    if ($pagenow === 'post.php' && isset($_GET['post'])) {
        $post_id = $_GET['post'];
        $post_type = get_post_type($post_id);

        if ($post_type === 'kanban-project') {
            return 'edit.php?post_type=kanban-project'; // Highlight 'All Projects'
        }
    }

    return $submenu_file;
});


function stk_options_page() {
    ?>
    <div class="wrap">
        <h1><?php _e('Kanban Settings', 'kanban'); ?></h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('kanban_settings_group');
            do_settings_sections('kanban-settings');
            submit_button();
            ?>
        </form>
        <style>
            .form-table th {
                display: none;
            }
            .modern .switch-holder {
                background-color: #f0f0f0; /* Example styling for modern class */
            }
        </style>
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                const modernSwitch = document.getElementById('kanban_default_modern');
                const formTable = document.querySelector('.form-table');

                function toggleModernClass() {
                    if (modernSwitch.checked) {
                        formTable.classList.add('modern');
                    } else {
                        formTable.classList.remove('modern');
                    }
                }

                // Initial check
                toggleModernClass();

                // Listen for changes
                modernSwitch.addEventListener('change', toggleModernClass);
            });
        </script>
    </div>
    <?php
}

function kanban_settings_init() {
    register_setting('kanban_settings_group', 'kanban_default_color_scheme');
    register_setting('kanban_settings_group', 'kanban_default_modern');

    add_settings_section(
        'kanban_settings_section',
        __('Default Color Scheme', 'kanban'),
        'kanban_settings_section_callback',
        'kanban-settings'
    );

	add_settings_field(
        'kanban_default_modern',
        __('Modern Color Scheme', 'kanban'),
        'kanban_default_modern_callback',
        'kanban-settings',
        'kanban_settings_section'
    );

    add_settings_field(
        'kanban_default_color_scheme',
        __('Default Color Scheme', 'kanban'),
        'kanban_default_color_scheme_callback',
        'kanban-settings',
        'kanban_settings_section'
    );


}
add_action('admin_init', 'kanban_settings_init');

function kanban_settings_section_callback() {
    echo __('Set the default color scheme for new Kanban projects.', 'kanban');
}

function kanban_default_modern_callback() {
    $default_modern = get_option('kanban_default_modern', '0');
    ?>
    <div class="switch-holder">
        <div class="switch-label">
            <?php _e('Color Scheme Type', 'kanban'); ?>
        </div>
        <div class="switch-toggle">
            <input id="kanban_default_modern" type="checkbox" name="kanban_default_modern" value="1" <?php checked($default_modern, '1'); ?>>
            <label for="kanban_default_modern"></label>
        </div>
    </div>
    <?php
}

function kanban_default_color_scheme_callback() {
    $classes = array('kanban-color-one', 'kanban-color-two', 'kanban-color-three', 'kanban-color-four');
    $default_color_scheme = get_option('kanban_default_color_scheme', 'kanban-color-one');
    ?>
    <div id="project-class-meta-box">
        <?php foreach ($classes as $class) : ?>
            <p>
                <input type="radio" name="kanban_default_color_scheme" value="<?php echo esc_attr($class); ?>" <?php checked($default_color_scheme, $class); ?>>
                <?php echo esc_html(ucfirst(str_replace('-', ' ', $class))); ?>
            </p>
        <?php endforeach; ?>
    </div>
    <?php
}
