<?php

$users = getCommentsUsers(get_the_ID());
?>

<div class="kanban-card" data-card-id="<?php echo esc_attr(get_the_ID()); ?>">

    <h4 contenteditable="false" class="card-title"><?php echo $title ? $title : __('Add Title', 'kanban'); ?></h4>
    <div data-description='<?php echo $description ? $description : '{}'; ?>' id="card-description-<?php echo get_the_ID(); ?>" class="card-description" contenteditable="false"></div>

    <?php
    $current = strtolower($priority);
    $options = [
        'priority' => [
            'label'     => __('Priority', 'kanban'),
            'icon'      => ""
        ],
        'low' => [
            'label'     => __('Low', 'kanban'),
            'icon'      => file_get_contents(PLUGIN_ROOT_PATH . 'assets/icons/flag-grey.svg')
        ],
        'medium' => [
            'label'     =>  __('Medium', 'kanban'),
            'icon'      => file_get_contents(PLUGIN_ROOT_PATH . 'assets/icons/flag-blue.svg')
        ],
        'high' => [
            'label'     =>  __('High', 'kanban'),
            'icon'      => file_get_contents(PLUGIN_ROOT_PATH . 'assets/icons/flag-orange.svg')
        ],
        'urgent' => [
            'label'     =>  __('Urgent', 'kanban'),
            'icon'      => file_get_contents(PLUGIN_ROOT_PATH . 'assets/icons/flag-red.svg')
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
    <button class="delete-card-btn" data-card-id="<?php echo esc_attr(get_the_ID()); ?>">Delete Card</button>
    <div class="card-bottom">
        <div class="card-svgs">
            <?php if ($description) { ?>
                <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.25 10.875V8.6875C13.25 7.94158 12.9537 7.22621 12.4262 6.69876C11.8988 6.17132 11.1834 5.875 10.4375 5.875H9.1875C8.93886 5.875 8.7004 5.77623 8.52459 5.60041C8.34877 5.4246 8.25 5.18614 8.25 4.9375V3.6875C8.25 2.94158 7.95368 2.22621 7.42624 1.69876C6.89879 1.17132 6.18342 0.875 5.4375 0.875H3.875M3.875 11.5H10.125M3.875 14H7M5.75 0.875H1.6875C1.17 0.875 0.75 1.295 0.75 1.8125V16.1875C0.75 16.705 1.17 17.125 1.6875 17.125H12.3125C12.83 17.125 13.25 16.705 13.25 16.1875V8.375C13.25 6.38588 12.4598 4.47822 11.0533 3.0717C9.64678 1.66518 7.73912 0.875 5.75 0.875Z" stroke="#808890" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            <?php } ?>
        </div>
        <div class="card-members">
            <?php
            if ($users):
                foreach ($users as $user):
            ?>
                    <div data-user="<?php echo $user->ID; ?>" class="user-avatar">
                        <?php echo get_avatar($user); ?>
                    </div>

            <?php
                endforeach;
            endif;

            ?>

        </div>
    </div>
</div>
