// Comment Editor

let commentEditors = [];

const editor = new EditorJS({
  holder: "kanban-comment-editor-js",
  minHeight: 100,
  placeholder: "Post a comment...",
  tools: {
    Marker: {
      class: Marker,
      inlineToolbar: true,
      shortcut: "CMD+SHIFT+M",
    },
    image: {
      class: SimpleImage,
      inlineToolbar: true,
      config: {
        placeholder: "Paste image URL",
      },
    },
    code: {
      class: CodeTool,
      shortcut: "CMD+SHIFT+C",
    },
  },

  data: {},
});

const createEditorsPromise = async () => {
  await Promise.all(
    Array.from(document.querySelectorAll(".kanban-comment-text")).map(
      async (field) => {
        const textFieldID = field.id;
        const data = field.dataset.content;

        // Clear existing editors
        if (commentEditors.length) {
          commentEditors.forEach((editor) => {
            editor.destroy();
          });
          commentEditors = [];
        }

        if (textFieldID) {
          const commentsEditor = new EditorJS({
            holder: textFieldID,
            readOnly: true,
            minHeight: 0,
            defaultBlock: "defaultBlock",
            tools: {
              Marker: {
                class: Marker,
                inlineToolbar: true,
                shortcut: "CMD+SHIFT+M",
              },
              image: {
                class: SimpleImage,
                inlineToolbar: ["link"],
              },
              code: {
                class: CodeTool,
                shortcut: "CMD+SHIFT+C",
              },
              defaultBlock: DefaultBlock,
            },
            data: JSON.parse(data),
          });

          await commentsEditor.isReady;
          commentEditors.push(commentsEditor);
        }
      }
    )
  );

  return commentEditors;
};

// Find editor instance

const findEditor = (editors, holder) => {
  if (editors.length) {
    return editors.filter((editor) => {
      if (editor !== undefined) {
        if (editor.configuration !== undefined) {
          return editor.configuration.holder === holder;
        }
      }
    });
  }
};

