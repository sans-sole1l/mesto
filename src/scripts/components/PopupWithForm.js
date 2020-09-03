import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(modalSelector, handleFormSubmit) {
    super(modalSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._modalForm = this._modalWindow.querySelector('.modal__form');
  }

  _getInputValues() {
    this._inputList = this._modalWindow.querySelectorAll('.modal__input');

    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    this._formValuesArray = [this._formValues];

    return this._formValuesArray;
  }

  setEventListeners() {
    super.setEventListeners();

    this._callback = this._submitCallback.bind(this);

    this._modalForm.addEventListener('submit', this._callback);
  }

  _submitCallback(evt) {
    evt.preventDefault();

    this._handleFormSubmit(this._getInputValues());

    this.close();
  }

  close() {
    super.close();

    this._modalForm.reset();

    this._modalForm.removeEventListener('submit', this._callback);
  }
}
