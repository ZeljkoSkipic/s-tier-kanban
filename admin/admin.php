<?php

// Define your plugin activation callback function

function stk_activate()
{

    if (! get_option('s_tier_kanban_flush_rewrite_rules_flag')) {
        add_option('s_tier_kanban_flush_rewrite_rules_flag', true);
    }

    if (s_tier_kanban_can_redirect_on_activation()) {
        add_option('s_tier_kanban_plugin_do_activation_redirect', sanitize_text_field(PLUGIN_ROOT_URL . 's-tier-kanban.php'));
    }
}

// Register the activation hook for your plugin

register_activation_hook(PLUGIN_ROOT_PATH . 's-tier-kanban.php',  'stk_activate');

add_action('init', 's_tier_kanban_flush_rewrite_rules', 100);

/**
 * Flush rewrite rules if the previously added flag exists,
 * and then remove the flag.
 */

function s_tier_kanban_flush_rewrite_rules()
{
    if (get_option('s_tier_kanban_flush_rewrite_rules_flag')) {
        flush_rewrite_rules();
        delete_option('s_tier_kanban_flush_rewrite_rules_flag');
    }
}

// Rewrite rules

function s_tier_kanban_add_rewrite_rules()
{
    add_rewrite_rule('^kanban-profile/?$', 'index.php?s_tier_custom_profile_profile=1', 'top');
}
add_action('init', 's_tier_kanban_add_rewrite_rules');

function s_tier_kanban_custom_query_vars($query_vars)
{
    $query_vars[] = 's_tier_custom_profile_profile';
    return $query_vars;
}
add_filter('query_vars', 's_tier_kanban_custom_query_vars');

function s_tier_profile_template($template)
{
    if (get_query_var('s_tier_custom_profile_profile') == 1) {
        return  PLUGIN_ROOT_PATH . '/kanban-account.php';
    }
    return $template;
}
add_filter('template_include', 's_tier_profile_template');


function is_kanban_profile_page()
{
    return get_query_var('s_tier_custom_profile_profile');
}

/**
 * Determine if a user can be redirected or not.
 *
 * @return true if the user can be redirected. false if not.
 */
function s_tier_kanban_can_redirect_on_activation()
{
    // If plugin is activated in network admin options, skip redirect.
    if (is_network_admin()) {
        return false;
    }

    // Determine if multi-activation is enabled.
    $maybe_multi = filter_input(INPUT_GET, 'activate-multi', FILTER_VALIDATE_BOOLEAN);
    if ($maybe_multi) {
        return false;
    }
    return true;
}

add_action('admin_init', 'memberships_plus_plugin_activate_redirect');
/**
 * Redirect a user to the admin panel after activation.
 */
function memberships_plus_plugin_activate_redirect()
{
    $user = wp_get_current_user();

    if (s_tier_kanban_can_redirect_on_activation() && is_admin() && in_array('administrator',  $user->roles)) {
        // Read in option value.
        if (PLUGIN_ROOT_URL . 's-tier-kanban.php' === get_option('s_tier_kanban_plugin_do_activation_redirect')) {

            // Delete option value so no more redirects.
            delete_option('s_tier_kanban_plugin_do_activation_redirect');

            // Get redirect URL.
            $redirect_url = admin_url() . '?page=kanban-settings';
            wp_safe_redirect(
                esc_url($redirect_url)
            );
            exit;
        }
    }
}


// Hook into the plugin_action_links filter for the s-tier-kanban.php file
add_filter('plugin_action_links_s-tier-kanban/s-tier-kanban.php', 'stk_add_settings_link');

function stk_add_settings_link($links)
{

    // Construct the Get Pro link
    $get_pro_link = '<a href="https://kanbanplugin.com/" target="_blank"><b>Get Pro</b></a>';

    // Construct the Settings link
    $settings_link = '<a href="' . admin_url('admin.php?page=kanban-settings') . '">Settings</a>';

    // Add the links to the beginning of the links array
    array_unshift($links, $settings_link, $get_pro_link);

    return $links;
}

// Define your plugin deactivation callback function
function stk_deactivate()
{
    // Flush rewrite rules to clean up after deactivation
    flush_rewrite_rules();
}

