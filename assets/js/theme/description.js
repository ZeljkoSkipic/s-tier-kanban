const descriptionIcon = `<svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M13.25 10.875V8.6875C13.25 7.94158 12.9537 7.22621 12.4262 6.69876C11.8988 6.17132 11.1834 5.875 10.4375 5.875H9.1875C8.93886 5.875 8.7004 5.77623 8.52459 5.60041C8.34877 5.4246 8.25 5.18614 8.25 4.9375V3.6875C8.25 2.94158 7.95368 2.22621 7.42624 1.69876C6.89879 1.17132 6.18342 0.875 5.4375 0.875H3.875M3.875 11.5H10.125M3.875 14H7M5.75 0.875H1.6875C1.17 0.875 0.75 1.295 0.75 1.8125V16.1875C0.75 16.705 1.17 17.125 1.6875 17.125H12.3125C12.83 17.125 13.25 16.705 13.25 16.1875V8.375C13.25 6.38588 12.4598 4.47822 11.0533 3.0717C9.64678 1.66518 7.73912 0.875 5.75 0.875Z" stroke="#808890" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
				</svg>`;
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
							defaultBlock: {
								class: DefaultBlock,
							},
						},
						data: data,
					});

					// Add placeholder

					if (checkForEmptyObject(data) === true || data.blocks.length === 0) {
						const placeholder = document.createElement("span");
						placeholder.innerHTML = "Add a description";
						placeholder.classList.add("description-placeholder");
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
	const editorHtml = document.querySelector(
		".kanban-card-view-description-editor"
	);
	const saveButton = document.querySelector(".kanban-description-save");

	const isAdmin = saveButton.dataset.userAdmin;
	const isUserCreation = saveButton.dataset.userCreation;

	if (e.target.closest(".kanban-card-view-description-editor")) {
		if (
			!editorHtml.classList.contains("active") &&
			(isUserCreation || isAdmin)
		) {
			editorHtml.classList.add("active");
			descriptionEditor.readOnly.toggle();
			saveButton.style.display = "inline-block";
		}
	} else {
		if (
			editorHtml.classList.contains("active") &&
			!e.target.matches(".kanban-description-save")
		) {
			editorHtml.classList.remove("active");
			descriptionEditor.readOnly.toggle();
			saveButton.style.display = "none";
		}
	}
};

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

							card.querySelector(".card-svgs").innerHTML = descriptionIcon;
							card.querySelector(".card-description").dataset.description =
								response.data.description;
							const data = JSON.parse(response.data.description);
							editor.render(data);
							const editorHtml = document.querySelector(
								".kanban-card-view-description-editor"
							);
							const saveButton = document.querySelector(
								".kanban-description-save"
							);

							editorHtml.classList.remove("active");
							descriptionEditor.readOnly.toggle();
							saveButton.style.display = "none";
						}
					});
				}

				// Remove placeholder

				const card = document.querySelector(`[data-card-id="${cardId}"]`);
				const placeholder = card.querySelector(".description-placeholder");
				if (placeholder) {
					placeholder.remove();
				}

				// Add placeholder if description is blank

				if (JSON.parse(response.data.description).blocks.length === 0) {
					const placeholderCreate = document.createElement("span");
					placeholderCreate.innerHTML = "Add a description";
					placeholderCreate.classList.add("description-placeholder");
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

	const placeholderCreate = document.createElement("span");
	placeholderCreate.innerHTML = "Add a description";
	placeholderCreate.classList.add("description-placeholder");
	descriptionField.before(placeholderCreate);

	descriptionEditors.push(descriptionPreviewEditor);
};

// Events
document.addEventListener("click", activeDescriptionEditor);
document.addEventListener("cardAdded", initDescriptionEditorCardAdded);
document.addEventListener("cardViewOpened", renderDescription);
document.addEventListener("click", updateDescription);
