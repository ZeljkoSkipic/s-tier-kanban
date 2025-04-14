<?php
global $post;

$user_ID = get_current_user_id();
$avatar = get_avatar($user_ID);
$user = wp_get_current_user($user_ID);
$card_users = get_post_meta(get_the_ID(), 'card_users', true);
?>
<div class="kanban-card-view hide">
	<div class="kanban-card-view-inner">
		<span class="kanban-card-view-close">&#215;</span>
		<div class="card-title-wrap">
			<h2 contenteditable="false" class="card-title"></h2>
		</div>

		<div class="kanban-card-view-left">
			<div class="kanban-card-view-description">
				<h3 class="card-subtitle"><?php esc_html_e('Description:', 'kanban'); ?></h3>
				<div id="description-editor-js" class="kanban-card-view-description-editor">

				</div>
				<button style="display: none;" class="kanban-description-save"><?php esc_html_e('Save Description', 'kanban'); ?></button>
			</div>
			<h3 class="card-subtitle"><?php esc_html_e('Comments:', 'kanban'); ?></h3>
			<div class="kanban-comments">

			</div>
			<form>
				<div class="kanban-comment-wrapper">
					<div class="kanban-comment-wrap">
						<div class="kanban-comment-editor-js" id="kanban-comment-editor-js"></div>
						<button class="kanban-comment-save"><?php esc_html_e('Submit', 'kanban'); ?></button>
					</div>
				</div>
			</form>
		</div>
		<div class="kanban-card-view-right">
			<h4 class="card-sidebar-subtitle board_members_title">Assigned Members</h4>
			<?php
			include PLUGIN_ROOT_PATH . '/template-parts/assign-users-view.php';
			$show_title = true;
			$status = "";
			$priority = "";
			include PLUGIN_ROOT_PATH . 'template-parts/priority.php';
			include PLUGIN_ROOT_PATH . 'template-parts/status.php';
			?>



			<a class="sidebar-btn sidebar-btn-copy">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
				</svg>
				<?php esc_html_e('Copy Card Link', 'kanban'); ?>
				<span id="copyMessage" style="display: none; color: green;">
					<?php esc_html_e('Copied!', 'kanban'); ?>
				</span>
			</a>
			<a class="sidebar-btn sidebar-btn-delete">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="#F90B31" class="size-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
				</svg>
				<?php esc_html_e('Delete Card', 'kanban'); ?>
			</a>


		</div>
	</div>
	<?php include plugin_dir_path(__FILE__) . 'branding.php'; ?>
</div>
