import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { Popup } from '../scripts/components/Popup.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Api } from '../scripts/components/Api.js';
import {
  validationObj,
  openEditProfileModalButton,
  openAddCardModalButton,
  avatarOpenModalButton,
  editProfileModal,
  sectionElements,
  nameInput,
  characterInput
} from '../scripts/utils/constants.js';

import './index.css';


// класс запросов к API

const apiRequest = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-15',
  token: '06e1dc17-91d9-4de2-856b-fec4fd742305'
})

// загрузка дефолтных карточек и данных пользователя

Promise.all([apiRequest.getUserInfo(), apiRequest.getInitialCards()])
.then(([user, cards]) => {
  userInfo.setDefaultUserInfo(user);
  initialCardsRenderer(cards, user._id);
})
.catch(err => {
  console.log(err);
  openErrorModal(err);
})

function initialCardsRenderer(data, userId) {
  const cardList = new Section ({ items: data, renderer: cardRenderer }, sectionElements);
  cardList.renderItems();

  // отрисовка карточки
  function cardRenderer(data) {
    const cardElement = createCard(data, userId);
    cardList.addItem(cardElement);
  }
}

function createCard (data, userId) {
  const card = new Card(data, '#card-template', ImageModalCallback, cardLikeCallback, cardDelCallback, userId);
  return card.generateCard();
}

const imagePopup = new PopupWithImage('.modal_type_photo');

function ImageModalCallback(data) {
  imagePopup.setEventListeners();
  imagePopup.open(data);
}

// Создание новой карточки

const addCardPopup = new PopupWithForm('.modal_type_add-card', cardSubmitCallback);

function cardSubmitCallback(formData) {
  apiRequest.postCard(formData)
  .then(card => {
    newCardRenderer(card, card.owner._id);
  })
  .catch(err => {
    console.log(err);
    openErrorModal(err);
  })
  .finally(() => {
    addCardPopup.close();
  })
}

function newCardRenderer(formData, userId) {
  const newCard = new Section ({ items: [formData], renderer: cardPreRenderer }, sectionElements);
  newCard.renderItems();

  // отрисовка карточки в начало списка
  function cardPreRenderer(data) {
    const cardElement = createCard(data, userId);
    newCard.addPreItem(cardElement);
  }
}


// коллбэк лайка для класса Card

function cardLikeCallback(cardId, userId, likeBtn, likeCounter, likes) {
  if (likes.some(userObj => userObj._id === userId)) {
    apiRequest.dislikeCard(cardId)
    .then(result => {
      likeBtn.classList.remove('card__like-button_status_active');
      const index = likes.findIndex(item => item._id === userId);
      likes.splice(index, 1);
      likeCounter.textContent = likes.length;
      console.log(result);
    })
    .catch(err => {
      console.log(err);
      openErrorModal(err);
    })
  } else {
    apiRequest.likeCard(cardId)
    .then(result => {
      likeBtn.classList.add('card__like-button_status_active');
      likes.push({_id: userId});
      likeCounter.textContent = likes.length;
      console.log(result);
    })
    .catch(err => {
      console.log(err);
      openErrorModal(err);
    })
  }
}


// коллбэк удаления карточки для класса Card

function cardDelCallback(cardId, cardShell) {
  const deleteModal = new Popup('.modal_type_del-card', deleteCard, cardId, cardShell);
  deleteModal.setEventListeners();
  deleteModal.setConfirmListener();
  deleteModal.open();

  function deleteCard() {
    apiRequest.delCard(cardId)
    .then(result => {
      deleteModal.removeCard();
      return result;
    })
    .catch(err => {
      console.log(err);
      openErrorModal(err);
    })
    .finally(() => {
      deleteModal.close()
    })
  }
}

// открытие модалки с ошибкой

function openErrorModal(errText) {
  const errorModal = new Popup('.modal_type_error');
  errorModal.setEventListeners();
  errorModal.open();
  document.querySelector('.modal__title_type_error').textContent = `Что-то пошло не так... ${errText}`;
}

// редактирование профиля

const userInfo = new UserInfo({
  profileName: '.profile__name',
  profileCharacter: '.profile__character',
  profileAvatar: '.profile__avatar'
});

const profilePopup = new PopupWithForm('.modal_type_edit-profile', profileSubmitCallback);

function profileSubmitCallback(formData) {
  apiRequest.saveUserInfo(formData)
  .then(resData => {
    userInfo.setUserInfo(resData);
  })
  .catch(err => {
    console.log(err);
    openErrorModal(err);
  })
  .finally(() => {
    profilePopup.close();
  })
}

// редактирование аватара

const avatarPopup = new PopupWithForm('.modal_type_edit-avatar', avatarSubmitCallback);

function avatarSubmitCallback(formData) {
  apiRequest.saveAvatar(formData)
  .then(resData => {
    userInfo.setUserAvatar(resData);
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    avatarPopup.close();
  })
}


// функции добавления класса и запуска валидации

const editFormValidator = new FormValidator(validationObj, '.modal__form_type_profile');
const cardFormValidator = new FormValidator(validationObj, '.modal__form_type_addcard');
const avatarFormValidator = new FormValidator(validationObj, '.modal__form_type_avatar');

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();


// Обработчики событий

avatarOpenModalButton.addEventListener('click', () => {
  avatarPopup.setEventListeners();
  avatarPopup.open();

  avatarFormValidator.openModalValidation();
  avatarFormValidator.hideError();
});

openEditProfileModalButton.addEventListener('click', () => {
  profilePopup.setEventListeners();
  profilePopup.open();

  if (editProfileModal.classList.contains('modal_opened')) {
    userInfo.setModalUserInfo(userInfo.getUserInfo(), nameInput, characterInput);
  }

  editFormValidator.openModalValidation();
});

openAddCardModalButton.addEventListener('click', () => {
  addCardPopup.setEventListeners();
  addCardPopup.open();

  cardFormValidator.openModalValidation();
  cardFormValidator.hideError();
});


