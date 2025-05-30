document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const errorBlock = document.getElementById("form-error");

  function createModal({ title = "", text = "", type = "success" }) {
    const modal = document.createElement("div");
    modal.className = "modal modal--open";
    const iconId = type === "success" ? "check" : "warning";
    modal.innerHTML = `
      <div class="modal__overlay"></div>
      <div class="modal__content">
        <button class="modal__close" aria-label="Закрыть окно">×</button>
        <svg class="modal__icon modal__icon--${type}" width="48" height="48">
          <use xlink:href="images/sprite.svg#${iconId}"></use>
        </svg>
        <div class="modal__title">${title}</div>
        <div class="modal__text">${text}</div>
      </div>
    `;
    document.body.appendChild(modal);
    // Закрытие по overlay
    modal
      .querySelector(".modal__overlay")
      .addEventListener("click", () => closeModal(modal));
    // Закрытие по крестику
    modal
      .querySelector(".modal__close")
      .addEventListener("click", () => closeModal(modal));
    return modal;
  }

  function closeModal(modal) {
    if (modal && modal.parentNode) {
      modal.classList.remove("modal--open");
      setTimeout(() => {
        if (modal.parentNode) modal.parentNode.removeChild(modal);
      }, 200);
    }
  }

  const validate = new window.JustValidate("#contact-form", {
    errorLabelStyle: {
      color: "#e74c3c",
      fontSize: "14px",
      marginTop: "8px",
    },
  });

  validate
    .addField("#contact-name", [
      { rule: "required", errorMessage: "Введите имя" },
      { rule: "minLength", value: 3, errorMessage: "Минимум 3 символа" },
      { rule: "maxLength", value: 20, errorMessage: "Максимум 20 символов" },
    ])
    .addField("#contact-email", [
      { rule: "required", errorMessage: "Введите почту" },
      { rule: "email", errorMessage: "Некорректный email" },
    ])
    .addField("#contact-agree", [
      { rule: "required", errorMessage: "Необходимо согласие" },
    ])
    .onFail(function (fields) {
      let messages = [];
      if (
        fields["#contact-name"] &&
        Array.isArray(fields["#contact-name"].messages) &&
        fields["#contact-name"].messages.length
      ) {
        messages.push(fields["#contact-name"].messages[0]);
      }
      if (
        fields["#contact-email"] &&
        Array.isArray(fields["#contact-email"].messages) &&
        fields["#contact-email"].messages.length
      ) {
        messages.push(fields["#contact-email"].messages[0]);
      }
      if (
        fields["#contact-agree"] &&
        Array.isArray(fields["#contact-agree"].messages) &&
        fields["#contact-agree"].messages.length
      ) {
        messages.push(fields["#contact-agree"].messages[0]);
      }
      errorBlock.textContent = messages.join(". ") || "";
    })
    .onSuccess(async function (event) {
      event.preventDefault();
      errorBlock.textContent = "";
      const formData = new FormData(form);
      try {
        const response = await fetch("https://httpbin.org/post", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          createModal({
            title: "Благодарим за обращение!",
            text: "Мы получили вашу заявку и свяжемся с вами в ближайшее время.",
            type: "success",
          });
          form.reset();
        } else {
          createModal({
            title: "Не удалось отправить обращение",
            text: "Что-то пошло не так, попробуйте отправить форму еще раз. Если ошибка повторится — свяжитесь со службой поддержки.",
            type: "error",
          });
        }
      } catch (e) {
        createModal({
          title: "Не удалось отправить обращение",
          text: "Что-то пошло не так, попробуйте отправить форму еще раз. Если ошибка повторится — свяжитесь со службой поддержки.",
          type: "error",
        });
      }
    });
});
