<?php

add_action('delete_post', 'clean_kanban_posts', 10, 2);


function clean_kanban_posts(int $post_id, WP_Post $post)
{

    // Kanban Project deleted

    if ($post->post_type === 'kanban-project') {

        // Get all project columns

        $project_columns = get_posts([
            'post_type' => 'kanban_column',
            'posts_per_page' => -1,
            'meta_query' => array(
                array(
                    'key' => 'associated_project_id',
                    'value' => $post_id,
                    'compare' => '=',
                ),
            ),
        ]);


        if ($project_columns) {
            foreach ($project_columns as $project_column) {
                wp_delete_post($project_column->ID, true);
            }
        }
    }

    // Kanban Column deleted


    if ($post->post_type === 'kanban_column') {

        $project_cards = get_posts([
            'post_type' => 'kanban_card',
            'posts_per_page' => -1,
            'meta_query' => array(
                array(
                    'key' => 'associated_column_id',
                    'value' => $post_id,
                    'compare' => '=',
                ),
            ),
        ]);

        if ($project_cards) {
            foreach ($project_cards as $project_card) {
                wp_delete_post($project_card->ID, true);
            }
        }
    }
}
