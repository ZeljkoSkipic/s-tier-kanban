<?php

// Start the loop.
include plugin_dir_path(__FILE__) . 'header-kanban.php';


$avatar = get_avatar($user_ID);

while (have_posts()) : the_post(); ?>
	<div class="board-header">
		<div class="top">
			<div class="top_left">
				<?php if(has_post_thumbnail()) { ?>
					<figure class="kp_logo">
						<?php the_post_thumbnail(); ?>
					</figure>
				<?php } ?>

				<div class="top_left_right">
					<h1><?php the_title(); ?></h1>
					<p class="kp_details_expander">
						Project Details
						<svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.50002 6C5.37215 6 5.24415 5.95112 5.14652 5.8535L0.146531 0.853526C-0.0488437 0.658153 -0.0488437 0.341779 0.146531 0.14653C0.341906 -0.0487185 0.65828 -0.0488435 0.85353 0.14653L5.50002 4.79301L10.1465 0.14653C10.3419 -0.0488435 10.6583 -0.0488435 10.8535 0.14653C11.0488 0.341904 11.0489 0.658278 10.8535 0.853526L5.85352 5.8535C5.7559 5.95112 5.6279 6 5.50002 6Z" fill="#C7C7C7"/></svg>
					</p>

					<div class="kp_details">
						<div class="kp_details_inner">
						<div class="kp_details_top">
							<p class="kp_details_title">
								<?php _e('Project Description', 'kanban'); ?>
							</p>
							<?php $project_description = get_post_meta(get_the_ID(), '_kanban_project_description', true);
								if($project_description) { ?>

								<div class="kp_project_description">
									<?php echo wp_kses_post($project_description); ?>
								</div>
							<?php } ?>
						</div>

						<?php
							$kanban_documents = get_post_meta(get_the_ID(), 'kanban-board-documents', true);
							$kanban_documents = $kanban_documents ? explode(',', $kanban_documents) : [];
							?>
							<?php if ($kanban_documents && KanbanUpdate::isLicenceValid()): ?>

							<div class="kp_documents kp_details_left">
								<p class="kp_details_title">Project Files:</p>
								<div class="board_documents_files">

								<?php foreach ($kanban_documents as $kanban_documentID): ?>
									<?php
									$file_url = wp_get_attachment_url($kanban_documentID);
									$file_path = get_attached_file($kanban_documentID);
									$file_info = pathinfo($file_path);
									$file_extension = isset($file_info['extension']) ? strtolower($file_info['extension']) : 'unknown'; // Get file extension
									?>
									<a download href="<?php echo esc_url($file_url); ?>">
										<span class="file-type-<?php echo esc_attr($file_extension); ?>"></span><?php echo ucfirst(basename($file_path)); ?>
									</a>
								<?php endforeach; ?>

								</div>
							</div>
							<div class="kp_members kp_details_right">
								<p class="kp_details_title">Board Members:</p>
								<?php
								$allowed_users = get_post_meta(get_the_ID(), '_allowed_kanban_users', true) ?: array();
								if (!empty($allowed_users)) {
									foreach ($allowed_users as $user_id) { ?>
										<div class="board_member">
										<?php $user_info = get_userdata($user_id);
										if ($user_info) {
											$first_name = get_user_meta($user_id, 'first_name', true);
											$last_name = get_user_meta($user_id, 'last_name', true);
											$display_name = trim($first_name . ' ' . $last_name);
											if (empty($display_name)) {
												$display_name = $user_info->user_login;
											}
											// Add the display name as the title attribute of the avatar
											$avatar_html = get_avatar($user_id, 32, '', esc_attr($display_name));
											$avatar_with_title = str_replace('<img', '<img title="' . esc_attr($display_name) . '"', $avatar_html);
											echo $avatar_with_title;
										} ?>
										</div>
								<?php }
								}
								?>
						</div>
					<?php endif; ?>
					</div>
					</div> <!-- end project details -->
				</div>
			</div>

			<div class="top_right">
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
				<div class="user_info">
					<div class="user_static">
						<?php echo $current_user_avatar ?>
						<p class="user_name"><?php echo esc_html($current_user_display_name); ?></p>
						<svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.50002 6C5.37215 6 5.24415 5.95112 5.14652 5.8535L0.146531 0.853526C-0.0488437 0.658153 -0.0488437 0.341779 0.146531 0.14653C0.341906 -0.0487185 0.65828 -0.0488435 0.85353 0.14653L5.50002 4.79301L10.1465 0.14653C10.3419 -0.0488435 10.6583 -0.0488435 10.8535 0.14653C11.0488 0.341904 11.0489 0.658278 10.8535 0.853526L5.85352 5.8535C5.7559 5.95112 5.6279 6 5.50002 6Z" fill="#C7C7C7"/></svg>
					</div>
					<div class="user_info_content">
						<div class="user_boards">
							<?php
							$user_projects = get_user_projects($current_user_id);
							$current_project_id = get_the_ID();
							if (!empty($user_projects)) { ?>
								<p class="user_boards_title">Your Boards:</p>
							<?php foreach ($user_projects as $project) {
									$class = ($project->ID == $current_project_id) ? 'current-project' : '';
									$thumbnail = get_the_post_thumbnail($project->ID, 'full', array('class' => 'project-thumbnail'));
									echo '<a href="' . get_permalink($project->ID) . '">' . $thumbnail . esc_html($project->post_title) . '</a>';
								}
							}
							?>
						</div> <!-- end user boards -->

						<?php // Edit Project

						// Check if user can edit projects (administrator or kanban-admin)
						if (current_user_can('administrator') || current_user_can('kanban-admin')) {
							$edit_link = get_edit_post_link($current_project_id);
							if (!empty($edit_link)) {
								echo '<div class="edit-project-link">';
								echo '<a href="' . esc_url($edit_link) . '">';
								echo '<svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.941406 13.625H16.6914V14.75H0.941406V13.625ZM14.1039 4.0625C14.5539 3.6125 14.5539 2.9375 14.1039 2.4875L12.0789 0.4625C11.6289 0.0125 10.9539 0.0125 10.5039 0.4625L2.06641 8.9V12.5H5.66641L14.1039 4.0625ZM11.2914 1.25L13.3164 3.275L11.6289 4.9625L9.60391 2.9375L11.2914 1.25ZM3.19141 11.375V9.35L8.81641 3.725L10.8414 5.75L5.21641 11.375H3.19141Z" fill="#C7C7C7"/></svg>';
								echo __('Edit Project', 'kanban');
								echo '</a>';
								echo '</div>';
							}
						}
						// end edit project ?>

						<div class="account_meta">
							<?php
							// Get the account page that uses the 'kanban-account.php' template
							$account_page = get_pages(array(
								'meta_key' => '_wp_page_template',
								'meta_value' => 'kanban-account.php'
							)); ?>

							<a class="account-link" href="/kanban-profile">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
									<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
									<circle cx="12" cy="7" r="4"></circle>
								</svg>
								<?php _e('My Account', 'kanban'); ?>
							</a>
							<a href="<?php echo wp_logout_url(); ?>" class="logout-link"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out">
									<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
									<polyline points="16 17 21 12 16 7"></polyline>
									<line x1="21" y1="12" x2="9" y2="12"></line>
								</svg>Log Out</a>
						</div> <!-- end account meta -->

					</div>
				</div>
			</div>

			<button id="fullscreen-btn">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.2734 0.914062H17.1953C16.9798 0.914063 16.7732 0.999665 16.6208 1.15204C16.4684 1.30441 16.3828 1.51107 16.3828 1.72656C16.3828 1.94205 16.4684 2.14871 16.6208 2.30109C16.7732 2.45346 16.9798 2.53906 17.1953 2.53906H21.4609V6.80469C21.4609 7.02018 21.5465 7.22684 21.6989 7.37921C21.8513 7.53159 22.0579 7.61719 22.2734 7.61719C22.4889 7.61719 22.6956 7.53159 22.848 7.37921C23.0003 7.22684 23.0859 7.02018 23.0859 6.80469V1.72656C23.0859 1.51107 23.0003 1.30441 22.848 1.15204C22.6956 0.999665 22.4889 0.914063 22.2734 0.914062Z" fill="#C7C7C7"/><path d="M6.80469 0.914062H1.72656C1.51107 0.914062 1.30441 0.999665 1.15204 1.15204C0.999665 1.30441 0.914063 1.51107 0.914062 1.72656V6.80469C0.914063 7.02018 0.999665 7.22684 1.15204 7.37921C1.30441 7.53159 1.51107 7.61719 1.72656 7.61719C1.94205 7.61719 2.14871 7.53159 2.30109 7.37921C2.45346 7.22684 2.53906 7.02018 2.53906 6.80469V2.53906H6.80469C7.02018 2.53906 7.22684 2.45346 7.37921 2.30109C7.53159 2.14871 7.61719 1.94205 7.61719 1.72656C7.61719 1.51107 7.53159 1.30441 7.37921 1.15204C7.22684 0.999665 7.02018 0.914063 6.80469 0.914062Z" fill="#C7C7C7"/><path d="M6.80469 21.4629H2.53906V17.1973C2.53906 16.9818 2.45346 16.7751 2.30109 16.6227C2.14871 16.4704 1.94205 16.3848 1.72656 16.3848C1.51107 16.3848 1.30441 16.4704 1.15204 16.6227C0.999665 16.7751 0.914063 16.9818 0.914062 17.1973V22.2754C0.914063 22.4909 0.999665 22.6975 1.15204 22.8499C1.30441 23.0023 1.51107 23.0879 1.72656 23.0879H6.80469C7.02018 23.0879 7.22684 23.0023 7.37921 22.8499C7.53159 22.6975 7.61719 22.4909 7.61719 22.2754C7.61719 22.0599 7.53159 21.8532 7.37921 21.7009C7.22684 21.5485 7.02018 21.4629 6.80469 21.4629Z" fill="#C7C7C7"/><path d="M22.2734 16.3848C22.0579 16.3848 21.8513 16.4704 21.6989 16.6227C21.5465 16.7751 21.4609 16.9818 21.4609 17.1973V21.4629H17.1953C16.9798 21.4629 16.7732 21.5485 16.6208 21.7009C16.4684 21.8532 16.3828 22.0599 16.3828 22.2754C16.3828 22.4909 16.4684 22.6975 16.6208 22.8499C16.7732 23.0023 16.9798 23.0879 17.1953 23.0879H22.2734C22.4889 23.0879 22.6956 23.0023 22.848 22.8499C23.0003 22.6975 23.0859 22.4909 23.0859 22.2754V17.1973C23.0859 16.9818 23.0003 16.7751 22.848 16.6227C22.6956 16.4704 22.4889 16.3848 22.2734 16.3848Z" fill="#C7C7C7"/></svg>
			</button>
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
		<button id="add-column-btn" class="add-item-btn">
			<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.99984 1.66667V13.3333M1.1665 7.5H12.8332" stroke="#18191B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/></svg>
			New Column
		</button>
		<?php if (!KanbanUpdate::isLicenceValid()): ?>
			<?php include plugin_dir_path(__FILE__) . 'template-parts/branding.php'; ?>
		<?php endif; ?>
	</div> <!-- Kanban board -->

<?php wp_reset_postdata(); // Important: Reset the $post global to the current post in the main query

endwhile;

// Comments

include_once plugin_dir_path(__FILE__) . 'template-parts/card-view.php';

get_footer();
?>
