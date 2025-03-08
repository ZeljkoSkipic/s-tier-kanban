const checkForEmptyObject = (obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

// Front cards view only editors

let descriptionEditors = [];

const createEditorsPromiseDescription = async () => {
  await Promise.all(
    Array.from(document.querySelectorAll(".card-description")).map(
      async (field) => {
        const textFieldID = field.id;
        const data = JSON.parse(field.dataset.description);

        // Clear existing editors
        if (descriptionEditors.length) {
          descriptionEditors.forEach((editor) => {
            editor.destroy();
          });
          descriptionEditors = [];
        }

        if (textFieldID) {
          const descriptionPreviewEditor = new EditorJS({
            holder: textFieldID,
            readOnly: true,
            minHeight: 100,
            defaultBlock: 'defaultBlock',
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
              defaultBlock: {
                class: DefaultBlock,
              }
            },
            data: data,
          });

          // Add placeholder

          if(checkForEmptyObject(data) === true || data.blocks.length === 0 ) {
            const placeholder = document.createElement('span');
            placeholder.innerHTML = 'Add a description';
            placeholder.classList.add('description-placeholder');
            field.before(placeholder);
          }

          await descriptionPreviewEditor.isReady;
          descriptionEditors.push(descriptionPreviewEditor);
        }
      }
    )
  );

  return descriptionEditors;
};

// Description Single View Editor

const descriptionEditor = new EditorJS({
  holder: "description-editor-js",
  minHeight: 100,
  placeholder: "Write a description...",
  readOnly: true,
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

// Add discription active on click

const activeDescriptionEditor = (e) => {
  const editorHtml = document.querySelector('.kanban-card-view-description-editor');
  const saveButton = document.querySelector('.kanban-description-save');

  if (e.target.closest(".kanban-card-view-description-editor")) {
      if(!editorHtml.classList.contains('active')) {
        editorHtml.classList.add('active');
        descriptionEditor.readOnly.toggle();
        saveButton.style.display= "inline-block";
      }
  }

  else {
    if(editorHtml.classList.contains('active') && !e.target.matches('.kanban-description-save')) {
      editorHtml.classList.remove('active');
      descriptionEditor.readOnly.toggle();
      saveButton.style.display= "none";
    }
  }
}

const updateDescription = (e) => {
  if (e.target.matches(".kanban-description-save")) {
    e.preventDefault();

    const cardId = e.target.dataset.cardId;
    const data = new FormData();
    descriptionEditor.save().then(async (savedData) => {
      data.append("action", "stk_card_description_save");
      data.append("cardId", cardId);
      data.append("security", myAjax.security);
      data.append("description", JSON.stringify(savedData, null, 4));

      const request = await fetch(myAjax.ajaxurl, {
        method: "POST",
        body: data,
      });

      const response = await request.json();
      if (response && response.success === true) {
        if (descriptionEditors.length !== 0) {
          descriptionEditors.map((editor) => {
            const editorIDString = editor.configuration.holder;
            const editorIDSplit = editorIDString.split("-");
            const editorID = parseInt(editorIDSplit[editorIDSplit.length - 1]);

            if (editorID == cardId) {
              const card = document.querySelector(`[data-card-id="${cardId}"]`);
              card.querySelector(".card-description").dataset.description =
                response.data.description;
              const data = JSON.parse(response.data.description);
              editor.render(data);
              const editorHtml = document.querySelector('.kanban-card-view-description-editor');
              const saveButton = document.querySelector('.kanban-description-save');

              editorHtml.classList.remove('active');
              descriptionEditor.readOnly.toggle();
              saveButton.style.display= "none";
            }
          });
        }


        // Remove placeholder

        const card = document.querySelector(`[data-card-id="${cardId}"]`);
        const placeholder =  card.querySelector('.description-placeholder');
        if(placeholder) {
          placeholder.remove()
        }

        // Add placeholder if description is blank

        if(JSON.parse(response.data.description).blocks.length === 0) {
          const placeholderCreate = document.createElement('span');
          placeholderCreate.innerHTML = 'Add a description';
          placeholderCreate.classList.add('description-placeholder');
          card.querySelector(".card-description").before(placeholderCreate);
        }
      }
    });
  }
};

const initDescriptionEditors = async () => {
  await createEditorsPromiseDescription();
};

initDescriptionEditors();

const renderDescription = (e) => {
  const card = document.querySelector(`[data-card-id="${e.detail.cardID}"]`);
  let data = card.querySelector(".card-description").dataset.description;
  data = JSON.parse(data);

  if (data && !checkForEmptyObject(data)) {
    descriptionEditor.render(data);
  } else {
    descriptionEditor.clear();
  }
};

const initDescriptionEditorCardAdded = (e) => {
  const cardID = e.detail.cardID;
  const card = document.querySelector(`[data-card-id="${cardID}"]`);
  const descriptionField = card.querySelector(".card-description");

  const descriptionPreviewEditor = new EditorJS({
    holder: descriptionField.id,
    readOnly: true,
    minHeight: 100,
    defaultBlock: false,
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
    },
    data: {},
  });

  // Add editor placeholder

  const placeholderCreate = document.createElement('span');
  placeholderCreate.innerHTML = 'Add a description';
  placeholderCreate.classList.add('description-placeholder');
  descriptionField.before(placeholderCreate);

  descriptionEditors.push(descriptionPreviewEditor);
};

// Events
document.addEventListener('click', activeDescriptionEditor);
document.addEventListener("cardAdded", initDescriptionEditorCardAdded);
document.addEventListener("cardViewOpened", renderDescription);
document.addEventListener("click", updateDescription);
