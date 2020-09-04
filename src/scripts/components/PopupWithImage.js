import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(modalSelector) {
    super(modalSelector);

    this._modalImage = this._modalWindow.querySelector('.modal__image');
    this._modalPhotoTitle = this._modalWindow.querySelector('.modal__title_type_photo');
  }

  open(data) {
    super.open();

    this._modalImage.src = data.link;
    this._modalImage.alt= data.name;
    this._modalPhotoTitle.textContent = data.name;
  }
}
