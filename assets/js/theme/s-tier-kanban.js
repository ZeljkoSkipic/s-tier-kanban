document
  .getElementById("add-column-btn")
  .addEventListener("click", function () {
    var columnName = prompt("Enter column name:", "New Column");
    if (columnName != null && columnName.trim() !== "") {
      // Send AJAX request to server to create new column
      jQuery.ajax({
        url: myAjax.ajaxurl,
        type: "POST",
        data: {
          action: "stk_add_column", // Action hook name for WP to execute the server-side function
          columnName: columnName, // Data being sent, including the new column name
          projectId: jQuery("#kanban-board").data("project-id"), // The ID of the project, assumed to be stored in the data attribute of the Kanban board
          security: myAjax.security, // Security nonce for verification
        },
        success: function (response) {
          if (response.success) {
            // Create the column div
            const column = document.createElement("div");
            const cardContainer = document.createElement("div");
            cardContainer.classList.add("kanban-cards-container");
            column.classList.add("kanban-column");
            column.setAttribute("data-column-id", response.data.columnId);
            column.setAttribute("data-column-order", response.data.columnOrder);

            // Create the h3 element for the column title
            const columnTitle = document.createElement("h3");
            columnTitle.textContent = columnName;
            columnTitle.classList.add("column-title");

            // Create the delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete Column";
            deleteBtn.classList.add("delete-column-btn");

            // Add Card button
            const addButton = document.createElement("button");
            addButton.className = "add-card-btn";
            addButton.setAttribute("data-column-id", response.data.columnId);
            addButton.textContent = "Add a Card";

            // Append the title and delete button to the column
            column.appendChild(columnTitle);
            column.appendChild(deleteBtn);
            column.appendChild(cardContainer);
            column.appendChild(addButton);

            // Append the new column to the Kanban board
            const isChildAppnded = document
              .getElementById("kanban-board")
              .appendChild(column);

            if (isChildAppnded) {
              const event = new CustomEvent("columnAdded", {
                detail: { column: column },
              });
              document.dispatchEvent(event);
            }
          } else {
            alert("Error: " + response.data.message);
          }
        },
        error: function () {
          alert("There was an error adding the column. Please try again.");
        },
      });
    } else {
      alert("Please enter a valid column name.");
    }
  });

// Update Column Title

const updateColumnTitle = (e) => {
  if (!e.target.matches(".column-title")) {
    return;
  }

  if (e.type === "click") {
    e.target.setAttribute("contenteditable", "true");
    e.target.focus();
  }

  if (e.type === "focusout" || (e.type === "keydown" && e.keyCode === 13)) {
    e.preventDefault(); // Prevent newline on Enter key for title
    const column = e.target.closest(".kanban-column");
    const columnId = column.dataset.columnId;
    const newText = e.target.textContent;
    const data = {
      action: "stk_card_title_description",
      columnId: columnId,
      security: myAjax.security,
    };

    if (e.target.className === "card-title") {
      if (!newText) e.target.textContent = "Add Title";
      data.title = newText;
    }
    // AJAX call to save the updated title
    jQuery.ajax({
      url: myAjax.ajaxurl,
      type: "POST",
      data: data,
      success: function (response) {
        if (!response.success) {
          console.log("Error saving title.");
        } else {
          if (card === null) {
            let card = document.querySelector(`[data-card-id="${cardId}"]`);
            card.querySelector(".card-title").innerHTML = newText
              ? newText
              : "Add Title";
          }
        }
      },
    });

    if (e.type === "keydown") {
      e.target.blur(); // Remove focus when Enter is pressed
    }
  }

}

// Delete Column Button
document
  .getElementById("kanban-board")
  .addEventListener("click", async function (event) {
    let deleteBtn = event.target.closest(".delete-column-btn");
    if (deleteBtn) {
      let column = deleteBtn.closest(".kanban-column");
      let columnId = column.getAttribute("data-column-id"); // Get the column ID
      let columnDeleted = null;

      columnDeleted = await Swal.fire({
        title: "Are you sure?",
        text: "Are you sure that you want to delete this column?",
        icon: "warning",
        showDenyButton: true,
        confirmButtonText: "Delete",
        denyButtonText: "Cancel"
      });

      if (columnId && columnDeleted.isConfirmed) {
        // Send AJAX request to server to delete the column
        jQuery.ajax({
          url: myAjax.ajaxurl,
          type: "POST",
          data: {
            action: "stk_delete_column", // The AJAX action hook name
            columnId: columnId,
            security: myAjax.security, // Nonce for security, passed from PHP
          },
          success: function (response) {
            if (response.success) {
              column.remove(); // Remove the column from the DOM
            } else {
              alert("Error: Column could not be deleted.");
            }
          },
          error: function () {
            alert("There was an error deleting the column. Please try again.");
          },
        });
      }
    }
  });

// Adding Cards

