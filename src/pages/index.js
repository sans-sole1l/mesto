import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
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
  sectionElements
} from '../scripts/utils/constants.js';

import './index.css';
import { Popup } from '../scripts/components/Popup.js';


// запрос дефолтных карточек с сервера

const cardsApi = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-15/cards',
  headers: {
    authorization: '06e1dc17-91d9-4de2-856b-fec4fd742305',
    'Content-type': 'application/json'
  }
})


// добавление карточек по умолчанию

const imagePopup = new PopupWithImage('.modal_type_photo');

function ImageModalCallback(data) {
  imagePopup.setEventListeners();
  imagePopup.open(data);
}

cardsApi.get()
  .then(data => {
    const cardList = new Section ({ items: data, renderer: cardRenderer }, sectionElements);

    cardList.renderItems();

    // отрисовка карточки

    function cardRenderer(data) {
      const card = new Card(data, '#card-template', ImageModalCallback, cardLikeCallback, cardDelCallback, 'f17b75a254db7b6356454cca');
      const cardElement = card.generateCard();

      cardList.addItem(cardElement);
    }
  })
  .catch(err => {
    console.log(err);
  })


// Создание новой карточки

const addCardPopup = new PopupWithForm(
  '.modal_type_add-card',
  (formData) => {
    cardsApi.postCard(formData)
      .then(formData => {
        const newCard = new Section ({ items: [formData], renderer: cardPreRenderer }, sectionElements);

        addCardPopup.close();

        newCard.renderItems();

        // отрисовка карточки в начало списка

        function cardPreRenderer(data) {
          const card = new Card(data, '#card-template', ImageModalCallback, cardLikeCallback, cardDelCallback, 'f17b75a254db7b6356454cca');
          const cardElement = card.generateCard();

          newCard.addPreItem(cardElement);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
);


// коллбэк лайка для класса Card

function cardLikeCallback(cardId, userId) {
  // запрос записи пользователя в массив likes

  const cardLikesApi = new Api({
    url: `https://mesto.nomoreparties.co/v1/cohort-15/cards/likes/${cardId}`,
    headers: {
      authorization: '06e1dc17-91d9-4de2-856b-fec4fd742305',
      'Content-type': 'application/json'
    }
  })

  cardsApi.get()
    .then(cardsArray => {
      const currentCard = cardsArray.find(cardObj => cardObj._id === cardId);

      if (currentCard.likes.some(userObj => userObj._id === userId)) {
        cardLikesApi.dislikeCard()
        .then(result => {
          return result;
        })
        .catch(err => {
          console.log(err);
        })
      } else {
        cardLikesApi.likeCard()
        .then(result => {
          return result;
        })
        .catch(err => {
          console.log(err);
        })
      }
    })
    .catch(err => {
      console.log(err);
    })
}

// коллбэк удаления карточки для класса Card

function cardDelCallback(cardId, cardShell) {
  const deleteModal = new Popup('.modal_type_del-card', deleteCard, cardId, cardShell);
  deleteModal.setEventListeners();
  deleteModal.setConfirmListener();
  deleteModal.open();

  function deleteCard(cardId) {
    const deleteCardApi = new Api({
      url: `https://mesto.nomoreparties.co/v1/cohort-15/cards/${cardId}`,
      headers: {
        authorization: '06e1dc17-91d9-4de2-856b-fec4fd742305',
        'Content-type': 'application/json'
      }
    })

    deleteCardApi.delCard()
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      })
  }
}


// запрос данных пользователя с сервера

const userApi = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-15/users/me',
  headers: {
    authorization: '06e1dc17-91d9-4de2-856b-fec4fd742305',
    'Content-type': 'application/json'
  }
})

userApi.get()
  .then(userData => {
    userInfo.setDefaultUserInfo(userData);
  })
  .catch(err => {
    console.log(err);
  })


// редактирование профиля

const userInfo = new UserInfo({
  profileName: '.profile__name',
  profileCharacter: '.profile__character',
  profileAvatar: '.profile__avatar'
});

const profilePopup = new PopupWithForm(
  '.modal_type_edit-profile',
  (formData) => {
    userApi.saveUserInfo(formData)
      .then(resData => {
        userInfo.setUserInfo(resData);

        profilePopup.close();
      })
      .catch(err => {
        console.log(err);
      })
  }
);

// запрос редактирования аватара

const avatarApi = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-15/users/me/avatar',
  headers: {
    authorization: '06e1dc17-91d9-4de2-856b-fec4fd742305',
    'Content-type': 'application/json'
  }
})

// редактирование аватара

const avatarPopup = new PopupWithForm(
  '.modal_type_edit-avatar',
  (formData) => {
    avatarApi.saveAvatar(formData)
      .then(resData => {
        userInfo.setUserAvatar(resData);

        avatarPopup.close();
      })
      .catch(err => {
        console.log(err);
      })
  }
);


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
    userInfo.setModalUserInfo(userInfo.getUserInfo());
  }

  editFormValidator.openModalValidation();
});


openAddCardModalButton.addEventListener('click', () => {
  addCardPopup.setEventListeners();
  addCardPopup.open();

  cardFormValidator.openModalValidation();
  cardFormValidator.hideError();
});


