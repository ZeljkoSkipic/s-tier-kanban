document
  .getElementById("add-column-btn")
  ?.addEventListener("click", function () {
    Swal.fire({
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
			inputPlaceholder: "Column Title",
      showCancelButton: true,
      confirmButtonText: "Create Column",
      showLoaderOnConfirm: true,
      customClass: {
        confirmButton: "confirm-btn",
        cancelButton: "cancel-btn",
				container: "add-column-card",
      },
      inputValidator: (value) => {
        if (!value) {
          return "Column name is required!";
        }
      },
      preConfirm: async (columnName) => {
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
              // Append the new column to the Kanban board
              const kanbanBoard = document.getElementById("kanban-board");
              kanbanBoard.insertAdjacentHTML(
                "beforeend",
                response.data.columnHtml
              );

              if (kanbanBoard.children.length > 0) {
                const event = new CustomEvent("columnAdded", {
                  detail: { columnID: response.data.columnID },
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
      },
    });
  });

// Update Column Title

const updateColumnTitle = (e) => {
  if (!e.target.matches(".column-title")) {
    return;
  }

  const column = e.target.closest(".kanban-column");
  const isAdmin = column.dataset.userAdmin;

  if (e.type === "click" && isAdmin) {
    e.target.setAttribute("contenteditable", "true");
    e.target.focus();
  }

  if (e.type === "focusout" || (e.type === "keydown" && e.keyCode === 13)) {
    e.preventDefault(); // Prevent newline on Enter key for title

    const columnId = column.dataset.columnId;
    const columnTitle = e.target.textContent;
    const data = {
      action: "stk_update_column_title",
      columnId: columnId,
      security: myAjax.security,
      columnTitle: columnTitle,
    };

    // AJAX call to save the updated title
    jQuery.ajax({
      url: myAjax.ajaxurl,
      type: "POST",
      data: data,
      success: function (response) {
        if (!response.success) {
          console.log("Error saving title.");
        }
      },
    });

    if (e.type === "keydown") {
      e.target.blur(); // Remove focus when Enter is pressed
    }
  }
};

document.addEventListener("click", updateColumnTitle);
document.addEventListener("focusout", updateColumnTitle);
document.addEventListener("keydown", updateColumnTitle);

// Delete Column Button
document
  ?.getElementById("kanban-board")
  ?.addEventListener("click", async function (event) {
    let deleteBtn = event.target.closest(".delete-column-btn");
    if (deleteBtn) {
      let column = deleteBtn.closest(".kanban-column");
      let columnId = column.getAttribute("data-column-id"); // Get the column ID
      let columnDeleted = null;

      columnDeleted = await Swal.fire({
        title: "Delete Column?",
        text: "Are you sure that you want to delete this column?",
        icon: "warning",
        showDenyButton: true,
        confirmButtonText: "Delete",
        denyButtonText: "Cancel",
        customClass: {
          confirmButton: "del-btn",
          denyButton: "cancel-btn"
        }
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
    Swal.fire({
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Create Card",
      showLoaderOnConfirm: true,
			inputPlaceholder: "Card Title",
      customClass: {
        confirmButton: "confirm-btn",
        cancelButton: "cancel-btn",
				container: "add-column-card",
      },
      inputValidator: (value) => {
        if (!value) {
          return "Card name is required!";
        }
      },
      preConfirm: async (cardName) => {
        const columnId = event.target
          .closest(".kanban-column")
          .getAttribute("data-column-id");

        // Send AJAX request to create a new card
        jQuery.ajax({
          url: myAjax.ajaxurl,
          type: "POST",
          data: {
            action: "stk_add_card",
            columnId: columnId,
            title: cardName,
            security: myAjax.security,
          },
          success: function (response) {
            if (response.success && response.data && response.data.cardId) {
              // Append the new card to the column's card container
              const cardContainer = event.target
                .closest(".kanban-column")
                .querySelector(".kanban-cards-container");

              cardContainer.insertAdjacentHTML(
                "beforeend",
                response.data.cardHTML
              );

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
      },
    });
  }
});

// Delete Card
document.addEventListener("click", async function (event) {
  if (event.target.matches(".delete-card-btn") || event.target.matches(".sidebar-btn-delete") ) {
    let card = event.target.closest(".kanban-card") || event.target.closest(".kanban-card-view");
    let cardId = event.target.getAttribute("data-card-id") || card.getAttribute("data-card-id");
    let cardDeleted = null;

    cardDeleted = await Swal.fire({
      title: "Delete Card?",
      text: "Are you sure that you want to delete this card?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: "Cancel",
      customClass: {
        confirmButton: "del-btn",
        denyButton: "cancel-btn"
      }
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

            if(card.classList.contains('.kanban-card')) {
                card.remove();
            }

            else {
              const cardSmallview = document.querySelector(
                `.kanban-card[data-card-Id="${cardId}"]`
              );
              cardSmallview.remove();
              const modalClosed = new CustomEvent("cardViewClosed");
              document.dispatchEvent(modalClosed);
            }

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

  const card = e.target.closest(".kanban-card") || e.target.closest(".kanban-card-view");
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
      success: function (response) {
        console.log(response);
      },
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

  const card =
    e.target.closest(".kanban-card") ??
    document.querySelector(`[data-card-id="${e.target.dataset.cardId}"]`);

  const isAdmin = card.dataset.userAdmin;
  const isUserCreation = card.dataset.userCreation;

  if (e.type === "click" && (isAdmin || isUserCreation)) {
    e.target.setAttribute("contenteditable", "true");
    e.target.focus();
  }

  if (e.type === "focusout" || (e.type === "keydown" && e.keyCode === 13)) {
    e.preventDefault(); // Prevent newline on Enter key for title
    const cardId = card ? card.dataset.cardId : e.target.dataset.cardId;
    const newText = e.target.textContent;
    const data = {
      action: "stk_card_title",
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
          let card = document.querySelector(`[data-card-id="${cardId}"]`);
          card.querySelector(".card-title").innerHTML = newText
            ? newText
            : "Add Title";
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
  $(".side_expander").on("click", function () {
    $(".side_hidden").slideToggle();
    $(".user_info").toggleClass("side-open");
    $(this).toggleClass("open");
  });
  $(".top_expander_wrap").on("click", function () {
    $(".board-header .bottom").fadeToggle();
    $(".top_expander_wrap").toggleClass("open");
  });
});

// Fullscreen Button
document.addEventListener('DOMContentLoaded', function () {
	const fullscreenBtn = document.getElementById('fullscreen-btn');
	const body = document.body;

	// Request fullscreen and add 'fs-active' class
	fullscreenBtn?.addEventListener('click', function () {
			if (!document.fullscreenElement) {
					document.documentElement.requestFullscreen({ navigationUI: "hide" }).then(() => {
							body.classList.add('fs-active');
					}).catch(err => {
							console.error(`Error attempting to enable full-screen mode: ${err.message}`);
					});
			} else {
					document.exitFullscreen().then(() => {
							body.classList.remove('fs-active');
					}).catch(err => {
							console.error(`Error attempting to exit full-screen mode: ${err.message}`);
					});
			}
	});
});
