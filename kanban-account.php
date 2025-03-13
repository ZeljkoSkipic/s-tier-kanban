<?php
/*
Template Name: Kanban Account Page
Template Post Type: page
*/
if (!is_user_logged_in() || !(current_user_can('kanban-user') || current_user_can('administrator'))) {
    wp_redirect(home_url());
    exit;
}

get_header();

$current_user_id = get_current_user_id();
$boards = get_user_projects($current_user_id);

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['kanban_account_nonce']) && wp_verify_nonce($_POST['kanban_account_nonce'], 'update_kanban_account')) {
    $first_name = sanitize_text_field($_POST['first_name']);
    $last_name = sanitize_text_field($_POST['last_name']);
    $password = $_POST['password'];

    wp_update_user(array(
        'ID' => $current_user_id,
        'first_name' => $first_name,
        'last_name' => $last_name,
    ));

    if (!empty($password)) {
        wp_set_password($password, $current_user_id);
    }

    echo '<div class="notice notice-success"><p>' . __('Profile updated successfully.', 'kanban') . '</p></div>';
}
?>

<div class="kanban-account-page">
    <div class="kanban_container">

        <div class="kanban_user_info">
            <h1><?php _e('Profile Information', 'kanban'); ?></h1>
			<div class="user_info_inner">
				<div class="user_info_left">
					<div class="user_profile_image">
						<?php echo get_avatar($current_user_id, 128); // Get user avatar with size 128 ?>
					</div>
				</div>
				<div class="user_info_right">
					<p><span><?php _e('First Name', 'kanban'); ?>:</span> <?php echo esc_html(get_the_author_meta('first_name', $current_user_id)); ?></p>
					<p><span><?php _e('Last Name', 'kanban'); ?>:</span> <?php echo esc_html(get_the_author_meta('last_name', $current_user_id)); ?></p>
				</div>
			</div>
			<div class="user_info_bottom">
				<a href="#" class="edit-info" id="edit-info">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#17B26A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg><?php _e('Edit Information', 'kanban'); ?></a>
				<a href="<?php echo wp_logout_url(); ?>" class="logout-link"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f04438" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg><?php _e('Log Out', 'kanban'); ?></a>
			</div>

        </div>

        <div class="kanban_boards_wrap">
            <h2><?php _e('My Kanban Boards', 'kanban'); ?></h2>
            <?php if (!empty($boards)) : ?>
                <div class="kanban-boards">
                    <?php foreach ($boards as $board) : ?>
                        <?php
                            $project_class = get_post_meta($board->ID, '_project_class', true);
                        ?>

                        <div class="kanban-board <?php echo esc_html($project_class); ?>">
                            <a href="<?php echo get_permalink($board->ID); ?>"></a>
                            <h3><?php echo esc_html($board->post_title); ?></h3>
                            <div class="allowed_users">
                                <?php
                                    $allowed_users = get_post_meta($board->ID, '_allowed_kanban_users', true) ?: array();
                                    foreach ($allowed_users as $user_id) {
                                        $user_info = get_userdata($user_id);
                                        if ($user_info) {
                                            $user_avatar = get_avatar($user_id, 32); // Get user avatar with size 32
                                            $first_name = get_user_meta($user_id, 'first_name', true);
                                            $last_name = get_user_meta($user_id, 'last_name', true);
                                            $display_name = trim($first_name . ' ' . $last_name);
                                            if (empty($display_name)) {
                                                $display_name = $user_info->user_login;
                                            }
                                            echo '<span title="' . esc_attr($display_name) . '">' . $user_avatar . '</span> ';
                                        }
                                    }
                                ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php else : ?>
                <p><?php _e('You are not a part of any boards.', 'kanban'); ?></p>
            <?php endif; ?>
        </div>
    </div>
</div>

<script>
document.getElementById('edit-info').addEventListener('click', function(e) {
    e.preventDefault();
    Swal.fire({
        title: '<?php _e('Edit Profile Information', 'kanban'); ?>',
        html: `
            <form id="edit-info-form" method="post">
                <?php wp_nonce_field('update_kanban_account', 'kanban_account_nonce'); ?>
                <p>
                    <label for="first_name"><?php _e('First Name', 'kanban'); ?></label>
                    <input type="text" name="first_name" id="first_name" value="<?php echo esc_attr(get_the_author_meta('first_name', $current_user_id)); ?>">
                </p>
                <p>
                    <label for="last_name"><?php _e('Last Name', 'kanban'); ?></label>
                    <input type="text" name="last_name" id="last_name" value="<?php echo esc_attr(get_the_author_meta('last_name', $current_user_id)); ?>">
                </p>
                <p>
                    <label for="password"><?php _e('New Password', 'kanban'); ?></label>
                    <input type="password" name="password" id="password">
                </p>
            </form>
        `,
        showCancelButton: true,
        confirmButtonText: '<?php _e('Update Profile', 'kanban'); ?>',
        preConfirm: () => {
            document.getElementById('edit-info-form').submit();
        }
    });
});
</script>

<?php
get_footer();
