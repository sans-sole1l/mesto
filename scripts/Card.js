
export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector('.card__image');

    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    const cardLikeButton = this._element.querySelector('.card__like-button');
    const cardDeleteButton = this._element.querySelector('.card__delete-button');
    const cardImage = this._element.querySelector('.card__image');
    const cardTitle = this._element.querySelector('.card__title');
    const photoModal = document.querySelector('.modal_type_photo');
    const modalImage = photoModal.querySelector('.modal__image');
    const modalPhotoTitle = photoModal.querySelector('.modal__title_type_photo');

    // функциональность кнопки "лайк"
    cardLikeButton.addEventListener('click', () => {
      cardLikeButton.classList.toggle('card__like-button_status_active');
    });

    // функциональность кнопки "удалить"
    cardDeleteButton.addEventListener('click', (evt) => {
      evt.target.closest('.card').remove();
    });

    // открытие модалки фотографии
    cardImage.addEventListener('click', (evt) => {
      this._openModal(photoModal);
      modalImage.src = evt.target.src;
      modalPhotoTitle.textContent = cardTitle.textContent;
    });
  }

  _openModal (modalWindow) {
    modalWindow.classList.add('modal_opened');

    document.addEventListener('keyup', this._enableEscToggleModal);
    modalWindow.addEventListener('click', this._enableOverlayToggleModal);
  }

  _closeModal (modalWindow) {
    modalWindow.classList.remove('modal_opened');

    document.removeEventListener('keyup', this._enableEscToggleModal);
    modalWindow.removeEventListener('click', this._enableOverlayToggleModal);
  }

  _enableEscToggleModal = (evt) => {
    if (evt.key === 'Escape') {
      const openedModal = document.querySelector('.modal_opened');

      this._closeModal(openedModal);
    }
  }

  _enableOverlayToggleModal = (evt) => {
    if (evt.target.classList.contains('modal')) {
      const openedModal = document.querySelector('.modal_opened');

      this._closeModal(openedModal);
    }
  }
}
