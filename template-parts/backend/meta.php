<?php

// Restrict project access based on allowed users
function restrict_project_access($query) {
    if (!is_admin() && $query->is_main_query() && is_post_type_archive('kanban-project')) {
        if (!current_user_can('manage_options')) { // Admins should see all projects
            $current_user_id = get_current_user_id();
            $query->set('meta_query', array(
                array(
                    'key'     => '_allowed_kanban_users',
                    'value'   => '"' . $current_user_id . '"',
                    'compare' => 'LIKE'
                )
            ));
        }
    }
}
add_action('pre_get_posts', 'restrict_project_access');

// Show which projects a user is allowed to access
function get_user_projects($user_id) {
    $args = array(
        'post_type' => 'kanban-project',
        'meta_query' => array(
            array(
                'key' => '_allowed_kanban_users',
                'value' => '"' . $user_id . '"',
                'compare' => 'LIKE'
            )
        )
    );

    $query = new WP_Query($args);
    return $query->posts;
}

// Add custom meta box for color schemes and allowed users
function add_project_class_meta_box() {
    add_meta_box(
        'project_class_meta_box',
        __('Board Settings', 'kanban'),
        'render_project_class_meta_box',
        'kanban-project',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'add_project_class_meta_box');

function set_default_kanban_project_meta($post_id, $post, $update) {
    if ($post->post_type != 'kanban-project' || $update) {
        return;
    }

    $default_color_scheme = get_option('kanban_default_color_scheme', 'kanban-color-one');
    $default_modern = get_option('kanban_default_modern', '0');

    update_post_meta($post_id, '_project_class', $default_color_scheme);

    if ($default_modern == '1') {
        update_post_meta($post_id, '_kanban_modern', '1');
    } else {
        delete_post_meta($post_id, '_kanban_modern');
    }
}
add_action('wp_insert_post', 'set_default_kanban_project_meta', 10, 3);

function render_project_class_meta_box($post) {
    $classes = array('kanban-color-one', 'kanban-color-two', 'kanban-color-three', 'kanban-color-four');
    $selected_class = get_post_meta($post->ID, '_project_class', true);
    $kanban_modern = get_post_meta($post->ID, '_kanban_modern', true);
    $roles = array('kanban-user', 'administrator');
    $selected_users = get_post_meta($post->ID, '_allowed_kanban_users', true) ?: array();
    $description = get_post_meta($post->ID, '_kanban_project_description', true);

    // Set default class if none is selected
    if (empty($selected_class)) {
        $selected_class = 'kanban-color-one';
    }

    wp_nonce_field('save_project_class_meta_box', 'project_class_nonce');
    ?>
    <div class="board_settings_section">
		<div id="kanban-project-description">
            <p class="board_settings_subtitle"><?php _e('Project Description:', 'kanban'); ?></p>
            <?php
            wp_editor($description, 'kanban_project_description', array(
                'textarea_name' => 'kanban_project_description',
                'textarea_rows' => 4,
                'media_buttons' => false,
                'tinymce' => false,
                'quicktags' => true,
            ));
            ?>
        </div>
		<div id="kanban-users-meta-box">
			<p class="board_settings_subtitle"><?php _e('Kanban Users:', 'kanban'); ?></p>
			<select id="kanban-user-role-filter">
				<option value=""><?php _e('All Roles', 'kanban'); ?></option>
				<?php foreach ($roles as $role) : ?>
					<option value="<?php echo esc_attr($role); ?>"><?php echo esc_html(ucfirst($role)); ?></option>
				<?php endforeach; ?>
			</select>
			<input type="text" id="kanban-user-search" placeholder="<?php _e('Search Users...', 'kanban'); ?>">
			<div id="kanban-users-list">
				<?php
				$users = get_users(array('role__in' => $roles));
				if (!empty($users)) {
					foreach ($users as $user) {
						?>
						<p class="kanban-user-item" data-role="<?php echo esc_attr(implode(' ', $user->roles)); ?>">
							<label>
								<input type="checkbox" name="kanban_users[]" value="<?php echo esc_attr($user->ID); ?>"
									<?php checked(in_array($user->ID, $selected_users)); ?>>
								<?php echo esc_html($user->display_name); ?>
							</label>
						</p>
						<?php
					}
				}
				?>
			</div>
		</div>

		<div id="board_color_scheme" class="<?php echo $kanban_modern ? 'modern' : ''; ?>">
			<p class="board_settings_subtitle"><?php _e('Board Color Scheme:', 'kanban'); ?></p>
			<div id="project-color-style">
			<div class="switch-holder">
				<div class="switch-label">
					<?php _e('Color Scheme Type', 'kanban'); ?>
				</div>
				<div class="switch-toggle">
					<input id="color-type-switch" type="checkbox" name="kanban_modern" value="1" <?php checked($kanban_modern, '1'); ?>>
					<label for="color-type-switch"></label>
				</div>
			</div>
			</div>
			<div id="project-class-meta-box">
			<?php foreach ($classes as $class) : ?>
				<p>
					<input type="radio" name="project_class" value="<?php echo esc_attr($class); ?>" <?php checked($selected_class, $class); ?>>
					<?php echo esc_html(ucfirst(str_replace('-', ' ', $class))); ?>
				</p>
			<?php endforeach; ?>
			</div>
		</div>
	</div>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const roleFilter = document.getElementById('kanban-user-role-filter');
            const userSearch = document.getElementById('kanban-user-search');
            const userList = document.getElementById('kanban-users-list');
            const userItems = userList.querySelectorAll('.kanban-user-item');

            roleFilter.addEventListener('change', function() {
                filterUsers();
            });

            userSearch.addEventListener('input', function() {
                filterUsers();
            });

            function filterUsers() {
                const role = roleFilter.value.toLowerCase();
                const search = userSearch.value.toLowerCase();

                userItems.forEach(function(item) {
                    const itemRole = item.getAttribute('data-role').toLowerCase();
                    const itemName = item.textContent.toLowerCase();

                    if ((role === '' || itemRole.includes(role)) && (search === '' || itemName.includes(search))) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }

            const colorTypeSwitch = document.getElementById('color-type-switch');
            const projectColorStyle = document.getElementById('board_color_scheme');

            function toggleModernClass() {
                if (colorTypeSwitch.checked) {
                    projectColorStyle.classList.add('modern');
                } else {
                    projectColorStyle.classList.remove('modern');
                }
            }

            // Initial check
            toggleModernClass();

            // Listen for changes
            colorTypeSwitch.addEventListener('change', toggleModernClass);
        });
    </script>
    <?php
}

function save_project_class_meta_box($post_id) {
    if (!isset($_POST['project_class_nonce']) || !wp_verify_nonce($_POST['project_class_nonce'], 'save_project_class_meta_box')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    if (isset($_POST['project_class'])) {
        update_post_meta($post_id, '_project_class', sanitize_text_field($_POST['project_class']));
    } else {
        delete_post_meta($post_id, '_project_class');
    }

    if (isset($_POST['kanban_modern'])) {
        update_post_meta($post_id, '_kanban_modern', '1');
    } else {
        delete_post_meta($post_id, '_kanban_modern');
    }

    if (isset($_POST['kanban_project_description'])) {
        update_post_meta($post_id, '_kanban_project_description', wp_kses_post($_POST['kanban_project_description']));
    } else {
        delete_post_meta($post_id, '_kanban_project_description');
    }

    $selected_users = isset($_POST['kanban_users']) ? array_map('sanitize_text_field', $_POST['kanban_users']) : array();
    update_post_meta($post_id, '_allowed_kanban_users', $selected_users);
}
add_action('save_post', 'save_project_class_meta_box');

// Add selected color to body class
function add_project_class_to_body($classes) {
    if (is_singular('kanban-project')) {
        global $post;
        $project_class = get_post_meta($post->ID, '_project_class', true);
        if ($project_class) {
            $classes[] = $project_class;
        }

        $kanban_modern = get_post_meta($post->ID, '_kanban_modern', true);
        if ($kanban_modern) {
            $classes[] = 'kanban-modern';
        }
    }
    return $classes;
}
add_filter('body_class', 'add_project_class_to_body');
