import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(modalSelector, handleFormSubmit) {
    super(modalSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._modalForm = this._modalWindow.querySelector('.modal__form');
    this._saveButton = this._modalForm.querySelector('.modal__save-button');
  }

  _getInputValues() {
    this._inputList = this._modalWindow.querySelectorAll('.modal__input');

    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._callback = this._submitCallback.bind(this);

    this._modalForm.addEventListener('submit', this._callback);
  }

  _submitCallback(evt) {
    evt.preventDefault();

    this._buttonDelayStatus();

    this._handleFormSubmit(this._getInputValues());
  }

  close() {
    super.close();

    this._modalForm.reset();

    this._modalForm.removeEventListener('submit', this._callback);

    if (this._modalWindow.classList.contains('modal_type_add-card')) {
      this._saveButton.textContent = 'Создать';
    } else {
      this._saveButton.textContent = 'Сохранить';
    }
  }

  _buttonDelayStatus() {
    this._saveButton.textContent = 'Сохранение...';
  }
}
