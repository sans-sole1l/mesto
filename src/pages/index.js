import {initialCards} from '../scripts/utils/data.js';
import {Card} from '../scripts/components/Card.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import {Section} from '../scripts/components/Section.js';
import {PopupWithImage} from '../scripts/components/PopupWithImage.js';
import {PopupWithForm} from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import {
  validationObj,
  openEditProfileModalButton,
  openAddCardModalButton,
  editProfileModal,
  sectionElements
} from '../scripts/utils/constants.js';

import './index.css';


// функция добавления карточек по умолчанию

const cardList = new Section ({ items: initialCards, renderer: cardRenderer }, sectionElements);

cardList.renderItems();

const imagePopup = new PopupWithImage('.modal_type_photo');

// отрисовка карточки

function cardRenderer(data) {
  const card = new Card(data, '#card-template', (data) => {
    imagePopup.setEventListeners();
    imagePopup.open(data);
  });
  const cardElement = card.generateCard();

  cardList.addItem(cardElement);
}

// отрисовка карточки в начало списка

function cardPreRenderer(data) {
  const card = new Card(data, '#card-template', (data) => {
    imagePopup.setEventListeners();
    imagePopup.open(data);
  });
  const cardElement = card.generateCard();

  cardList.addPreItem(cardElement);
}

// функции добавления класса и запуска валидации

const editFormValidator = new FormValidator(validationObj, '.modal__form_type_profile');
const cardFormValidator = new FormValidator(validationObj, '.modal__form_type_addcard');

editFormValidator.enableValidation();
cardFormValidator.enableValidation();


// Создание новой карточки

const addCardPopup = new PopupWithForm(
  '.modal_type_add-card',
  (formData) => {
    const newCard = new Section ({ items: formData, renderer: cardPreRenderer }, sectionElements);

    addCardPopup.close();

    newCard.renderItems();
  }
);

// редактирование профиля

const profilePopup = new PopupWithForm(
  '.modal_type_edit-profile',
  (formData) => {
    userInfo.setUserInfo(formData);
  }
);

const userInfo = new UserInfo({ profileName: '.profile__name', profileCharacter: '.profile__character' });



// Обработчики событий

openEditProfileModalButton.addEventListener('click', () => {
  profilePopup.setEventListeners();
  profilePopup.open();

  if (editProfileModal.classList.contains('modal_opened')) {
    userInfo.autoSetUserInfo(userInfo.getUserInfo());
  }

  editFormValidator.openModalValidation();
});


openAddCardModalButton.addEventListener('click', () => {
  addCardPopup.setEventListeners();
  addCardPopup.open();

  cardFormValidator.openModalValidation();
  cardFormValidator.hideError();
});


