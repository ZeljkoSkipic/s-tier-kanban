<?php

add_action('after_delete_post', 'clean_kanban_posts', 10, 2);
add_action('wp_trash_post', 'trashed_kanban_posts', 10, 2);
add_action('untrashed_post', 'restore_kanban_posts', 10, 2);


function getDeleteTrashedColumns(int $post_id)
{
    return  get_posts([
        'post_type' => 'kanban_column',
        'posts_per_page' => -1,
        'post_status'     => 'publish, trash',
        'meta_query' => array(
            array(
                'key' => 'associated_project_id',
                'value' => $post_id,
                'compare' => '=',
            ),
        ),
    ]);
}

function getDeleteTrashedCards(int $post_id)
{
    return get_posts([
        'post_type' => 'kanban_card',
        'posts_per_page' => -1,
        'post_status'     => 'publish, trash',
        'meta_query' => array(
            array(
                'key' => 'associated_column_id',
                'value' => $post_id,
                'compare' => '=',
            ),
        ),
    ]);
}


function clean_kanban_posts(int $post_id, WP_Post $post)
{

    // Kanban Project deleted

    if ($post->post_type === 'kanban-project') {

        // Get all project columns

        $project_columns = getDeleteTrashedColumns($post_id);

        if ($project_columns) {
            foreach ($project_columns as $project_column) {
                wp_delete_post($project_column->ID, true);
            }
        }
    }

    // Kanban Column deleted


    if ($post->post_type === 'kanban_column') {

        $project_cards = getDeleteTrashedCards($post_id);

        if ($project_cards) {
            foreach ($project_cards as $project_card) {
                wp_delete_post($project_card->ID, true);
            }
        }
    }
}

function trashed_kanban_posts(int $post_id, string $previous_status)
{

    $post_type = get_post_type($post_id);

    // Kanban project trashed

    if ($post_type === 'kanban-project') {
        $project_columns = getDeleteTrashedColumns($post_id);

        if ($project_columns) {
            foreach ($project_columns as $project_column) {
                wp_trash_post($project_column->ID);
            }
        }
    }

    // Kanban Column trashed

    if ($post_type === 'kanban_column') {

        $project_cards = getDeleteTrashedCards($post_id);

        if ($project_cards) {
            foreach ($project_cards as $project_card) {
                wp_trash_post($project_card->ID);
            }
        }
    }
}

function restore_kanban_posts(int $post_id, string $previous_status)
{

    $post_type = get_post_type($post_id);

    // Kanban project restored

    if ($post_type === 'kanban-project') {

        wp_update_post(array(
            'ID'            =>  $post_id,
            'post_status'   =>  'publish'
        ));

        $project_columns = getDeleteTrashedColumns($post_id);

        if ($project_columns) {
            foreach ($project_columns as $project_column) {
                $post = wp_untrash_post($project_column);

                wp_update_post(array(
                    'ID'            =>  $post->ID,
                    'post_status'   =>  'publish'
                ));
            }
        }
    }

    // Kanban Column restored

    if ($post_type === 'kanban_column') {

        wp_update_post(array(
            'ID'            =>  $post_id,
            'post_status'   =>  'publish'
        ));

        $project_cards = getDeleteTrashedCards($post_id);

        if ($project_cards) {
            foreach ($project_cards as $project_card) {
                $post = wp_untrash_post($project_card);

                wp_update_post(array(
                    'ID'            =>  $post->ID,
                    'post_status'   =>  'publish'
                ));
            }
        }
    }
}
