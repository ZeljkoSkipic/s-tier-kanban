<?php

// Start the loop.
get_header();

$avatar = get_avatar($user_ID);

while (have_posts()) : the_post(); ?>

	<div class="board-header">
		<div class="top">
			<div class="top_left">
				<?php the_post_thumbnail(); ?>
				<h1><?php the_title(); ?></h1>
			</div>
			<div class="top_expander_wrap">
				<p>Project Details</p> <span class="top_expander expander"></span>
			</div>
			<div class="empty"></div>
			<div class="user_info">
				<?php
				// Display projects the current user is added to
				$current_user_id = get_current_user_id();
				$current_user_info = get_userdata($current_user_id);
				$current_user_avatar = get_avatar($current_user_id, 32); // Get user avatar with size 32
				$first_name = get_user_meta($current_user_id, 'first_name', true);
				$last_name = get_user_meta($current_user_id, 'last_name', true);
				$current_user_display_name = trim($first_name . ' ' . $last_name);
				if (empty($current_user_display_name)) {
					$current_user_display_name = $current_user_info->user_login;
				}
				?>
				<div class="user_info_top">
					<div class="user_image_idle">
						<?php echo $current_user_avatar ?> <p class="user_name"><?php echo esc_html($current_user_display_name); ?></p>
					</div>
					<span class="side_expander expander"></span>
				</div>
				<div class="user_info_inner_wrap side_hidden">
					<div class="user_info_inner">
						<div class="current-user-info">
						</div>

						<div class="user_boards">
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
						</div>
						<div class="account_meta">
							<?php
							// Get the account page that uses the 'kanban-account.php' template
							$account_page = get_pages(array(
								'meta_key' => '_wp_page_template',
								'meta_value' => 'kanban-account.php'
							));

							if (!empty($account_page)) {
								$account_page_url = get_permalink($account_page[0]->ID); ?>
								<a class="account-link" href="<?php echo esc_url($account_page_url); ?>">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
										<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
										<circle cx="12" cy="7" r="4"></circle>
									</svg>
									<?php _e('My Account', 'kanban'); ?>
								</a>

							<?php }	?>

							<a href="<?php echo wp_logout_url(); ?>" class="logout-link"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#18191B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out">
									<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
									<polyline points="16 17 21 12 16 7"></polyline>
									<line x1="21" y1="12" x2="9" y2="12"></line>
								</svg>Log Out</a>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="bottom">
			<div class="bottom_inner">
				<div class="bottom_left">
					<p>
						<?php
						$project_description = get_post_meta(get_the_ID(), '_kanban_project_description', true);
						echo wp_kses_post($project_description);
						?>
					</p>
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
										$first_name = get_user_meta($user_id, 'first_name', true);
										$last_name = get_user_meta($user_id, 'last_name', true);
										$display_name = trim($first_name . ' ' . $last_name);
										if (empty($display_name)) {
											$display_name = $user_info->user_login;
										}
										echo $user_avatar . ' ' . esc_html($display_name);
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
		'meta_key'      => 'column_order',
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

	<div id="kanban-board" data-project-id="<?php echo esc_attr(get_the_ID()); ?>">
		<?php if ($columns_query->have_posts()) : ?>
			<?php while ($columns_query->have_posts()) : $columns_query->the_post();
				include plugin_dir_path(__FILE__) . 'template-parts/column.php';
			endwhile; ?>
		<?php endif; ?>
		<button id="add-column-btn">New Column</button>
		<?php include plugin_dir_path(__FILE__) . 'template-parts/branding.php'; ?>
	</div> <!-- Kanban board -->

<?php wp_reset_postdata(); // Important: Reset the $post global to the current post in the main query

endwhile;

// Comments

include_once plugin_dir_path(__FILE__) . 'template-parts/card-view.php';

get_footer();
?>


<script>
	jQuery(document).ready(function($) {
		$(".card-flags label").on("click", function() {
			$(this).siblings(".card-flags label").animate({
				width: 'toggle'
			});
		});
	});
</script>
