<div class="status-wrap">
    <?php if (isset($show_title) && $show_title): ?>
        <h4 class="card-sidebar-subtitle">Status</h4>
    <?php endif; ?>
    <?php
    $current = strtolower($status);
    $options = [
        'status' => [
            'label'     => "Status",
            'icon'      => ""
        ],
        'to-do' => [
            'label'     => "To Do",
            'icon'      => file_get_contents(PLUGIN_ROOT_PATH . 'assets/icons/to-do.svg')
        ],
        'ongoing' => [
            'label'     => "Ongoing",
            'icon'      => file_get_contents(PLUGIN_ROOT_PATH . 'assets/icons/ongoing.svg')
        ],
        'stuck' => [
            'label'     => "Stuck",
            'icon'      => file_get_contents(PLUGIN_ROOT_PATH . 'assets/icons/stuck.svg')
        ],
        'done' => [
            'label'     => "Done",
            'icon'      => file_get_contents(PLUGIN_ROOT_PATH . 'assets/icons/done.svg')
        ],
    ];
    include PLUGIN_ROOT_PATH . '/template-parts/dynamic-select.php';
    ?>


    <select class="card-status">
        <option value="">Status</option>
        <option <?php if ($status === 'to-do') echo "selected=selected"; ?> value="to-do">To Do</option>
        <option <?php if ($status === 'ongoing') echo "selected=selected"; ?> value="ongoing">Ongoing</option>
        <option <?php if ($status === 'stuck') echo "selected=selected"; ?> value="stuck">Stuck</option>
        <option <?php if ($status === 'done') echo "selected=selected"; ?> value="done">Done</option>
    </select>
</div>