document.addEventListener("click", function (event) {
  if (event.target.matches(".add-card-btn")) {
    const columnId = event.target
      .closest(".kanban-column")
      .getAttribute("data-column-id");
    var cardTitle = prompt("Enter card title:");
    var cardDescription = ""; // Static value for the card description

    if (cardTitle) {
      // Send AJAX request to create a new card
      jQuery.ajax({
        url: myAjax.ajaxurl,
        type: "POST",
        data: {
          action: "stk_add_card",
          columnId: columnId,
          title: cardTitle,
          description: cardDescription,
          security: myAjax.security,
        },
        success: function (response) {
          if (response.success && response.data && response.data.cardId) {
            // Append the new card to the column's card container
            const cardContainer = event.target
              .closest(".kanban-column")
              .querySelector(".kanban-cards-container");


            cardContainer.insertAdjacentHTML('beforeend', response.data.cardHTML);

            const cardAdded = new CustomEvent("cardAdded", {
              detail: { cardID: response.data.cardId },
            });

            document.dispatchEvent(cardAdded);
          } else {
            alert(
              "Error: " +
              (response.data && response.data.message
                ? response.data.message
                : "Unknown error")
            );
          }
        },
        error: function () {
          alert("There was an error adding the card. Please try again.");
        },
      });
    }
  }
});

// Delete Card
document.addEventListener("click", async function (event) {
  if (event.target.matches(".delete-card-btn")) {
    let card = event.target.closest(".kanban-card");
    let cardId = event.target.getAttribute("data-card-id");
    let cardDeleted = null;

    cardDeleted = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this card?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: "Cancel"
    });

    if (cardId && cardDeleted.isConfirmed) {
      // Send AJAX request to server to delete the card
      jQuery.ajax({
        url: myAjax.ajaxurl,
        type: "POST",
        data: {
          action: "stk_delete_card",
          cardId: cardId,
          security: myAjax.security, // Nonce for security
        },
        success: function (response) {
          if (response.success) {
            card.remove();
          } else {
            alert("Error: Card could not be deleted.");
          }
        },
        error: function () {
          alert("There was an error updating status and priority");
        },
      });
    }
  }
});

// Update card priority and card status

const updateStatusPriority = (e) => {



  if (
    !e.target.matches(".card-status") &&
    !e.target.matches(".card-priority")
  ) {
    return;
  }

  const card = e.target.closest(".kanban-card");
  const cardId = card.getAttribute("data-card-id");
  const status = card.querySelector(".card-status").value;
  const priority = card.querySelector(".card-priority").value;

  if (cardId) {
    jQuery.ajax({
      url: myAjax.ajaxurl,
      type: "POST",
      data: {
        action: "stk_status_priority",
        cardId: cardId,
        security: myAjax.security, // Nonce for security
        status: status,
        priority: priority,
      },
      success: function (response) { console.log(response);},
      error: function () {
        console.log("There was an error deleting the card. Please try again.");
      },
    });
  }
};

document.addEventListener("change", updateStatusPriority);

// Update card title

const updateCardTitle = (e) => {
  if (!e.target.matches(".card-title")) {
    return;
  }

  if (e.type === "click") {
    e.target.setAttribute("contenteditable", "true");
    e.target.focus();
  }

  if (e.type === "focusout" || (e.type === "keydown" && e.keyCode === 13)) {
    e.preventDefault(); // Prevent newline on Enter key for title
    const card = e.target.closest(".kanban-card");
    const cardId = card ? card.dataset.cardId : e.target.dataset.cardId;
    const newText = e.target.textContent;
    const data = {
      action: "stk_card_title_description",
      cardId: cardId,
      security: myAjax.security,
    };

    if (e.target.className === "card-title") {
      if (!newText) e.target.textContent = "Add Title";
      data.title = newText;
    }
    // AJAX call to save the updated title
    jQuery.ajax({
      url: myAjax.ajaxurl,
      type: "POST",
      data: data,
      success: function (response) {
        if (!response.success) {
          console.log("Error saving title.");
        } else {
          if (card === null) {
            let card = document.querySelector(`[data-card-id="${cardId}"]`);
            card.querySelector(".card-title").innerHTML = newText
              ? newText
              : "Add Title";
          }
        }
      },
    });

    if (e.type === "keydown") {
      e.target.blur(); // Remove focus when Enter is pressed
    }
  }
};

document.addEventListener("click", updateCardTitle);
document.addEventListener("focusout", updateCardTitle);
document.addEventListener("keydown", updateCardTitle);


// Miscellaneous

jQuery(document).ready(function ($) {
	$( ".side_expander" ).on( "click", function() {
		$( ".side_hidden, .user_info" ).toggleClass( "side-open" );
		$( this ).toggleClass( "open" );
	});
	$( ".top_expander" ).on( "click", function() {
		$( ".board-header .bottom" ).slideToggle();
		$( this ).toggleClass( "open" );
	});
});
