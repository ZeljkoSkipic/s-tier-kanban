<div class="dynamic-select">
    <div class="dynamic-select-current">
        <div class="dynamic-select-current-item">
            <?php
            if ($current) :
                echo $options[$current]['icon'];
            ?>
                <span class="dynamic-select-label"><?php echo $options[$current]['label']; ?></span>

            <?php

            else :
            ?>
                <span class="dynamic-select-label dynamic-select-label--default"><?php echo array_values($options)[0]['label'];  ?></span>

            <?php endif; ?>
        </div>
    </div>
    <div style="display: none;" class="dynamic-select-dropdown">

        <?php
        foreach ($options as $key => $option) :
        ?>
            <div data-option="<?php echo $key !== 'priority' && $key !== 'status'  ? $key : ""; ?>" class="dynamic-select-item">
                <?php echo $option['icon']; ?>

                <?php if($option['label']): ?>

                <span class="dynamic-select-label"><?php echo $option['label']; ?></span>

                <?php endif; ?>

            </div>
        <?php
        endforeach;
        ?>

    </div>
</div>
