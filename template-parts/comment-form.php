
<?php
$user_ID = get_current_user_id();
$avatar = get_avatar($user_ID );
$user = wp_get_current_user($user_ID);
?>
<div class="kanban-comment-form hide">
    <div class="kanban-comment-form-inner">
        <span class="kanban-comment-form-close">&#215;</span>
        <h2 class="kanban-comment-title"></h2>
        <form>
            <div class="kanban-comment-wrapper">
                <div class="kanban-user">
                    <div class="kanban-user-avatar">
                        <?php echo $avatar; ?>
                    </div>
                    <p class="kanban-user-name"><?php echo $user->display_name; ?></p>
                </div>
                <div class="kanban-comment-editor-js" id="kanban-comment-editor-js"></div>
                <button class="kanban-comment-save"><?php esc_html_e('Save', 'kanban'); ?></button>
            </div>
        </form>
        <div class="kanban-comments">

        </div>
    </div>
</div>
