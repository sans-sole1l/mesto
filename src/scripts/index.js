import {initialCards} from './utils/data.js';
import {Card} from './components/Card.js';
import {FormValidator} from './components/FormValidator.js';
import {Section} from './components/Section.js';
import {PopupWithImage} from './components/PopupWithImage.js';
import {PopupWithForm} from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';
import {
  validationObj,
  openEditProfileModalButton,
  openAddCardModalButton,
  editProfileModal,
  sectionElements
} from './utils/constants.js';

import '../styles/index.css';


// функция добавления карточек по умолчанию

const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#card-template', (data) => {
      const photoPopup = new PopupWithImage('.modal_type_photo', data);
      photoPopup.setEventListeners();
      photoPopup.open();
    });
    const cardElement = card.generateCard();

    cardList.addItem(cardElement);
  },
}, sectionElements);

cardList.renderItems();


// функции добавления класса и запуска валидации

const editFormValidator = new FormValidator(validationObj, '.modal__form_type_profile');
const cardFormValidator = new FormValidator(validationObj, '.modal__form_type_addcard');

editFormValidator.enableValidation();
cardFormValidator.enableValidation();


// Создание новой карточки

const AddCardPopup = new PopupWithForm(
  '.modal_type_add-card',
  (formData) => {
    const newCard = new Section ({
      items: formData,
      renderer: (item) => {
        const card = new Card(
          item,
          '#card-template',
          (data) => {
            const photoPopup = new PopupWithImage('.modal_type_photo', data);
            photoPopup.setEventListeners();
            photoPopup.open();
          }
        );
        const cardElement = card.generateCard();

        newCard.addPreItem(cardElement);
      },
    },
    sectionElements);

    newCard.renderItems();
  }
);

// редактирование профиля

const ProfilePopup = new PopupWithForm(
  '.modal_type_edit-profile',
  (formData) => {
    userInfo.setUserInfo(formData);
  }
);

const userInfo = new UserInfo({ profileName: '.profile__name', profileCharacter: '.profile__character' });



// Обработчики событий

openEditProfileModalButton.addEventListener('click', () => {
  ProfilePopup.setEventListeners();
  ProfilePopup.open();

  if (editProfileModal.classList.contains('modal_opened')) {
    userInfo.autoSetUserInfo(userInfo.getUserInfo());
  }

  editFormValidator.openModalValidation();
});


openAddCardModalButton.addEventListener('click', () => {
  AddCardPopup.setEventListeners();
  AddCardPopup.open();

  cardFormValidator.openModalValidation();
  cardFormValidator.hideError();
});


