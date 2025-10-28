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
    $get_pro_link = '<a href="https://kanbanplugin.com/pricing" target="_blank"><b>Get Pro</b></a>';

    // Construct the Settings link
    $settings_link = '<a href="' . admin_url('admin.php?page=kanban-settings') . '">Settings</a>';

    // Add the links to the beginning of the links array
    array_unshift($links, $settings_link, $get_pro_link);

    return $links;
}

// Define your plugin deactivation callback function
function stk_deactivate()
{
	remove_role('kanban-user');
    remove_role('kanban-admin');
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
    // Get current tab or default to 'dashboard'
    $current_tab = isset($_GET['tab']) ? sanitize_text_field($_GET['tab']) : 'dashboard';
?>
<div class="kanban-settings-container">
	<div class="kanban-settings-main">
		<!-- Move tabs navigation inside kanban-settings-main -->
		<div class="nav-tab-wrapper">
		<img src="<?php echo PLUGIN_ROOT_URL . 'assets/images/kanban-plugin-logo.svg'; ?>" alt="Kanban Plugin Logo">
			<a href="?page=kanban-settings&tab=dashboard" class="nav-tab <?php echo $current_tab === 'dashboard' ? 'nav-tab-active' : ''; ?>">
				<?php _e('Dashboard', 'kanban'); ?>
			</a>
			<a href="?page=kanban-settings&tab=global-settings" class="nav-tab <?php echo $current_tab === 'global-settings' ? 'nav-tab-active' : ''; ?>">
				<?php _e('Global Settings', 'kanban'); ?>
			</a>
			<?php
			if (!KanbanUpdate::isLicenceValid()) { ?>
			<a href="?page=kanban-settings&tab=pro-features-tab" class="nav-tab <?php echo $current_tab === 'pro-features-tab' ? 'nav-tab-active' : ''; ?>">
				<?php _e('Pro Features', 'kanban'); ?>
			</a>
			<?php } ?>
		</div>

		<?php
		// Display content based on current tab
		if ($current_tab === 'dashboard') {
			// Dashboard content
			?>
			<div class="dashboard-content kanban-settings-tab">
				<h2><?php _e('Kanban Dashboard', 'kanban'); ?></h2>
				<p><?php _e('Welcome to your Kanban dashboard! Here you can see an overview of your Kanban projects.', 'kanban'); ?></p>

				<?php
				// Add dashboard statistics or other content here
				$projects_count = wp_count_posts('kanban-project');
				$tasks_count = wp_count_posts('kanban_card');
				?>

				<div class="dashboard-stats">
					<div class="kanban-dashboard-boxes">
						<div class="kanban-dashboard-box">
							<h3 class="kanban-dashboard-box-title"><?php _e('Projects', 'kanban'); ?></h3>
							<p class="stat-number"><?php echo $projects_count->publish; ?></p>
						</div>
						<div class="kanban-dashboard-box">
							<h3 class="kanban-dashboard-box-title"><?php _e('Tasks', 'kanban'); ?></h3>
							<p class="stat-number"><?php echo $tasks_count->publish; ?></p>
						</div>
						<?php
						if (KanbanUpdate::isLicenceValid()) {
						$user_count = count_users();
						$kanban_admin_count = isset($user_count['avail_roles']['kanban-admin']) ? $user_count['avail_roles']['kanban-admin'] : 0;
						$kanban_user_count = isset($user_count['avail_roles']['kanban-user']) ? $user_count['avail_roles']['kanban-user'] : 0; ?>
						<div class="kanban-dashboard-box">
							<h3 class="kanban-dashboard-box-title"><?php _e('Kanban Admins', 'kanban'); ?></h3>
							<p class="stat-number"><?php echo $kanban_admin_count; ?></p>
						</div>
						<div class="kanban-dashboard-box">
							<h3 class="kanban-dashboard-box-title"><?php _e('Kanban Users', 'kanban'); ?></h3>
							<p class="stat-number"><?php echo $kanban_user_count; ?></p>
						</div>
						<?php } ?>
					</div>
					<!-- Add more stat boxes as needed -->
				</div>
			</div>
			<?php
		} else if ($current_tab === 'global-settings') {
			// Global settings form
			?>
			<div class="kanban-settings-tab">
				<form method="post" action="options.php">
					<?php
					settings_fields('kanban_settings_group');
					do_settings_sections('kanban-settings');
					submit_button();
					?>
				</form>
			</div>
			<?php
		} else if ($current_tab === 'pro-features-tab' && !KanbanUpdate::isLicenceValid()) {
			// Pro Features Tab
			?>
			<div class="kanban-settings-tab">
				<div class="pro-features-tab-section">
					<form method="post" action="options.php">
						<?php
						settings_fields('kanban_advanced_settings_group');
						do_settings_sections('kanban-pro-features-tab');
						submit_button();
						?>
					</form>
				</div>
			</div>
			<?php
		}
		?>
	</div>
	<div class="kanban-settings-sidebar">
		<?php kanban_sidebar_callback(); ?>
	</div>
	<?php if(!KanbanUpdate::isLicenceValid()) { ?>
	<!-- Upsell Banner -->
	<div class="kanban-settings-footer">
		<h3><?php _e('Upgrade to Kanban Plugin Pro', 'kanban'); ?></h3>
		<div class="kanban-upsell-container">
			<div class="kanban-upsell-box">
				<ul>
					<li>Board List View</li>
					<li>Modern Color Schemes</li>
					<li>Kanban User Role</li>
					<li>Project Documents</li>
				</ul>
			</div>
			<div class="kanban-upsell-box">
				<ul>
					<li><em>Default Columns - Templates*</em></li>
					<li><em>User Assignment*</em></li>
					<li><em>Email Notification*</em></li>
					<li><em>Account Assigned Card List*</em></li>
				</ul>
			</div>
		</div>
		<a class="kan-btn-1" href="https://kanbanplugin.com/pricing/" target="_blank">Get Kanban Plugin Pro</a>
	</div>
	<?php } ?>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const styleRadios = document.querySelectorAll('input[name="kanban_default_style"]');
        const formTable = document.querySelector('.form-table');

        function updateStyleClass() {
            // Remove all possible classes first
            formTable.classList.remove('modern', 'compact', 'classic');

            // Find selected radio and add appropriate class
            const selectedStyle = document.querySelector('input[name="kanban_default_style"]:checked');
            if (selectedStyle) {
                formTable.classList.add(selectedStyle.value);
            } else {
                formTable.classList.add('classic'); // Default
            }
        }

        // Initial update
        updateStyleClass();

        // Listen for changes
        styleRadios.forEach(radio => {
            radio.addEventListener('change', updateStyleClass);
        });
    });
