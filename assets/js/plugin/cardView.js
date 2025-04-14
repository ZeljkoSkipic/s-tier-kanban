const copyButton = document.querySelector(".sidebar-btn-copy");
const cardView = (e) => {
  // Open Modal

  if (
    e.target.closest(".kanban-card") &&
    !e.target.closest(".dynamic-select") &&
    !e.target.closest(".card-priority") &&
    !e.target.closest(".card-status") &&
    !e.target.closest(".delete-card-btn") &&
    !e.target.closest(".card-title") &&
    !e.target.closest("a") &&
    !e.target.closest(".user-assign") &&
    !e.target.closest(".assign-users")
  ) {
    const card = e.target.closest(".kanban-card");
    const cardID = card.dataset.cardId;

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
    const modalClosed = new CustomEvent("cardViewClosed");
    document.dispatchEvent(modalClosed);
  }
};

document.addEventListener("click", cardView);

const cardViewOpen = (e) => {
  const card = document.querySelector(
    `.kanban-card[data-card-Id="${e.detail.cardID}"]`
  );
  const cardID = e.detail.cardID;
  const isAdmin = card.dataset.userAdmin;
  const isUserCreation = card.dataset.userCreation;

  const commentsSaveButton = document.querySelector(".kanban-comment-save");
  const descriptionSaveButton = document.querySelector(
    ".kanban-description-save"
  );
  const cardViewWrapper = document.querySelector(".kanban-card-view");
  const cardTitle = card.querySelector(".card-title").innerHTML;
  const cardViewTitle = document
    .querySelector(".kanban-card-view")
    .querySelector(".card-title");
  cardViewWrapper.dataset.cardId = cardID;
  commentsSaveButton.dataset.cardId = cardID;
  descriptionSaveButton.dataset.cardId = cardID;
  descriptionSaveButton.dataset.userAdmin = isAdmin;
  descriptionSaveButton.dataset.userCreation = isUserCreation;

  cardViewTitle.innerHTML = cardTitle;
  cardViewTitle.dataset.cardId = cardID;

  // Dynamic select

  const priority = card.querySelector(".card-priority").selectedIndex;
  const status = card.querySelector(".card-status").selectedIndex;
  const priorityView = cardViewWrapper.querySelector(".card-priority");
  const statusView = cardViewWrapper.querySelector(".card-status");
  const currentOptionPriority = card
    .querySelector(".priority-wrap .dynamic-select-current-item")
    .cloneNode(true);
  const currentOptionStatus = card
    .querySelector(".status-wrap .dynamic-select-current-item")
    .cloneNode(true);
  const dynamicSelectCurrentOptionWrapperPriority =
    cardViewWrapper.querySelector(".priority-wrap .dynamic-select-current");
  const dynamicSelectCurrentOptionWrapperStatus = cardViewWrapper.querySelector(
    ".status-wrap .dynamic-select-current"
  );

  priorityView.selectedIndex = priority;
  statusView.selectedIndex = status;
  dynamicSelectCurrentOptionWrapperPriority.replaceChildren(
    currentOptionPriority
  );
  dynamicSelectCurrentOptionWrapperStatus.replaceChildren(currentOptionStatus);

  cardViewWrapper.classList.remove("hide");
  cardViewWrapper.classList.add("show");
  document.querySelector("body").style.overflow = "hidden";
};

const cardViewClose = () => {
  const commentForm = document.querySelector(".kanban-card-view");
  const commnetsWrapper = document.querySelector(".kanban-comments");
  commentForm.classList.remove("show");
  commentForm.classList.add("hide");
  document.querySelector("body").style.overflow = "visible";
  const error = document.querySelector(".comment-error");
  if (error) {
    error.remove();
  }

  const url = new URL(window.location);
  url.searchParams.delete("cardIDView");
  window.history.replaceState({}, "", url);

  commnetsWrapper.innerHTML = "";
};

const openCardViewUrl = (e) => {
  const url = new URLSearchParams(window.location.search);

  const toOpenCardView = url.get("cardIDView");
  if (toOpenCardView) {
    const modalOpened = new CustomEvent("cardViewOpened", {
      detail: { cardID: toOpenCardView },
    });

    setTimeout(() => {
      document.dispatchEvent(modalOpened);
    }, 200);
  }
};

const copyCardLink = (e) => {
  e.preventDefault();
  const cardViewWrapper = e.currentTarget.closest(".kanban-card-view");
  const cardid = cardViewWrapper.dataset.cardId;

  const urlObj = new URL(window.location.href);
  urlObj.searchParams.set("cardIDView", cardid);
  const url = urlObj.toString();

  if (navigator.clipboard && window.isSecureContext) {
    navigator?.clipboard
      ?.writeText(url)
      .then(showCopyMessage)
      .catch((err) => {
        console.error("Error Copy Url: ", err);
        fallbackCopyTextToClipboard(url);
      });
  } else {
    fallbackCopyTextToClipboard(url);
  }
};

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  textArea.style.position = "fixed";
  textArea.style.top = "-9999px";
  document.body.appendChild(textArea);

  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    if (successful) {
      showCopyMessage();
    } else {
      console.error("Error Copy Url!");
    }
  } catch (err) {
    console.error("Error Copy Url: ", err);
  }

  document.body.removeChild(textArea);
}

function showCopyMessage() {
  const message = document.getElementById("copyMessage");
  if (message) {
    message.style.display = "block";
    setTimeout(() => {
      message.style.display = "none";
    }, 3000);
  }
}

document.addEventListener("cardViewOpened", cardViewOpen);
document.addEventListener("cardViewClosed", cardViewClose);
document.addEventListener("DOMContentLoaded", openCardViewUrl);
copyButton?.addEventListener("click", copyCardLink);
