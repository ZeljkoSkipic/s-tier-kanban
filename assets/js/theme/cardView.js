const cardView = (e) => {

    // Open Modal

    if (e.target.closest(".kanban-card") && !e.target.closest('.dynamic-select') && !e.target.closest(".card-priority") && !e.target.closest(".card-status") && !e.target.closest(".delete-card-btn") && !e.target.closest(".card-title") && !e.target.closest("a")) {
			const card = e.target.closest(".kanban-card")
      const cardID = card.dataset.cardId;
			const isAdmin = card.dataset.userAdmin;
			const isUserCreation = card.dataset.userCreation;

      const commentsSaveButton = document.querySelector(".kanban-comment-save");
      const descriptionSaveButton = document.querySelector(".kanban-description-save");
      const commentForm = document.querySelector(".kanban-card-view");
      const cardTitle = e.target
        .closest(".kanban-card")
        .querySelector(".card-title").innerHTML;
      const cardViewTitle = document.querySelector(".kanban-card-view").querySelector('.card-title');
      commentsSaveButton.dataset.cardId = cardID;
      descriptionSaveButton.dataset.cardId = cardID;
			descriptionSaveButton.dataset.userAdmin = isAdmin;
			descriptionSaveButton.dataset.userCreation = isUserCreation;

      cardViewTitle.innerHTML = cardTitle;
      cardViewTitle.dataset.cardId = cardID;
      commentForm.classList.remove("hide");
      commentForm.classList.add("show");
      document.querySelector("body").style.overflow = "hidden";

      const modalOpened = new CustomEvent("cardViewOpened", {
        detail: { cardID: cardID },
      });

      document.dispatchEvent(modalOpened);
    }

    // Close modal

    if (
      e.target.matches(".kanban-card-view-close") ||
      e.target.matches(".kanban-card-view")
    ) {
      const commentForm = document.querySelector(".kanban-card-view");
      const commnetsWrapper = document.querySelector(".kanban-comments");
      commentForm.classList.remove("show");
      commentForm.classList.add("hide");
      document.querySelector("body").style.overflow = "visible";
      const error = document.querySelector(".comment-error");
      if (error) {
        error.remove();
      }

      commnetsWrapper.innerHTML = "";
      const modalClosed = new CustomEvent("cardViewClosed");
      document.dispatchEvent(modalClosed);
    }
  };

  document.addEventListener("click", cardView);