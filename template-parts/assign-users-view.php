<?php if(!KanbanUpdate::isLicenceValid()) return; ?>

<div class="assign-users hide">
	<span class="assign-users-close">
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F90B31" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>
    <p class="assign-users-title"><?php esc_html_e('Project users:', 'kanban'); ?></p>
    <input class="assign-users-search" type="text" placeholder="<?php esc_html_e('Search users...', 'kanabn'); ?>" />
    <div class="assign-users-select">

    </div>
</div>