// Register the deactivation hook for your plugin
register_deactivation_hook(PLUGIN_ROOT_PATH . 's-tier-kanban.php', 'stk_deactivate');


// Settings pages
function stk_add_admin_menu()
{
    // Add the main menu page
    add_menu_page(
        'Kanban Options',               // Page title
        'Kanban',                       // Menu title
        'manage_options',                  // Capability required to see this option
        'kanban-settings',               // Menu slug
        'stk_options_page',      // Function to display the options page content
        'dashicons-editor-spellcheck',     // Icon URL (optional)
        6                                 // Position in the menu (optional)
    );
    // Add the Dashboard submenu page
    add_submenu_page(
        'kanban-settings',                 // Parent slug
        'Dashboard',                    // Page title
        'Dashboard',                    // Menu title
        'manage_options',                 // Capability required
        'kanban-settings',              // Menu slug (same as the parent to link to the same page)
        'stk_options_page'              // Function to display the options page content
    );
    // Add the Project submenu page
    add_submenu_page(
        'kanban-settings',                 // Parent slug
        'All Kanban Projects',          // Page title
        'All Projects',                 // Menu title
        'manage_options',                 // Capability required
        'edit.php?post_type=kanban-project'      // Use the edit posts screen for the 'project' post type
    );
    add_submenu_page(
        'kanban-settings',                 // Parent menu (Pages menu)
        'Add New Kanban Project',          // Page title
        'Add New Project',                 // Menu title
        'edit_pages',                     // Capability
        'post-new.php?post_type=kanban-project', // Direct link to the 'Add New JP Page' screen
        '',                             // Callback function (not needed since it's just a link)
        3                                 // Position (Adjust this value as needed)
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


function stk_options_page()
{
?>
    <div class="wrap">
        <h1><?php _e('Kanban Settings', 'kanban'); ?></h1>
        <div class="kanban-settings-container">
            <div class="kanban-settings-main">
                <form method="post" action="options.php">
                    <?php
                    settings_fields('kanban_settings_group');
                    do_settings_sections('kanban-settings');
                    submit_button();
                    ?>
                </form>
            </div>
            <div class="kanban-settings-sidebar">
                <?php kanban_sidebar_callback(); ?>
            </div>
        </div>
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

function kanban_settings_init()
{
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

function kanban_settings_section_callback()
{
    echo __('Set the default color scheme for new Kanban projects.', 'kanban');
}

function kanban_default_modern_callback()
{
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

function kanban_default_color_scheme_callback()
{
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


function kanban_sidebar_callback()
{
?>
    <h3><?php _e('This is a Kanban Plugin Demo', 'kanban'); ?></h3>
    <h4><?php _e('Thank you for testing the Kanban Plugin!', 'kanban'); ?></h4>
    <div class="kanban-settings-sidebar-box">
        <p>We made a video to help you get started:</p>
        <a href="https://www.youtube.com/watch?v=E8EvRA7_aOQ" target="_blank"><?php _e('Watch Video', 'kanban'); ?></a>
    </div>
    <div class="kanban-settings-sidebar-box">
        <p><?php _e('We would greatly appreciate your feedback. Share with us any issues, bugs, or feature requests you might have.', 'kanban'); ?></p>
        <a href="https://stierdev.com/kanban-feedback" target="_blank"><?php _e('Share Feedback', 'kanban'); ?></a>
    </div>
    <div class="kanban-settings-sidebar-box">
        <p>The Kanban Plugin Website and Pro Features are coming soon.</p>
        <a href="https://kanbanplugin.com/" target="_blank"><?php _e('Kanban Plugin Website', 'kanban'); ?></a>
    </div>

    <div class="kanban-settings-sidebar-box">
        <p>A Proud Team behind the Kanban Plugin:</p>
        <a href="https://stiedev.com/" target="_blank"><?php _e('S-Tier Dev', 'kanban'); ?></a>
        <a href="https://zeljkoskipic.com/" target="_blank"><?php _e('Zeljko Skipic', 'kanban'); ?></a>
    </div>


<?php
}
