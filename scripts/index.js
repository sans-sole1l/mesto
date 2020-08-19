import {initialCards} from './data.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const openEditProfileModalButton = document.querySelector('.profile__edit-button');
const openAddCardModalButton = document.querySelector('.profile__add-button');

const editProfileModal = document.querySelector('.modal_type_edit-profile');
const addCardModal = document.querySelector('.modal_type_add-card');
const photoModal = document.querySelector('.modal_type_photo');

const closeEditProfileModalButton = editProfileModal.querySelector('.modal__close-button');
const closeAddCardModalButton = addCardModal.querySelector('.modal__close-button');
const closePhotoModalButton = photoModal.querySelector('.modal__close-button');

const nameInput = editProfileModal.querySelector('.modal__input_type_name');
const characterInput = editProfileModal.querySelector('.modal__input_type_character');
const profileName = document.querySelector('.profile__name');
const profileCharacter = document.querySelector('.profile__character');

const placeInput = addCardModal.querySelector('.modal__input_type_place');
const linkInput = addCardModal.querySelector('.modal__input_type_link');

const editForm = editProfileModal.querySelector('.modal__form');
const addCardForm = addCardModal.querySelector('.modal__form');

const sectionElements = document.querySelector('.elements');

const modalList = Array.from(document.querySelectorAll('.modal'));

const formList = Array.from(document.querySelectorAll('.modal__form'));

const validationObj = {
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__save-button',
  inactiveButtonClass: 'modal__save-button_inactive',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__input-error_active'
};


// функция добавления карточек по умолчанию

initialCards.forEach((item) => {
  const card = new Card(item);
  const cardElement = card.generateCard();

  sectionElements.append(cardElement);
});

// функция добавления класса и запуска валидации

formList.forEach((form) => {
  if (form.classList.contains('modal__form_type_profile')) {
    const formValidator = new FormValidator(validationObj, '.modal__form_type_profile');
    formValidator.enableValidation();
  } else {
    const formValidator = new FormValidator(validationObj, '.modal__form_type_addcard');
    formValidator.enableValidation();
  }
});

// функция открытия модалки

function openModal (modalWindow) {
  modalWindow.classList.add('modal_opened');

  document.addEventListener('keyup', enableEscToggleModal);
  modalWindow.addEventListener('click', enableOverlayToggleModal);
}

// функция закрытия модалки

function closeModal (modalWindow) {
  modalWindow.classList.remove('modal_opened');

  document.removeEventListener('keyup', enableEscToggleModal);
  modalWindow.removeEventListener('click', enableOverlayToggleModal);
}

// Функция закрытия модалок нажатием "Esc"

const enableEscToggleModal = (evt) => {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.modal_opened');

    closeModal(openedModal);
  }
}

// Функция закрытия модалок кликом на оверлэй

const enableOverlayToggleModal = (evt) => {
  if (evt.target.classList.contains('modal')) {
    const openedModal = document.querySelector('.modal_opened');

    closeModal(openedModal);
  }
}

// функция кнопки "Сохранить" в профиле

function editFormSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileCharacter.textContent = characterInput.value;

  closeModal(editProfileModal);
}

// функция кнопки "Создать" для добавления новой карточки

function addCardFormSubmitHandler (evt) {
  evt.preventDefault();

  const card = new Card({name: placeInput.value, link: linkInput.value});
  const cardElement = card.generateCard();
  renderPrependCard(cardElement);

  closeModal(addCardModal);
  addCardForm.reset();
}

// функция добавления карточки в начало списка

function renderPrependCard (cardElement) {
  sectionElements.prepend(cardElement);
}


// Обработчики событий

openEditProfileModalButton.addEventListener('click', () => {
  openModal(editProfileModal);

  if (editProfileModal.classList.contains('modal_opened')) {
    nameInput.value = profileName.textContent;
    characterInput.value = profileCharacter.textContent;
  }

  const formValidator = new FormValidator(validationObj, '.modal__form_type_profile');
  formValidator.openModalValidation();
});

closeEditProfileModalButton.addEventListener('click', () => {
  closeModal(editProfileModal);
});

openAddCardModalButton.addEventListener('click', () => {
  openModal(addCardModal);
  addCardForm.reset();

  const formValidator = new FormValidator(validationObj, '.modal__form_type_addcard');
  formValidator.openModalValidation();
});

closeAddCardModalButton.addEventListener('click', () => {
  closeModal(addCardModal);
});

closePhotoModalButton.addEventListener('click', () => {
  closeModal(photoModal);
});

editForm.addEventListener('submit', (evt) => {
  editFormSubmitHandler(evt);
});

addCardForm.addEventListener('submit', (evt) => {
  addCardFormSubmitHandler(evt);
});
