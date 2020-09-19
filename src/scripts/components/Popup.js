export class Popup {
  constructor(modalSelector, confirmCallback, cardId, cardShell) {
    this._modalWindow = document.querySelector(modalSelector);

    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayCLose = this._handleOverlayCLose.bind(this);

    this._confirmCallback = confirmCallback;
    this._cardId = cardId;
    this._cardShell = cardShell;
    this._confirmButton = this._modalWindow.querySelector('.modal__confirm-button');
  }

  open() {
    this._modalWindow.classList.add('modal_opened');

    document.addEventListener('keyup', this._handleEscClose);
    this._modalWindow.addEventListener('click', this._handleOverlayCLose);
  }

  close() {
    this._modalWindow.classList.remove('modal_opened');

    document.removeEventListener('keyup', this._handleEscClose);
    this._modalWindow.removeEventListener('click', this._handleOverlayCLose);
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

  setConfirmListener() {
    const modalConfirmButton = this._modalWindow.querySelector('.modal__confirm-button');

    modalConfirmButton.addEventListener('click', () => {
      this._confirmCallback(this._cardId);
    });
  }

  removeCard() {
    this._cardShell.remove();
  }
}
