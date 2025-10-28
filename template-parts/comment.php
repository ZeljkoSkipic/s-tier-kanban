<?php
$comment_content = $comment->comment_content;
$user_ID = $comment->user_id;
$user = get_user_by('ID', $user_ID);
$comment_date = date_i18n(get_option('date_format') . ' ' . get_option('time_format'), strtotime($comment->comment_date));
$avatar = get_avatar($user_ID);
?>

<div data-card-id="<?php echo $comment->comment_post_ID; ?>" data-user-id="<?php echo $user_ID; ?>" data-comment-id="<?php echo $comment->comment_ID ?>" class="kanban-comment">
    <div class="kanban-comment-header">
        <div class="kanban-comment-user-avatar">
            <?php echo $avatar; ?>
        </div>
        <p class="kanban-comment-user-name"><?php echo $user->display_name; ?></p>
        <p class="kanban-comment-date"><?php echo $comment_date; ?></p>

	<?php if(is_user_kanban_creation($user_ID) || is_user_kanban_admin()): ?>

    <div class="kanban-comment-buttons">
        <a data-comment-id="<?php echo $comment->comment_ID;  ?>" href="#" class="kanban-comment-edit"><?php esc_html_e('Edit', 'kanban'); ?></a>
        <a data-comment-id="<?php echo $comment->comment_ID;  ?>" class="kanban-comment-delete" href="#"><?php esc_html_e('Delete', 'kanban'); ?></a>
    </div>

	<?php endif; ?>

    </div>
    <div id="comment_<?php echo $comment->comment_ID; ?>" data-content='<?php echo htmlspecialchars_decode($comment_content); ?>' class="kanban-comment-text"> </div>
    <div style="display: none;" class="kanban-comment-buttons-edit-mode">
        <a data-comment-id="<?php echo $comment->comment_ID;  ?>" href="#" class="kanban-comment-edit-save"><?php esc_html_e('Save', 'kanban'); ?></a>
        <a data-comment-id="<?php echo $comment->comment_ID;  ?>" class="kanban-comment-discard" href="#"><?php esc_html_e('Discard', 'kanban'); ?></a>
    </div>
    </div>
</div>
