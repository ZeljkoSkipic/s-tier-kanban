<?php

// Project Post Type
function register_kanban_post_types() {
    $args = array(
        'public' => true,
		'show_in_menu' => false,
		'show_in_admin_bar'   => true,
        'label'  => 'Projects',
        'supports' => array('title', 'thumbnail'),
		'labels' => array(
			'name' => 'Projects',
			'singular_name' => 'Project',
			'menu_name' => 'Projects',
			'all_items' => 'All Projects',
			'edit_item' => 'Edit Project',
			'view_item' => 'View Project',
			'view_items' => 'View Projects',
			'add_new_item' => 'Add New Project',
			'add_new' => 'Add New Project',
			'new_item' => 'New Project',
			'parent_item_colon' => 'Parent Project:',
			'search_items' => 'Search Projects',
			'not_found' => 'No projects found',
			'not_found_in_trash' => 'No projects found in Trash',
			'archives' => 'Project Archives',
			'attributes' => 'Project Attributes',
			'insert_into_item' => 'Insert into project',
			'uploaded_to_this_item' => 'Uploaded to this project',
			'filter_items_list' => 'Filter projects list',
			'filter_by_date' => 'Filter projects by date',
			'items_list_navigation' => 'Projects list navigation',
			'items_list' => 'Projects list',
			'item_published' => 'Project published.',
			'item_published_privately' => 'Project published privately.',
			'item_reverted_to_draft' => 'Project reverted to draft.',
			'item_scheduled' => 'Project scheduled.',
			'item_updated' => 'Project updated.',
			'item_link' => 'Project Link',
			'item_link_description' => 'A link to a project.',
		),
    );

    register_post_type('kanban-project', $args);

    // Register Columns
    $args = array(
        'public' => true,
		'show_in_menu' => false,
        'label'  => 'Kanban Columns',
        'supports' => array('title'),
        'show_in_rest' => true, // Optional: if you want to use Gutenberg editor
    );

    register_post_type('kanban_column', $args);

    // Register Cards
    $args = array(
        'public' => true,
		'show_in_menu' => false,
        'label'  => 'Kanban Cards',
        'supports' => array('title', 'editor', 'custom-fields'),
    );
    register_post_type('kanban_card', $args);
}

add_action('init', 'register_kanban_post_types');

// Restrict only Paragraph Block for Projects

function restrict_blocks_for_custom_type($allowed_blocks, $editor_context) {
    if (!empty($editor_context->post) && $editor_context->post->post_type === 'kanban-project') {
        return ['core/paragraph']; // Only allow paragraph block
    }
    return $allowed_blocks;
}
add_filter('allowed_block_types_all', 'restrict_blocks_for_custom_type', 10, 2);


// Project Template

function stk_single_template($single_template) {
    global $post;

    if ($post->post_type == 'kanban-project') {
        $plugin_template = plugin_dir_path(__FILE__) . 'single-kanban-project.php';
        if (file_exists($plugin_template)) {
            return $plugin_template;
        }
    }

    return $single_template;
}

add_filter('single_template', 'stk_single_template');
