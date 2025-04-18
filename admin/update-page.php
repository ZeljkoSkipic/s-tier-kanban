<?php
$licence = get_option('kanban_licence_key');
?>

<div class="kanban-updates">
    <div class="wrap">
        <h1><?php esc_html_e('License', 'kanban'); ?></h1>
        <div class="kanban-updates-box">
            <h3> <?php esc_html_e('License Information', 'kanban'); ?></h3>
            <form action="" method="POST">
                <?php wp_nonce_field('kanban-licence-key', 'kanban-licence-security'); ?>
                <div class="kanban-updates-box-input">
                    <label for="licence"><b><?php esc_html_e('License Key', 'kanban'); ?></b></label> <br>
                    <div class="licence_wrap">
					<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.9167 6.24996L15.8333 3.33329M17.5 1.66663L15.8333 3.33329L17.5 1.66663ZM9.49165 9.67496C9.92194 10.0995 10.264 10.605 10.4981 11.1623C10.7322 11.7196 10.8538 12.3177 10.8558 12.9222C10.8579 13.5266 10.7403 14.1255 10.5099 14.6844C10.2795 15.2432 9.94087 15.751 9.51344 16.1784C9.08601 16.6058 8.57825 16.9445 8.0194 17.1749C7.46055 17.4053 6.86165 17.5228 6.25718 17.5208C5.65271 17.5188 5.0546 17.3972 4.49731 17.1631C3.94002 16.929 3.43454 16.5869 3.00998 16.1566C2.17509 15.2922 1.71312 14.1344 1.72356 12.9327C1.734 11.731 2.21603 10.5814 3.06582 9.73162C3.9156 8.88184 5.06516 8.39981 6.2669 8.38937C7.46863 8.37893 8.62639 8.8409 9.49082 9.67579L9.49165 9.67496ZM9.49165 9.67496L12.9167 6.24996L9.49165 9.67496ZM12.9167 6.24996L15.4167 8.74996L18.3333 5.83329L15.8333 3.33329L12.9167 6.24996Z" stroke="#3C3C3C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
					<input value="<?php if ($licence) echo str_repeat('*', strlen(base64_decode($licence))); ?>" <?php if ($licence) echo 'readonly=readonly;' ?> required type="text" name="kanban-pro-licence" id="licence">
					</div>
                </div>
                <div class="kanban-updates-box-input">
                    <input type="submit" value="<?php $licence ? esc_html_e('Deactivate', 'kanban') : esc_html_e('Activate', 'kanban'); ?>" name="<?php echo $licence ? 'deactivate' : 'activate'; ?>" id="activate-button">
                </div>
            </form>
        </div>
    </div>
</div>
