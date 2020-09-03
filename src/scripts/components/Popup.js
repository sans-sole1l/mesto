export class Popup {
  constructor(modalSelector) {
    this._modalWindow = document.querySelector(modalSelector);

    this._hec = this._handleEscClose.bind(this);
    this._hoc = this._handleOverlayCLose.bind(this);
  }

  open() {
    this._modalWindow.classList.add('modal_opened');

    document.addEventListener('keyup', this._hec);
    this._modalWindow.addEventListener('click', this._hoc);
  }

  close() {
    this._modalWindow.classList.remove('modal_opened');

    document.removeEventListener('keyup', this._hec);
    this._modalWindow.removeEventListener('click', this._hoc);
  }

  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayCLose (evt) {
    if (evt.target.classList.contains('modal')) {
      this.close();
    }
  }

  setEventListeners() {
    const modalCloseButton = this._modalWindow.querySelector('.modal__close-button');

    modalCloseButton.addEventListener('click', () => {
      this.close();
    });
  }
}
