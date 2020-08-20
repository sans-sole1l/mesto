

export class FormValidator {
  constructor(obj, form) {
    this._inputSelector = obj.inputSelector;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._inputErrorClass = obj.inputErrorClass;
    this._errorClass = obj.errorClass;
    this._formElement = document.querySelector(form);
  }

  openModalValidation() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    inputList.forEach(inputElement => {
      if (inputElement.value.length > 0) {
        this._isValid(this._formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement, this._inactiveButtonClass);
      } else {
        this._toggleButtonState(inputList, buttonElement, this._inactiveButtonClass);
      }
    });
  }

  // Функция добавления слушателей формам

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners(this._formElement);
  };

  // Функция добавления слушателей всем полям формы

  _setEventListeners(formElement) {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

    // Найдём в текущей форме кнопку отправки
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
    this._toggleButtonState(inputList, buttonElement, this._inactiveButtonClass);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(this._formElement, inputElement)

        this._toggleButtonState(inputList, buttonElement, this._inactiveButtonClass);
      });
    });
  };

  // Функция проверки инпута

  _isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(this._formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(this._formElement, inputElement);
    }
  };

    // Функция добавления ошибки
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Функция скрытия ошибки
  _hideInputError(formElement, inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

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
