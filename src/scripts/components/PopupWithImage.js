import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(modalSelector, data) {
    super(modalSelector);
    this._link = data.link;
    this._name = data.name;
  }

  open() {
    super.open();

    const modalImage = this._modalWindow.querySelector('.modal__image');
    const modalPhotoTitle = this._modalWindow.querySelector('.modal__title_type_photo');

    modalImage.src = this._link;
    modalImage.alt= this._name;
    modalPhotoTitle.textContent = this._name;
  }
}
