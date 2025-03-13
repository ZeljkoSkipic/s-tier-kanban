const sortCards = (evt) => {
  const cardId = evt.item.getAttribute("data-card-id");
  const newColumnId = evt.to
    .closest(".kanban-column")
    .getAttribute("data-column-id");
  const cardOrder = Array.from(evt.to.children).map(function (card) {
    return card.getAttribute("data-card-id");
  });

  jQuery.ajax({
    url: myAjax.ajaxurl,
    type: "POST",
    data: {
      action: "stk_move_card",
      cardId: cardId,
      newColumnId: newColumnId,
      newOrder: cardOrder,
      security: myAjax.security,
    },
    success: function (response) {
      if (!response.success) {
        console.error("Failed to move card:", response);
      }
    },
    error: function (xhr, status, error) {
      console.error("Error moving card:", status, error);
    },
  });
};

const sortColumns = (evt) => {
  const columnID = evt.item.getAttribute("data-column-id");

  const columnOrder = Array.from(evt.to.children).map(function (column) {
    return column.getAttribute("data-column-id");
  });

  jQuery.ajax({
    url: myAjax.ajaxurl,
    type: "POST",
    data: {
      action: "stk_move_column",
      columnID: columnID,
      newOrder: columnOrder,
      security: myAjax.security,
    },
    success: function (response) {
      if (!response.success) {
        console.error("Failed to move column:", response);
      }
    },
    error: function (xhr, status, error) {
      console.error("Error moving column:", status, error);
    },
  });
};

document.addEventListener(
  "columnAdded",
  (e) => {
    const column = document.querySelector(
      `[data-column-id="${e.detail.columnID}"]`
    );
    const container = column.querySelector(".kanban-cards-container");

    Sortable.create(container, {
      group: "cards",
      animation: 150,
      draggable: ".kanban-card", // Specify draggable items
      onAdd: (evt) => sortCards(evt),
      onUpdate: (evt) => sortCards(evt),
    });
  },
  false
);

// Sort Columns

Sortable.create(document.querySelector("#kanban-board"), {
  group: "column",
  animation: 150,
  draggable: ".kanban-column",
  onAdd: (evt) => sortColumns(evt),
  onUpdate: (evt) => sortColumns(evt),
});

// Sort Cards

document.querySelectorAll(".kanban-cards-container").forEach(function (el) {
  Sortable.create(el, {
    group: "cards",
    animation: 150,
    draggable: ".kanban-card", // Specify draggable items
    onAdd: (evt) => sortCards(evt),
    onUpdate: (evt) => sortCards(evt),
  });
});
