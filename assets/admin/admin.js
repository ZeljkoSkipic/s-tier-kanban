"use strict";
"use strict";

jQuery(document).ready(function ($) {
  var hiddenField = $("input[name='board-documents']");
  var hiddenFieldValue = hiddenField.val() ? hiddenField.val().split(",") : [];
  var openMediaUploader = function openMediaUploader() {
    var customUploader = wp.media({
      title: "Insert Files",
      button: {
        text: "Use these files"
      },
      multiple: true
    });
    customUploader.on("open", function () {
      var selection = customUploader.state().get("selection");
      hiddenFieldValue.forEach(function (id) {
        var attachment = wp.media.attachment(id);
        attachment.fetch();
        selection.add(attachment);
      });
      selection.on("remove", function (removedItem) {
        var fileId = removedItem.id.toString();
        $(".board-files li").each(function () {
          if ($(this).data("id").toString() === fileId) {
            $(this).remove();
          }
        });
        hiddenFieldValue = hiddenFieldValue.filter(function (id) {
          return id !== fileId;
        });
        hiddenField.val(hiddenFieldValue.join(","));
      });
    });
    customUploader.on("select", function () {
      var selectedFiles = customUploader.state().get("selection").map(function (item) {
        return item.toJSON();
      });
      selectedFiles.forEach(function (file) {
        var fileId = file.id.toString();
        if (!hiddenFieldValue.includes(fileId)) {
          $(".board-files").append("<li data-id=\"".concat(fileId, "\"><span> ").concat(file.filename, " </span><a href=\"#\" class=\"board-file-remove\">\xD7</a></li>"));
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
    var fileId = $(this).closest("li").data("id").toString();
    $(this).closest("li").remove();
    hiddenFieldValue = hiddenFieldValue.filter(function (id) {
      return id !== fileId;
    });
    hiddenField.val(hiddenFieldValue.join(","));
  });
});