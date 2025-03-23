jQuery(document).ready(function ($) {
  const profilePopup = document.querySelector(".s-tier-kanban-edit-profile");
  const editProfileButton = document.querySelector(".edit-info");
  const closeProfileButton = document.querySelector(".edit-info-close");
  const editForm = document.querySelector(".s-tier-kanban-edit-profile form");
  const firstName = document.querySelector(".kanban-account-page .first_name");
  const lastName = document.querySelector(".kanban-account-page .last_name");

  const profilePopupActionOpen = (e) => {
    e.preventDefault();
    profilePopup.classList.remove("hide");
    profilePopup.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
  };

  const profilePopupActionClose = (e) => {
    e?.preventDefault();
    profilePopup.classList.remove("show");
    profilePopup.classList.add("hide");
    document.querySelector("body").style.overflow = "auto";
  };

  // Validate form

  jQuery.validator.addMethod(
    "passwordRule",
    function (value, element) {
      return (
        this.optional(element) ||
        /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(
          value
        )
      );
    },
    "Password must be minimum 8 characters long, have at least one number, and one uppercase letter. <a href='https://stierdev.com/secure-password-generator/' target='_blank'>Secure Password Generator</a>"
  );

  $(".s-tier-kanban-edit-profile form").validate({
    rules: {
      first_name: "required",
      last_name: "required",
      password: {
        passwordRule: true,
      },
      password_confirm: {
        equalTo: "#password",
      },
    },
    submitHandler: function (form) {
      updateProfileAction(form);
    },
  });

  const updateProfileAction = async (form) => {
    const formData = new FormData(editForm);
    let password = formData.get("password");

    if (!password) {
      formData.delete("password");
      formData.delete("password_confirm");
    }

    formData.append("action", "stk_update_user");
    formData.append("security", myAjax.security);

    const request = await fetch(myAjax.ajaxurl, {
      method: "POST",
      body: formData,
    });

    const response = await request.json();

    if (response.success === true) {
      profilePopupActionClose();

      firstName.textContent = formData.get("first_name");
      lastName.textContent = formData.get("last_name");
      Swal.fire({
        title: "Profile updated successfully!",
        timer: 10000000,
        showConfirmButton: false,
				icon: "info"
      });
    }
  };

  editProfileButton?.addEventListener("click", profilePopupActionOpen);
  closeProfileButton?.addEventListener("click", profilePopupActionClose);
});
