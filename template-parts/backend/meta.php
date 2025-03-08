<?php

// Allowed Users Meta Box

function add_kanban_user_meta_box() {
    add_meta_box(
        'kanban_users_meta_box',
        __('Allowed Kanban Users'),
        'render_kanban_users_meta_box',
        'project',
        'normal',
		'high'
    );
}
add_action('add_meta_boxes', 'add_kanban_user_meta_box');

function render_kanban_users_meta_box($post) {
    $roles = array('kanban-user', 'administrator');
    $selected_users = get_post_meta($post->ID, '_allowed_kanban_users', true) ?: array();

    wp_nonce_field('save_kanban_users_meta_box', 'kanban_users_nonce');
    ?>
    <div id="kanban-users-meta-box">
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
        });
    </script>
    <?php
}

function save_kanban_users_meta_box($post_id) {
    if (!isset($_POST['kanban_users_nonce']) || !wp_verify_nonce($_POST['kanban_users_nonce'], 'save_kanban_users_meta_box')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    $selected_users = isset($_POST['kanban_users']) ? array_map('sanitize_text_field', $_POST['kanban_users']) : array();
    update_post_meta($post_id, '_allowed_kanban_users', $selected_users);
}
add_action('save_post', 'save_kanban_users_meta_box');

function restrict_project_access($query) {
    if (!is_admin() && $query->is_main_query() && is_post_type_archive('project')) {
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
        'post_type' => 'project',
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

// Add custom color picker

function add_project_class_meta_box() {
    add_meta_box(
        'project_class_meta_box',
        __('Board Color Scheme', 'kanban'),
        'render_project_class_meta_box',
        'project',
        'normal',
		'high'
    );
}
add_action('add_meta_boxes', 'add_project_class_meta_box');

function render_project_class_meta_box($post) {
    $classes = array('kanban-color-one', 'kanban-color-two', 'kanban-color-three');
    $selected_class = get_post_meta($post->ID, '_project_class', true);

    wp_nonce_field('save_project_class_meta_box', 'project_class_nonce');
    ?>
    <div id="project-class-meta-box">
        <?php foreach ($classes as $class) : ?>
            <p>
                <input type="radio" name="project_class" value="<?php echo esc_attr($class); ?>" <?php checked($selected_class, $class); ?>>
                <?php echo esc_html(ucfirst(str_replace('-', ' ', $class))); ?>
            </p>
        <?php endforeach; ?>
    </div>
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
}
add_action('save_post', 'save_project_class_meta_box');

// Add selected color to body class
function add_project_class_to_body($classes) {
    if (is_singular('project')) {
        global $post;
        $project_class = get_post_meta($post->ID, '_project_class', true);
        if ($project_class) {
            $classes[] = $project_class;
        }
    }
    return $classes;
}
add_filter('body_class', 'add_project_class_to_body');
