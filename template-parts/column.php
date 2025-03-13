<?php
$column_id = get_the_ID();
$column_title = get_the_title();
$column_order = get_post_meta($column_id, 'column_order', true); ?>

<div class="kanban-column" data-user-admin="<?php echo is_user_kanban_admin(); ?>"  data-column-id="<?php echo esc_attr(get_the_ID()); ?>">
	<h3 class="column-title"><?php echo $column_title; ?></h3>

	<?php if (is_user_kanban_admin()): ?>

		<button class="delete-column-btn">Delete Column</button>

	<?php endif; ?>

	<div class="kanban-column-inner">
		<div class="kanban-cards-container">
			<?php
			// Query to get all cards associated with the current column
			$cards_query = new WP_Query(array(
				'post_type' => 'kanban_card',
				'posts_per_page' => -1,
				'meta_key'      => 'card_order',
				'orderby' => 'meta_value_num', // If card order is numeric
				'order' => 'ASC',
				'meta_query' => array(
					array(
						'key' => 'associated_column_id',
						'value' => $column_id,
						'compare' => '=',
					),
				),
			));

			if ($cards_query->have_posts()) :
				while ($cards_query->have_posts()) :
					$cards_query->the_post();
					$status = get_post_meta(get_the_ID(), 'status', true);
					$priority = get_post_meta(get_the_ID(), 'priority', true);
					$title = get_the_title();
					$description = htmlspecialchars_decode(get_the_content());
					include PLUGIN_ROOT_PATH . 'template-parts/card.php';
				endwhile;
			endif;
			wp_reset_postdata();
			?>
		</div> <!-- Container for cards -->

		<div class="add-card-wrap">
			<button class="add-card-btn">New Card</button>
		</div>
	</div>
	<!-- Display other column details as needed -->
</div>