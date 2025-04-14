<?php
if (!$user) return;
?>

<div data-id="<?php echo $user->ID; ?>" class="assign-user <?php if (isset($card_id) && in_array($user->ID, $card_users)) echo 'selected'; ?>">
    <div title="<?php echo $user->display_name; ?>" class="assign-user-avatar">
        <?php echo get_avatar($user, 50); ?>
    </div>

    <?php if (isset($show_name) && $show_name === true): ?>
        <p class="assign-user-name">
            <?php
            $is_current_user = $user->ID === get_current_user_id();
            $is_selected = isset($card_id) && in_array($user->ID, $card_users);

            if ($is_current_user && $is_selected) {
                esc_html_e('Remove myself', 'kanban');
            } elseif ($is_current_user) {
                esc_html_e('Assign to myself', 'kanban');
            } else {
                echo esc_html($user->display_name);
            }
            ?>
        </p>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#17b26a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
		<?php endif; ?>
</div>
