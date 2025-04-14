jQuery(function ($) {
  const dynamicSelectItem = ".dynamic-select-item";
  const dynamicSelectCurrent = ".dynamic-select-current";

  const cardViewWrapper = document.querySelector(".kanban-card-view");

  const priorityView = cardViewWrapper?.querySelector(".card-priority");
  const statusView = cardViewWrapper?.querySelector(".card-status");

  const updateOption = (e) => {
    const currentTarget = e.target.closest(dynamicSelectItem);
    const dropdownTriggerTarget = e.target.closest(dynamicSelectCurrent);

    // Open dropdown

    if (dropdownTriggerTarget) {
      const dynamicSelect = $(dropdownTriggerTarget).closest(".dynamic-select");
      const selectDropdown = dynamicSelect.find(".dynamic-select-dropdown");

      if (!selectDropdown.hasClass("active")) {
        selectDropdown.addClass("active");
        selectDropdown.slideDown(".1s");
        dynamicSelect.addClass("dropdown-opened");
      } else {
        selectDropdown.removeClass("active");
        selectDropdown.slideUp(".1s");
        dynamicSelect.removeClass("dropdown-opened");
      }
    } else {
      if (!currentTarget) {
        const dynamicSelect = $(".dynamic-select");
        const selectDropdown = $(".dynamic-select-dropdown");
        selectDropdown.removeClass("active");
        selectDropdown.slideUp(".1s");
        dynamicSelect.removeClass("dropdown-opened");
      }
    }

    if (currentTarget) {
      const currentOption = $(currentTarget);
      const dynamicSelect = currentOption.closest(".dynamic-select");
      const optionValue = currentOption.data("option");

      if (!currentOption.hasClass("active")) {
        // Remove active to all otgers options

        const allOptions = $(".dynamic-select-item");
        allOptions.removeClass("active");

        // Add active to current item

        currentOption.addClass("active");

        // Change select option

        const select = dynamicSelect.next();
        select.val(optionValue);
        const event = new CustomEvent("change", {
          bubbles: true,
          cancelable: true,
        });
        select[0].dispatchEvent(event);
      }

      // Switch current target

      const cloneCurrentOption = currentOption.clone();
      cloneCurrentOption.removeClass("active dynamic-select-item");
      cloneCurrentOption.addClass("dynamic-select-current-item");

      if (optionValue == "") {
        cloneCurrentOption
          .find(".dynamic-select-label")
          .addClass("dynamic-select-label--default");
      }

      const dynamicSelectCurrentOptionWrapper = $(".dynamic-select-current");
      dynamicSelect.find(dynamicSelectCurrentOptionWrapper).html("");
      dynamicSelect
        .find(dynamicSelectCurrentOptionWrapper)
        .append(cloneCurrentOption);

      // Close dropdown
      const selectDropdown = $(".dynamic-select-dropdown");
      dynamicSelect.find(selectDropdown).removeClass("active");
      dynamicSelect.find(selectDropdown).slideUp(".1s");
      dynamicSelect.removeClass("dropdown-opened");
    }
  };

  const syncPriorityWithViewPriority = () => {
    setTimeout(() => {
      const card = document.querySelector(
        `.kanban-card[data-card-id="${cardViewWrapper.dataset.cardId}"]`
      );
      const viewPriority = cardViewWrapper.querySelector(
        ".priority-wrap .dynamic-select-current-item"
      );

      const viewSelect =
        cardViewWrapper.querySelector(".card-priority").selectedIndex;

      const clonedPriority = viewPriority.cloneNode(true);
      const cardPriorityWrapper = card.querySelector(
        ".priority-wrap .dynamic-select-current"
      );
      card.querySelector(".card-priority").selectedIndex = viewSelect;
      cardPriorityWrapper.replaceChildren(clonedPriority);
    }, 100);
  };

  const syncStatusWithViewStatus = () => {
    setTimeout(() => {
      const card = document.querySelector(
        `.kanban-card[data-card-id="${cardViewWrapper.dataset.cardId}"]`
      );
      const viewStatus = cardViewWrapper.querySelector(
        ".status-wrap .dynamic-select-current-item"
      );

      const viewSelect =
        cardViewWrapper.querySelector(".card-status").selectedIndex;

      const clonedStatus = viewStatus.cloneNode(true);
      const cardStatusWrapper = card.querySelector(
        ".status-wrap .dynamic-select-current"
      );
      card.querySelector(".card-status").selectedIndex = viewSelect;
      cardStatusWrapper.replaceChildren(clonedStatus);
    }, 100);
  };

  document.addEventListener("click", updateOption);
  priorityView?.addEventListener("change", syncPriorityWithViewPriority);
  statusView?.addEventListener("change", syncStatusWithViewStatus);
});
