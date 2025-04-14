<?php
global $post;
$users = getCommentsUsers(get_the_ID());
$user_id = $post->post_author;
$card_column = get_post_meta(get_the_ID(), 'associated_column_id', true);
$project_id = get_post_meta($card_column, 'associated_project_id', true);
$card_users = get_post_meta(get_the_ID(), 'card_users', true);
?>

<div class="kanban-card" data-user-admin="<?php echo is_user_kanban_admin(); ?>" data-user-creation="<?php echo is_user_kanban_creation($user_id); ?>" data-card-id="<?php echo esc_attr(get_the_ID()); ?>">

	<h4 contenteditable="false" class="card-title"><?php echo $title ? $title : __('Add Title', 'kanban'); ?></h4>
	<div data-description='<?php echo $description ? $description : '{}'; ?>' id="card-description-<?php echo get_the_ID(); ?>" class="card-description" contenteditable="false"></div>

	<?php
	include PLUGIN_ROOT_PATH . 'template-parts/priority.php';
	include PLUGIN_ROOT_PATH . 'template-parts/status.php';

	?>
	<?php if (is_user_kanban_creation($user_id) || is_user_kanban_admin()): ?>

		<button class="delete-card-btn" data-card-id="<?php echo esc_attr(get_the_ID()); ?>">Delete Card</button>

	<?php endif; ?>

	<div class="card-bottom">
		<?php if (KanbanUpdate::isLicenceValid()): ?>

			<div data-cardID="<?php the_ID() ?>" data-projectID="<?php echo $project_id; ?>" class="user-assign selected-users <?php if ($card_users) echo 'hasUsers'; ?>">

				<?php
				if ($card_users) {
					foreach (array_reverse($card_users) as $card_user) {
						$user = get_userdata($card_user);
						include PLUGIN_ROOT_PATH . 'template-parts/assign-user.php';
					}
				}

				?>

				<?php echo file_get_contents(PLUGIN_ROOT_PATH . 'assets/icons/assign-user.svg'); ?>

			</div>

		<?php endif; ?>

		<?php include PLUGIN_ROOT_PATH . '/template-parts/assign-users-view.php'; ?>
		<div class="card-svgs">
			<div class="comment_svg">
				<?php
				if ($users): ?>
					<svg title="Card has Comments" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#808890" class="size-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
					</svg>
				<?php endif; ?>
			</div>
			<div class="description_svg">

				<?php if ($description): ?>

					<svg title="Card has a Description" width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M13.25 10.875V8.6875C13.25 7.94158 12.9537 7.22621 12.4262 6.69876C11.8988 6.17132 11.1834 5.875 10.4375 5.875H9.1875C8.93886 5.875 8.7004 5.77623 8.52459 5.60041C8.34877 5.4246 8.25 5.18614 8.25 4.9375V3.6875C8.25 2.94158 7.95368 2.22621 7.42624 1.69876C6.89879 1.17132 6.18342 0.875 5.4375 0.875H3.875M3.875 11.5H10.125M3.875 14H7M5.75 0.875H1.6875C1.17 0.875 0.75 1.295 0.75 1.8125V16.1875C0.75 16.705 1.17 17.125 1.6875 17.125H12.3125C12.83 17.125 13.25 16.705 13.25 16.1875V8.375C13.25 6.38588 12.4598 4.47822 11.0533 3.0717C9.64678 1.66518 7.73912 0.875 5.75 0.875Z" stroke="#808890" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
					</svg>

				<?php endif; ?>

			</div>
		</div>
	</div>
</div>