
export class Card {
  constructor(data, cardSelector, handleCardClick, handleLikeClick, handleDeleteClick, userId) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._owner = data.owner;
    this._data = data;
    this._userId = userId;
    this._cardSelector = cardSelector;

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
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

    if (this._owner._id !== this._userId) {
      this._element.querySelector('.card__delete-button').remove();
    }

    if (this._likes.some(user => user._id === this._userId)) {
      this._element.querySelector('.card__like-button').classList.add('card__like-button_status_active');
    }

    const cardImage = this._element.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    this._countLikes();

    return this._element;
  }

  _setEventListeners() {
    const cardLikeButton = this._element.querySelector('.card__like-button');
    const cardDeleteButton = this._element.querySelector('.card__delete-button');
    const cardImage = this._element.querySelector('.card__image');
    const likeCounter = this._element.querySelector('.card__like-counter');

    // функциональность кнопки "лайк"
    cardLikeButton.addEventListener('click', () => {
      this._likeCallback();

      if (cardLikeButton.classList.contains('card__like-button_status_active')) {
        cardLikeButton.classList.remove('card__like-button_status_active');
        likeCounter.textContent = (this._likesCounter);
      } else {
        cardLikeButton.classList.add('card__like-button_status_active');
        likeCounter.textContent = (this._likesCounter + 1);
      }
    });

    // функциональность кнопки "удалить"
    cardDeleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this._id, this._element);
    });

    // открытие модалки фотографии
    cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
  }

  _likeCallback() {
    this._handleLikeClick(this._id, this._userId)
  }

  _countLikes() {
    this._likesCounter = null;
    this._likes.forEach(() => {
      this._likesCounter += 1;
    });

    this._element.querySelector('.card__like-counter').textContent = this._likesCounter;
  }
}