const comments = (e) => {
  e.preventDefault();

  const cardId = e.target.dataset.cardId;
  const data = new FormData();
  editor.save().then(async (savedData) => {
    if (savedData.blocks.length === 0) return;
    data.append("action", "stk_card_comments");
    data.append("cardId", cardId);
    data.append("security", myAjax.security);
    data.append("comment", JSON.stringify(savedData, null, 4));

    const request = await fetch(myAjax.ajaxurl, {
      method: "POST",
      body: data,
    });

    const response = await request.json();
    if (response && response.success === true) {
      getComments(cardId);
      editor.clear();
      Swal.fire({
        title: "Comment Added!",
        text: "You have successfully added new comment.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });

      // Add user to comment list if does not exist

      const userID = response.data.user_id;

      const cardCommentUsers = document
        .querySelector(`[data-card-id="${cardId}"]`)
        .querySelectorAll(`[data-user="${userID}"]`);

      const usersWrapper = document
        .querySelector(`[data-card-id="${cardId}"]`)
        .querySelector(".card-members");

      if (!cardCommentUsers.length) {
        usersWrapper.insertAdjacentHTML(
          "beforeend",
          `<div data-user="${userID}" class="user-avatar">
              ${response.data.user_avatar}
          </div>`
        );
      }
    }
  });
};

const getComments = async (cardID) => {
  const data = new FormData();
  data.append("action", "stk_get_comments");
  data.append("cardId", cardID);
  data.append("security", myAjax.security);

  // Add loader
  const commnetsWrapper = document.querySelector(".kanban-comments");
  const loader = document.createElement("div");
  loader.classList.add("loader");
  commnetsWrapper.append(loader);

  const request = await fetch(myAjax.ajaxurl, {
    method: "POST",
    body: data,
  });

  const response = await request.json();
  commnetsWrapper.innerHTML = "";

  if (response && response.success === true) {
    if (response.data.comments) {
      commnetsWrapper.innerHTML = response.data.comments;

      const commentsTextField = document.querySelectorAll(
        ".kanban-comment-text"
      );
      if (commentsTextField.length !== 0) {
        const editors = await createEditorsPromise();

        const editMode = (e) => {
          const editor = findEditor(
            editors,
            "comment_" + String(e.detail.commentID)
          );
          if (editor[0] === undefined) return;
          editor[0].readOnly.toggle("", true);
        };
        document.removeEventListener("editMode", editMode);
        document.addEventListener("editMode", editMode);

        const discardMode = (e) => {
          const editor = findEditor(
            editors,
            "comment_" + String(e.detail.commentID)
          );
          if (editor[0] === undefined) return;
          editor[0].readOnly.toggle();
        };

        document.removeEventListener("discardMode", discardMode);
        document.addEventListener("discardMode", discardMode);

        const commentEdited = (e) => {
          const editor = findEditor(
            editors,
            "comment_" + String(e.detail.commentID)
          );
          if (editor[0] === undefined) return;
          editor[0].save().then(async (savedData) => {
            if (savedData.blocks.length === 0) return;
            commentsAction(
              "",
              true,
              e.detail.commentID,
              JSON.stringify(savedData, null, 4)
            );
          });
        };
        document.removeEventListener("commentEdited", commentEdited);
        document.addEventListener("commentEdited", commentEdited);
      }
    } else {
      const noComments = document.querySelector(".no-comments");
      if (!noComments) {
        const noComments = document.createElement("p");
        noComments.classList.add("no-comments");
        noComments.innerHTML = "Currently, there are no comments";
        commnetsWrapper.append(noComments);
      }
    }
  }
};

const commentsAction = async (
  e,
  editSaveButtonAction = false,
  commentIDEvent = null,
  dataBlocks = null
) => {
  const deleteButton = e ? e.target.matches(".kanban-comment-delete") : "";
  const editButton = e ? e.target.matches(".kanban-comment-edit") : "";
  const editSaveButton = e ? e.target.matches(".kanban-comment-edit-save") : "";
  let commentDeleted = null;

  if (deleteButton) {
    commentDeleted = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this comment?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: "Cancel",
    });
  }

  if (editButton) {
    const commentID = e.target.dataset.commentId;
    const editMode = new CustomEvent("editMode", {
      detail: { commentID: commentID },
    });
    document.dispatchEvent(editMode);
    return;
  }

  if (editSaveButton) {
    const commentID = e.target.dataset.commentId;
    const commentEdited = new CustomEvent("commentEdited", {
      detail: { commentID: commentID },
    });
    document.dispatchEvent(commentEdited);
    return;
  }
  if ((deleteButton && commentDeleted.isConfirmed) || editSaveButtonAction) {
    const data = new FormData();
    const commentID = e ? e.target.dataset.commentId : commentIDEvent;
    data.append("action", "stk_comments_actions");
    data.append("commentAction", deleteButton ? "delete" : "edit");
    data.append("commentID", commentID);
    data.append("security", myAjax.security);

    if (data !== null) {
      data.append("comment", dataBlocks);
    }

    const request = await fetch(myAjax.ajaxurl, {
      method: "POST",
      body: data,
    });

    const response = await request.json();
    if (response && response.success === true) {
      if (deleteButton) {
        const comment = e.target.closest(".kanban-comment");
        const commentUserID = comment.dataset.userId;
        const commentCardID = comment.dataset.cardId;

        // Delete comment
        comment.remove();

        // Delete user avatar if is last comment that user added

        const commentsByUser = document.querySelectorAll(
          `.kanban-comments [data-user-id="${commentUserID}"]`
        );

        if (!commentsByUser.length) {
          document
            .querySelector(`.kanban-card[data-card-id="${commentCardID}"]`)
            .querySelector(`.card-members [data-user="${commentUserID}"]`)
            .remove();
        }

        if (document.querySelectorAll(".kanban-comment").length === 0) {
          const noComments = document.createElement("p");
          const commnetsWrapper = document.querySelector(".kanban-comments");
          noComments.classList.add("no-comments");
          noComments.innerHTML = "Currently, there are no comments";
          commnetsWrapper.append(noComments);
        }
      } else {
        discardEditMode("", commentID);
      }
    }
  }
};

const editMode = (e) => {
  const commentID = "#comment_" + String(e.detail.commentID);
  const commentField = document.querySelector(commentID);
  const comment = document.querySelector(commentID).parentElement;
  comment.querySelector(".kanban-comment-buttons-edit-mode").style.display =
    "block";
  comment.querySelector(".kanban-comment-buttons").style.display = "none";
  commentField.classList.add("edit-mode");
};

const discardEditMode = (e, commentIDAction = false) => {
  if (e ? e.target.matches(".kanban-comment-discard") : "" || commentIDAction) {
    const commentID =
      "#comment_" + String(e ? e.target.dataset.commentId : commentIDAction);
    const commentField = document.querySelector(commentID);
    const comment = document.querySelector(commentID).parentElement;
    comment.querySelector(".kanban-comment-buttons-edit-mode").style.display =
      "none";
    comment.querySelector(".kanban-comment-buttons").style.display = "block";
    commentField.classList.remove("edit-mode");
    const discardMode = new CustomEvent("discardMode", {
      detail: { commentID: e ? e.target.dataset.commentId : commentIDAction },
    });
    document.dispatchEvent(discardMode);
  }
};

// When card view in opened load comments for that card

document.addEventListener("cardViewOpened", (e) =>
  getComments(e.detail.cardID)
);

// when card view closed clear comment editor

document.addEventListener("cardViewClosed", (e) => editor.clear());

const commentsSave = document.querySelector(".kanban-comment-save");
commentsSave.addEventListener("click", comments);
document.addEventListener("editMode", editMode);
document.addEventListener("click", commentsAction);

document.addEventListener("click", discardEditMode);
