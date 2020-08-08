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

const modalImage = photoModal.querySelector('.modal__image');
const modalPhotoTitle = photoModal.querySelector('.modal__title_type_photo');

const editForm = editProfileModal.querySelector('.modal__form');
const addCardForm = addCardModal.querySelector('.modal__form');

const sectionElements = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

const modalList = Array.from(document.querySelectorAll('.modal'));





// функция добавления карточек по умолчанию

initialCards.forEach(function (item) {
  renderCard(item);
})

// функция скрытой отрисовки карточки

function createCard (item) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

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
    openModal(photoModal);
    modalImage.src = evt.target.src;
    modalPhotoTitle.textContent = cardTitle.textContent;
  });

  return cardElement;
}

// функция добавления карточки

function renderCard (item) {
  sectionElements.append(createCard(item));
}

// функция добавления карточки в начало списка

function renderPrependCard (item) {
  sectionElements.prepend(createCard(item));
}

// функция открытия/закрытия модалки

function openModal (modalWindow) {
  modalWindow.classList.add('modal_opened');

  document.addEventListener('keyup', enableEscToggleModal);
  modalWindow.addEventListener('click', enableOverlayToggleModal);
}

function closeModal (modalWindow) {
  modalWindow.classList.remove('modal_opened');

  document.removeEventListener('keyup', enableEscToggleModal);
  modalWindow.removeEventListener('click', enableOverlayToggleModal);
}

// function toggleModal (modalWindow) {
//   modalWindow.classList.toggle('modal_opened');

//   if (modalWindow.classList.contains('modal_opened')) {
//     document.addEventListener('keyup', enableEscToggleModal);
//     modalWindow.addEventListener('click', enableOverlayToggleModal);
//   } else {
//     document.removeEventListener('keyup', enableEscToggleModal);
//     modalWindow.removeEventListener('click', enableOverlayToggleModal);
//   }
// }

// Функция закрытия модалок нажатием "Esc"

const enableEscToggleModal = (evt) => {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.modal_opened');
    // toggleModal(openedModal);

    closeModal(openedModal);
  }
}

// Функция закрытия модалок кликом на оверлэй

const enableOverlayToggleModal = (evt) => {
  if (evt.target.classList.contains('modal')) {
    const openedModal = document.querySelector('.modal_opened');
    // toggleModal(openedModal);

    closeModal(openedModal);
  }
}

// функция кнопки "Сохранить" в профиле

function editFormSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileCharacter.textContent = characterInput.value;

  // toggleModal(editProfileModal);

  closeModal(editProfileModal);
}

// функция кнопки "Создать" для добавления новой карточки

function addCardFormSubmitHandler (evt) {
  evt.preventDefault();

  renderPrependCard({name: placeInput.value, link: linkInput.value});

  closeModal(addCardModal);
  addCardForm.reset();
}


// Обработчики событий

openEditProfileModalButton.addEventListener('click', () => {
  openModal(editProfileModal);

  if (editProfileModal.classList.contains('modal_opened')) {
    nameInput.value = profileName.textContent;
    characterInput.value = profileCharacter.textContent;
  }

  openModalValidation(editProfileModal, openModalValidationObj);
});

closeEditProfileModalButton.addEventListener('click', () => {
  closeModal(editProfileModal);
});

openAddCardModalButton.addEventListener('click', () => {
  openModal(addCardModal);
  addCardForm.reset();

  openModalValidation(addCardModal, openModalValidationObj);
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
