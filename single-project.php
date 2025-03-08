<script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>

<?php
// Start the loop.
get_header();

$avatar = get_avatar($user_ID);

while (have_posts()) : the_post(); ?>

	<div class="board-header">
		<div class="top">
			<?php the_post_thumbnail(); ?>
			<h1><?php the_title(); ?></h1>
			<span class="top_expander expander"></span>

		</div>

		<div class="bottom">
			<div class="bottom_inner">
				<div class="bottom_left">
					<?php the_content(); ?>
				</div>
				<div class="bottom_right">
					<div class="board_members">
						<p class="board_members_title"><?php the_title(); ?> Members:</p>
							<?php
							$allowed_users = get_post_meta(get_the_ID(), '_allowed_kanban_users', true) ?: array();
							if (!empty($allowed_users)) {
								foreach ($allowed_users as $user_id) { ?>
									<div class="board_member">
									<?php $user_info = get_userdata($user_id);
									if ($user_info) {
										$user_avatar = get_avatar($user_id, 32); // Get user avatar with size 32
									echo  $user_avatar . ' ' . esc_html($user_info->display_name);
									} ?>
									</div>
								<?php }
							}
							?>
					</div>
				</div>
			</div>
		</div>

    </div>

    <?php

    $columns_query = new WP_Query(array(
        'post_type' => 'kanban_column', // Use the correct post type slug
        'posts_per_page' => -1, // Get all columns
        'orderby' => 'meta_value_num',
        'order' => 'ASC',
        'meta_query' => array(
            array(
                'key' => 'associated_project_id', // Make sure this matches the meta key used to store the project ID in the column posts
                'value' => get_the_ID(), // The current project ID
                'compare' => '=',
            ),
        ),
    ));

    ?>

	<div class="kanban_main_wrap">
		<div class="user_info">
			<span class="side_expander expander"></span>
			<div class="user_info_inner">
				<?php
					// Display projects the current user is added to
					$current_user_id = get_current_user_id();
					$current_user_info = get_userdata($current_user_id);
					$current_user_avatar = get_avatar($current_user_id, 32); // Get user avatar with size 32
					$current_user_display_name = esc_html($current_user_info->display_name);
					?>
					<div class="current-user-info">
						<?php echo $current_user_avatar ?> <p class="user_name side_hidden"><?php echo $current_user_display_name; ?></p>
					</div>
					<div class="user_boards side_hidden">
					<?php
					$user_projects = get_user_projects($current_user_id);
					$current_project_id = get_the_ID();

					if (!empty($user_projects)) { ?>
						<p class="user_boards_title">Your Kanbans:</p>
						<?php foreach ($user_projects as $project) {
							$class = ($project->ID == $current_project_id) ? 'current-project' : '';
							$thumbnail = get_the_post_thumbnail($project->ID, 'full', array('class' => 'project-thumbnail'));
							echo '<a href="' . get_permalink($project->ID) . '">' . $thumbnail . esc_html($project->post_title) . '</a>';
						}
					}
				?>
				    <a href="<?php echo wp_logout_url(); ?>" class="logout-link"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#18191B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>Log Out</a>

				</div>
			</div>
		</div>
		<div id="kanban-board" data-project-id="<?php echo esc_attr(get_the_ID()); ?>">
			<?php if ($columns_query->have_posts()) : ?>

				<?php while ($columns_query->have_posts()) : $columns_query->the_post();
					$column_id = get_the_ID();
					$column_title = get_the_title();
					$column_order = get_post_meta($column_id, 'column_order', true); ?>
					<div class="kanban-column" data-column-id="<?php echo esc_attr(get_the_ID()); ?>">
						<h3 class="column-title" onclick="editColumnTitle(this)"><?php echo $column_title; ?></h3>
						<button class="delete-column-btn">Delete Column</button>
						<div class="kanban-column-inner">
							<div class="kanban-cards-container">
								<?php
								// Query to get all cards associated with the current column
								$cards_query = new WP_Query(array(
									'post_type' => 'kanban_card',
									'posts_per_page' => -1,
									'meta_key'      => 'card_order',
									'orderby' => 'meta_value_num', // If card order is numeric
									'order' => 'ASC',
									'meta_query' => array(
										array(
											'key' => 'associated_column_id',
											'value' => $column_id,
											'compare' => '=',
										),
									),
								));

								if ($cards_query->have_posts()) :
									while ($cards_query->have_posts()) :
										$cards_query->the_post();
										$status = get_post_meta(get_the_ID(), 'status', true);
										$priority = get_post_meta(get_the_ID(), 'priority', true);
										$title = get_the_title();
										$description = htmlspecialchars_decode(get_the_content());
										include PLUGIN_ROOT_PATH. 'template-parts/card.php';
									endwhile;
								endif;
								wp_reset_postdata();
								?>
							</div> <!-- Container for cards -->

							<div class="add-card-wrap">
								<button class="add-card-btn">Add a Card</button>
							</div>
						</div>
						<!-- Display other column details as needed -->
					</div>
				<?php endwhile; ?>

			<?php endif; ?>
			<button id="add-column-btn">Add Column</button>

		</div> <!-- Kanban board -->
	</div>
<?php wp_reset_postdata(); // Important: Reset the $post global to the current post in the main query

endwhile;

// Comments

include_once plugin_dir_path(__FILE__) . 'template-parts/card-view.php';

get_footer();
?>

<script>
    const sortCards = (evt) => {

        const cardId = evt.item.getAttribute('data-card-id');
        const newColumnId = evt.to.closest('.kanban-column').getAttribute('data-column-id');
        const cardOrder = Array.from(evt.to.children).map(function(card) {
            return card.getAttribute('data-card-id');
        });

        jQuery.ajax({
            url: myAjax.ajaxurl,
            type: 'POST',
            data: {
                action: 'stk_move_card',
                cardId: cardId,
                newColumnId: newColumnId,
                newOrder: cardOrder,
                security: myAjax.security
            },
            success: function(response) {
                if (!response.success) {
                    console.error('Failed to move card:', response);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error moving card:', status, error);
            }
        });
    }

    document.addEventListener('columnAdded', (e) => {
        const column = e.detail.column;
        const container = column.querySelector('.kanban-cards-container');

        Sortable.create(container, {
            group: 'cards',
            animation: 150,
            draggable: '.kanban-card', // Specify draggable items
            onAdd: (evt) => sortCards(evt),
            onUpdate: (evt) => sortCards(evt)
        });
    }, false)

    document.querySelectorAll('.kanban-cards-container').forEach(function(el) {
        Sortable.create(el, {
            group: 'cards',
            animation: 150,
            draggable: '.kanban-card', // Specify draggable items
            onAdd: (evt) => sortCards(evt),
            onUpdate: (evt) => sortCards(evt)
        });
    });


    jQuery(document).ready(function($) {

        $(".card-flags label").on("click", function() {
            $(this).siblings(".card-flags label").animate({
                width: 'toggle'
            });
        });

    });
</script>
