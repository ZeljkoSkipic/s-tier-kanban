jQuery(function ($) {
  const dynamicSelectItem = ".dynamic-select-item";
  const dynamicSelectCurrent = ".dynamic-select-current";

  const updateOption = (e) => {
    const currentTarget = e.target.closest(dynamicSelectItem);
    const dropdownTriggerTarget = e.target.closest(dynamicSelectCurrent);

    // Open dropdown

    if (dropdownTriggerTarget) {
        const dynamicSelect = $(dropdownTriggerTarget).closest('.dynamic-select');
        const selectDropdown = dynamicSelect.find('.dynamic-select-dropdown')

      if (!selectDropdown.hasClass("active")) {
        selectDropdown.addClass("active");
        selectDropdown.slideDown(".4s");
        dynamicSelect.addClass('dropdown-opened');
      } else {
        selectDropdown.removeClass("active");
        selectDropdown.slideUp(".4s");
        dynamicSelect.removeClass('dropdown-opened');
      }
    }

    else {
      if(!currentTarget) {
        const dynamicSelect = $('.dynamic-select');
        const selectDropdown = $('.dynamic-select-dropdown')
        selectDropdown.removeClass("active");
        selectDropdown.slideUp(".4s");
        dynamicSelect.removeClass('dropdown-opened');
      }
    }

    if (currentTarget) {
      const currentOption = $(currentTarget);
      const dynamicSelect = currentOption.closest('.dynamic-select');
      const optionValue = currentOption.data('option')

      if (!currentOption.hasClass("active")) {

        // Remove active to all otgers options

        const allOptions = $(".dynamic-select-item");
        allOptions.removeClass("active");

        // Add active to current item

        currentOption.addClass("active");

        // Change select option

        const select = dynamicSelect.next();
        select.val(optionValue)
        const event = new CustomEvent("change", { bubbles: true, cancelable: true });
        select[0].dispatchEvent(event);
        
      }

      // Switch current target

      const cloneCurrentOption = currentOption.clone();
      cloneCurrentOption.removeClass('active dynamic-select-item');
      cloneCurrentOption.addClass('dynamic-select-current-item');

      if(optionValue == "") {
        cloneCurrentOption.find('.dynamic-select-label').addClass('dynamic-select-label--default');
      }

      const dynamicSelectCurrentOptionWrapper = $('.dynamic-select-current');
      dynamicSelect.find(dynamicSelectCurrentOptionWrapper).html('');
      dynamicSelect.find(dynamicSelectCurrentOptionWrapper).append(cloneCurrentOption);

      // Close dropdown
      const selectDropdown = $(".dynamic-select-dropdown");
      dynamicSelect.find(selectDropdown).removeClass("active");
      dynamicSelect.find(selectDropdown).slideUp(".4s");
      dynamicSelect.removeClass('dropdown-opened');
    }
  };

  document.addEventListener("click", updateOption);
});
