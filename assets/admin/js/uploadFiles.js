jQuery(document).ready(function ($) {
  let hiddenField = $("input[name='board-documents']");
  let hiddenFieldValue = hiddenField.val() ? hiddenField.val().split(",") : [];

  const openMediaUploader = () => {
    const customUploader = wp.media({
      title: "Insert Files",
      button: {
        text: "Use these files",
      },
      multiple: true,
    });

    customUploader.on("open", function () {
      let selection = customUploader.state().get("selection");

      hiddenFieldValue.forEach((id) => {
        let attachment = wp.media.attachment(id);
        attachment.fetch();
        selection.add(attachment);
      });

      selection.on("remove", function (removedItem) {
        let fileId = removedItem.id.toString();

        $(".board-files li").each(function () {
          if ($(this).data("id").toString() === fileId) {
            $(this).remove();
          }
        });

        hiddenFieldValue = hiddenFieldValue.filter((id) => id !== fileId);
        hiddenField.val(hiddenFieldValue.join(","));
      });
    });

    customUploader.on("select", function () {
      let selectedFiles = customUploader
        .state()
        .get("selection")
        .map((item) => item.toJSON());

      selectedFiles.forEach((file) => {
        let fileId = file.id.toString();

        if (!hiddenFieldValue.includes(fileId)) {
          $(".board-files").append(
            `<li data-id="${fileId}"><span> ${file.filename} </span><a href="#" class="board-file-remove">×</a></li>`
          );
          hiddenFieldValue.push(fileId);
        }
      });

      hiddenField.val(hiddenFieldValue.join(","));
    });

    customUploader.open();
  };

  $(".board-upload-button").on("click", openMediaUploader);

  $(".board-files").on("click", ".board-file-remove", function (e) {
    e.preventDefault();
    let fileId = $(this).closest("li").data("id").toString();

    $(this).closest("li").remove();
    hiddenFieldValue = hiddenFieldValue.filter((id) => id !== fileId);

    hiddenField.val(hiddenFieldValue.join(","));
  });
});
