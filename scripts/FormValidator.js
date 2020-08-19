

export class FormValidator {
  constructor(obj, form) {
    this._inputSelector = obj.inputSelector;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._inputErrorClass = obj.inputErrorClass;
    this._errorClass = obj.errorClass;
    this._form = form;
  }

  openModalValidation() {
    const formElement = document.querySelector(this._form);
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);

    inputList.forEach(inputElement => {
      this._isValid(formElement, inputElement);

      this._toggleButtonState(inputList, buttonElement, this._inactiveButtonClass);
    });
  }

  // Функция добавления слушателей формам

  enableValidation() {
    const formElement = document.querySelector(this._form);

    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners(formElement);
  };

  // Функция добавления слушателей всем полям формы

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));

    // Найдём в текущей форме кнопку отправки
    const buttonElement = formElement.querySelector(this._submitButtonSelector);

    // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
    this._toggleButtonState(inputList, buttonElement, this._inactiveButtonClass);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement)

        this._toggleButtonState(inputList, buttonElement, this._inactiveButtonClass);
      });
    });
  };

  // Функция проверки инпута

  _isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

    // Функция добавления ошибки
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Функция скрытия ошибки
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = ''
  }

    // Функция активации кнопки "Сохранить"
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

    // Функция проверки полей на валидность
  _hasInvalidInput(inputList) {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся фунцкция
      // hasInvalidInput вернёт true

      return !inputElement.validity.valid;
    })
  };
}