</script>
<?php
}


function kanban_settings_init()
{
	register_setting('kanban_settings_group', 'kanban_default_color_scheme');
    register_setting('kanban_settings_group', 'kanban_default_style'); // New option name

    // Register the new hide_licence_invalid setting
    register_setting('kanban_advanced_settings_group', 'kanban_hide_licence_invalid');

    add_settings_section(
        'kanban_settings_section',
        __('Default Color Scheme', 'kanban'),
        'kanban_settings_section_callback',
        'kanban-settings'
    );

    add_settings_field(
        'kanban_default_modern',
        __('', 'kanban'),
        'kanban_default_modern_callback',
        'kanban-settings',
        'kanban_settings_section'
    );

    add_settings_field(
        'kanban_default_color_scheme',
        __('Color Scheme', 'kanban'),
        'kanban_default_color_scheme_callback',
        'kanban-settings',
        'kanban_settings_section'
    );

    // Add a section for Pro Features
    add_settings_section(
        'kanban_advanced_settings_section',
        __('Pro Features', 'kanban'),
        'kanban_hide_licence_invalid_callback',
        'kanban-pro-features-tab'
    );


}
add_action('admin_init', 'kanban_settings_init');

function kanban_settings_section_callback()
{
    echo __('Set the default color scheme for new Kanban projects.', 'kanban');
}

