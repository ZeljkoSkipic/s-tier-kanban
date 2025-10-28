<div class="priority-wrap">
    <?php if (isset($show_title) && $show_title): ?>
        <h4 class="card-dd-title">Priority</h4>
    <?php endif; ?>

    <?php
    $current = strtolower($priority);
    $options = [
        'priority' => [
            'label'     => __('Priority', 'kanban'),
            'icon'      => ""
        ],
        'low' => [
            'label'     => __('Low', 'kanban'),
            'icon'      => file_get_contents(PLUGIN_ROOT_PATH . 'assets/icons/modern/flag-low.svg')
        ],
        'medium' => [
            'label'     =>  __('Medium', 'kanban'),
            'icon'      => file_get_contents(PLUGIN_ROOT_PATH . 'assets/icons/modern/flag-medium.svg')
        ],
        'high' => [
            'label'     =>  __('High', 'kanban'),
            'icon'      => file_get_contents(PLUGIN_ROOT_PATH . 'assets/icons/modern/flag-high.svg')
        ],
        'urgent' => [
            'label'     =>  __('Urgent', 'kanban'),
            'icon'      => file_get_contents(PLUGIN_ROOT_PATH . 'assets/icons/modern/flag-urgent.svg')
        ]

    ];
    include PLUGIN_ROOT_PATH . '/template-parts/dynamic-select.php';
    ?>
    <select class="card-priority">
        <option value=""><?php esc_html_e('Priority', 'kanban'); ?></option>
        <option <?php if ($priority === 'low') echo "selected=selected"; ?> value="low">Low</option>
        <option <?php if ($priority === 'medium') echo "selected=selected"; ?> value="medium">Medium</option>
        <option <?php if ($priority === 'high') echo "selected=selected"; ?> value="high">High</option>
        <option <?php if ($priority === 'urgent') echo "selected=selected"; ?> value="urgent">Urgent</option>
    </select>
</div>
