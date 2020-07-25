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

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const sectionElements = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');


// функция добавления карточек по умолчанию

initialCards.forEach(function (item) {
  createCard(item);
})

// функция скрытой отрисовки карточки

function renderCard (item) {
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
    toggleModal(photoModal);
    modalImage.src = evt.target.src;
    modalPhotoTitle.textContent = evt.target.nextElementSibling.firstElementChild.textContent;
  });

  return cardElement;
}

// функция добавления карточки

function createCard (item) {
  sectionElements.append(renderCard(item));
}

// функция добавления карточки в начало списка

function createPrependCard (item) {
  sectionElements.prepend(renderCard(item));
}

// функция открытия/закрытия модалки

function toggleModal (modalWindow) {
  modalWindow.classList.toggle('modal_opened');
}

// функция кнопки "Сохранить" в профиле

function editFormSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileCharacter.textContent = characterInput.value;

  toggleModal(editProfileModal);
}

// функция кнопки "Создать" для добавления новой карточки

function addCardFormSubmitHandler (evt) {
  evt.preventDefault();

  createPrependCard({name: placeInput.value, link: linkInput.value});

  toggleModal(addCardModal);
}


openEditProfileModalButton.addEventListener('click', () => {
  toggleModal(editProfileModal);

  if (editProfileModal.classList.contains('modal_opened')) {
    nameInput.value = profileName.textContent;
    characterInput.value = profileCharacter.textContent;
  }
});

closeEditProfileModalButton.addEventListener('click', () => {
  toggleModal(editProfileModal);
});

openAddCardModalButton.addEventListener('click', () => {
  toggleModal(addCardModal);
});

closeAddCardModalButton.addEventListener('click', () => {
  toggleModal(addCardModal);
});

closePhotoModalButton.addEventListener('click', () => {
  toggleModal(photoModal);
});

editForm.addEventListener('submit', editFormSubmitHandler);

addCardForm.addEventListener('submit', addCardFormSubmitHandler);