function kanban_default_modern_callback() {
    // Get current style - default to 'classic' if not set
    $default_style = get_option('kanban_default_style', 'classic');

    $pro_feature = 'licence-invalid';
    $disabled = 'disabled';
    if (KanbanUpdate::isLicenceValid()) {
        $pro_feature = '';
        $disabled = '';
    }

    // Force classic style if license is not valid
    if ($pro_feature === 'licence-invalid') {
        $default_style = 'classic';
    }
?>
    <div class="switch-holder <?php echo $pro_feature; ?>">
        <?php include PLUGIN_ROOT_PATH . '/template-parts/backend/pro_overlay.php'; ?>
        <p class="settings_section_title"><?php _e('Color Scheme Type', 'kanban'); ?></p>

        <div class="color-scheme-options">
            <?php
            $style_options = [
                'classic' => __('Classic', 'kanban'),
                'modern' => __('Modern', 'kanban'),
                'compact' => __('Compact', 'kanban')
            ];

            foreach ($style_options as $value => $label):
                // Only disable non-classic options when license is invalid
                $option_disabled = ($value !== 'classic' && $pro_feature === 'licence-invalid') ? 'disabled' : '';
            ?>
                <label class="color-scheme-option">
                    <input type="radio" name="kanban_default_style" value="<?php echo esc_attr($value); ?>"
                        <?php checked($default_style, $value); ?> <?php echo $option_disabled; ?>>
                    <span><?php echo esc_html($label); ?></span>
                </label>
            <?php endforeach; ?>
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


function kanban_hide_licence_invalid_callback()
{
    $hide_licence_invalid = get_option('kanban_hide_licence_invalid', '0');
?>
	<p><?php _e('Kanban Plugin Pro features gives you an extra productivity and ease of use boost.', 'kanban'); ?></p>
	<div class="kanban-dashboard-boxes">
		<div class="kanban-dashboard-box">
			<h3 class="kanban-dashboard-box-title">See Pro Features</h3>
			<a class="kan-btn-2" href="https://kanbanplugin.com/features/" target="_blank">See Features</a>
		</div>
		<div class="kanban-dashboard-box">
			<h3 class="kanban-dashboard-box-title">Choose a Plan for you</h3>
			<a class="kan-btn-2" href="https://kanbanplugin.com/pricing/" target="_blank">Get Pro</a>
		</div>
		<div class="kanban-dashboard-box">
			<h3 class="kanban-dashboard-box-title">Have a licence?</h3>
			<a class="kan-btn-2" href="/wp-admin/admin.php?page=kanban-updates">Activate Licence</a>
		</div>
	</div>
	<div class="pro_features_toggle_wrap">
		<label for="kanban_hide_licence_invalid"><?php _e('Kanban Free works great for me. Hide Pro Feature boxes.', 'kanban'); ?></label>
		<input type="checkbox" id="kanban_hide_licence_invalid" class="kan-checkbox" name="kanban_hide_licence_invalid" value="1" <?php checked($hide_licence_invalid, '1'); ?>>
	</div>
<?php
}


function kanban_sidebar_callback()
{
?>
    <h3><?php _e('Thank you for using the Kanban Plugin!', 'kanban'); ?></h3>
    <div class="kanban-settings-sidebar-box">
        <p>Need a hand getting started? Check out Kanban Plugin documentation articles.</p>
        <a href="https://kanbanplugin.com/docs/" target="_blank"><?php _e('Docs', 'kanban'); ?></a>
    </div>
    <div class="kanban-settings-sidebar-box">
        <p><?php _e('We would greatly appreciate your feedback. Share with us any issues, bugs, or feature requests you might have.', 'kanban'); ?></p>
        <a href="https://kanbanplugin.com/feedback/" target="_blank"><?php _e('Share Feedback', 'kanban'); ?></a>
    </div>

    <div class="kanban-settings-sidebar-box">
        <p>A Proud Team behind the Kanban Plugin:</p>
        <a href="https://stierdev.com/" target="_blank"><?php _e('S-Tier Dev', 'kanban'); ?></a>
        <a href="https://zeljkoskipic.com/" target="_blank"><?php _e('Zeljko Skipic', 'kanban'); ?></a>
    </div>

<?php
}

?>

<?php
if (!KanbanUpdate::isLicenceValid()) {

function kanban_apply_hide_licence_invalid() {
    $hide_licence_invalid = get_option('kanban_hide_licence_invalid', '0');

    if ($hide_licence_invalid === '1') {
        echo '<style>.licence-invalid { display: none !important; }</style>';
		echo '<style>.kanban-settings-footer { display: none !important; }</style>';
    }
}
add_action('admin_head', 'kanban_apply_hide_licence_invalid');
}
