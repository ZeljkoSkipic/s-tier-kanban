<?php
$current_user_id = get_current_user_id();
?>
<div class="s-tier-kanban-edit-profile hide">
    <form id="edit-info-form" method="post">
		<h2>Edit Information</h2>
        <p>
            <label for="first_name"><?php _e('First Name', 'kanban'); ?></label>
            <input autocomplete="off" type="text" name="first_name" id="first_name" value="<?php echo esc_attr(get_the_author_meta('first_name', $current_user_id)); ?>">
        </p>
        <p>
            <label for="last_name"><?php _e('Last Name', 'kanban'); ?></label>
            <input autocomplete="off" type="text" name="last_name" id="last_name" value="<?php echo esc_attr(get_the_author_meta('last_name', $current_user_id)); ?>">
        </p>
        <p>
            <label for="password"><?php _e('New Password', 'kanban'); ?></label>
            <input value="" autocomplete="off" type="password" name="password" id="password">
        </p>
        <p>
            <label for="password_confirm"><?php _e('Confirm Password', 'kanban'); ?></label>
            <input value="" autocomplete="off" type="password" name="password_confirm" id="password_confirm">
        </p>
        <div class="button-wrap">
			<button class="edit-info-close cancel-btn"><?php echo esc_html_e('Close', 'kanban') ?> </button>
            <input class="confirm-btn" value="<?php echo esc_html_e('Update Profile', 'kanban') ?>" type="submit" name="update_profile" id="update_profile">
		</div>
    </form>
</div>
