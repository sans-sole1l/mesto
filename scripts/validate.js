// Функция проверки полей на валидность
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

// Функция активации кнопки "Сохранить"
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

// Функция добавления ошибки
const showInputError = (formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

// Функция скрытия ошибки
const hideInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = ''
}

// Функция проверки инпута

const isValid = (formElement, inputElement, { ...rest }) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, rest);
  } else {
    hideInputError(formElement, inputElement, rest);
  }
};

// Функция добавления слушателей всем полям формы

const setEventListeners = (formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(submitButtonSelector);

  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, rest)

      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

// Функция добавления слушателей формам

const enableValidation = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    });

    setEventListeners(formElement, rest);
  });
};

enableValidation({
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__save-button',
  inactiveButtonClass: 'modal__save-button_inactive',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__input-error_active'
});


// валидация полей формы профиля при открытии и перезаписи значений полей

const openModalValidation = ({ openModalButtonSelector, formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }) => {
  const openModalButton = document.querySelector(openModalButtonSelector);
  const formElement = document.querySelector(formSelector);
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  openModalButton.addEventListener('click', () => {
    inputList.forEach(inputElement => {
      isValid(formElement, inputElement, rest);

      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
}

openModalValidation({
  openModalButtonSelector: '.profile__edit-button',
  formSelector: '.modal__form_type_profile',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__save-button',
  inactiveButtonClass: 'modal__save-button_inactive',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__input-error_active'
});
