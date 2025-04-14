const assignUsersTrigger = document
  .querySelector("body")
  .querySelectorAll(".user-assign");
const search = document.querySelectorAll(".assign-users-search");
const triggerIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>`;

const assignUsersViewAction = async (e) => {
  const assignButton = e.target.closest(".user-assign");
  if (assignButton) {
    const assignUsersView =
      assignButton.parentElement.querySelector(".assign-users");

    assignUsersCloseGlobal();

    assignUsersView.classList.remove("hide");
    assignUsersView.classList.add("show");
    const projectID = assignButton.dataset.projectid;
    const cardID = assignButton.dataset.cardid;
    const response = await getUsers(projectID, cardID);

    if (response && response.success === true) {
      assignUsersView.querySelector(".assign-users-select").innerHTML =
        response?.data?.users;
      const users = assignUsersView.querySelectorAll(".assign-user");

      if (users) {
        users.forEach((user) => {
          user.addEventListener("click", assignUsers);
        });
      }
    }
  }
};

const getUsers = async (projectID, cardID) => {
  const data = new FormData();
  data.append("action", "get_assign_users");
  data.append("projectID", projectID);
  data.append("cardID", cardID);
  data.append("security", myAjax.security);

  const request = await fetch(myAjax.ajaxurl, {
    method: "POST",
    body: data,
  });

  return request.json();
};

const assignUsersCloseGlobal = () => {
  const assignUsersViewGlobal = document.querySelectorAll(".assign-users");
  assignUsersViewGlobal.forEach((assignUsersViewGlobal) => {
    assignUsersViewGlobal.classList.remove("show");
    assignUsersViewGlobal.classList.add("hide");
  });
};

const assignUsersViewClose = (e) => {
  if (
    (!e.target.closest(".user-assign") && !e.target.closest(".assign-users")) ||
    e.target.closest(".assign-users-close")
  ) {
    assignUsersCloseGlobal();
  }
};

const searchUsers = (e) => {
  const term = e.currentTarget.value.toLowerCase();
  const users = e.currentTarget.parentElement.querySelectorAll(".assign-user");

  if (users) {
    users.forEach((user) => {
      const name = user
        .querySelector(".assign-user-name")
        .innerHTML.toLowerCase();
      const searchTerm = term.toLowerCase();

      if (searchTerm === "") {
        user.classList.remove("hide");
      } else if (name.indexOf(searchTerm) !== -1) {
        user.classList.remove("hide");
      } else {
        user.classList.add("hide");
      }
    });
  }
};

const removeUser = (card, userID) => {
  const users = card.querySelectorAll(".user-assign .assign-user");
  const queryTrigger = card.querySelector(".user-assign");

  if (users) {
    users.forEach((user) => {
      if (userID === user.dataset.id) {
        user.remove();
      }
    });

    const IsUsers = card.querySelectorAll(".user-assign .assign-user");

    if (IsUsers.length === 0) {
      queryTrigger.classList.remove("hasUsers");
    }
  }
};

const assignUsers = async (e) => {
  const target = e.currentTarget;
  const userID = target.dataset.id;
  const card =
    target.closest(".kanban-card") ??
    document.querySelector(".kanban-card-view");
  const assignUsersSelect = card.querySelector(".user-assign");
  const taskID =
    card.dataset.cardId !== undefined
      ? card.dataset.cardId
      : assignUsersSelect.dataset.cardid;

  const userClone = target.cloneNode(true);
  userClone.removeEventListener("click", assignUsers);
  const assignName = userClone.querySelector(".assign-user-name");
  if (assignName) assignName.remove();

  const data = new FormData();
  data.append("action", "assign_users_to_task");
  data.append("userID", userID);
  data.append("cardID", taskID);
  data.append("security", myAjax.security);

  try {
    const request = await fetch(myAjax.ajaxurl, {
      method: "POST",
      body: data,
    });

    const response = await request.json();

    if (!response || response.success === false) {
      console.error("Error user assign");
    } else {
      if (target.classList.contains("selected")) {
        target.classList.remove("selected");
        const smallViewCard = document.querySelector(
          `.kanban-card[data-card-id="${taskID}"]`
        );
        removeUser(card, userID);
        removeUser(smallViewCard, userID);
      } else {
        target.classList.add("selected");

        const queryTrigger = card.querySelector(".user-assign");

        if (!queryTrigger.classList.contains("hasUsers")) {
          queryTrigger.classList.add("hasUsers");
        }

        queryTrigger.prepend(userClone);

        if (card.classList.contains("kanban-card-view")) {
          const smallViewCard = document.querySelector(
            `.kanban-card[data-card-id="${taskID}"]`
          );

          const queryTriggerSmallViewCard =
            smallViewCard.querySelector(".user-assign");

          if (!queryTriggerSmallViewCard.classList.contains("hasUsers")) {
            queryTriggerSmallViewCard.classList.add("hasUsers");
          }

          queryTriggerSmallViewCard.prepend(userClone.cloneNode(true));
        }
      }
    }
  } catch (err) {
    console.error("AJAX error", err);
  }
};

const assignUsersCardView = (e) => {
  const card = document.querySelector(
    `.kanban-card[data-card-id="${e.detail.cardID}"]`
  );
  const userAsign = card.querySelector(".user-assign").cloneNode(true);
  userAsign.addEventListener("click", assignUsersViewAction);
  const kanbanCardViewTitle = document
    .querySelector(".kanban-card-view")
    .querySelector(".board_members_title");
  kanbanCardViewTitle.after(userAsign);
};

const assignUsersCardViewDelete = (e) => {
  const userAsign = document
    .querySelector(".kanban-card-view")
    .querySelector(".user-assign");

  if (userAsign) {
    userAsign.remove();
  }
};

if (search) {
  search.forEach((search) => {
    search.addEventListener("keyup", searchUsers);
  });
}

document.addEventListener("click", assignUsersViewClose);

document.body.addEventListener("click", assignUsersViewAction);

document.addEventListener("cardViewOpened", assignUsersCardView);
document.addEventListener("cardViewClosed", assignUsersCardViewDelete);
