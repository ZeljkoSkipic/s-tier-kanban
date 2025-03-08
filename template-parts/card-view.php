
<?php
$user_ID = get_current_user_id();
$avatar = get_avatar($user_ID );
$user = wp_get_current_user($user_ID);
?>
<div class="kanban-card-view hide">
    <div class="kanban-card-view-inner">
        <span class="kanban-card-view-close">&#215;</span>
        <h2 contenteditable="false" class="card-title"></h2>
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
</div>
