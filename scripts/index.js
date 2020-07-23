const openEditProfileModalButton = document.querySelector('.profile__edit-button');
const openAddCardModalButton = document.querySelector('.profile__add-button');

const editProfileModal = document.querySelector('.modal_type_edit-profile');
const addCardModal = document.querySelector('.modal_type_add-card');
const photoModal = document.querySelector('.modal_type_photo');

const closeEditProfileModalButton = editProfileModal.querySelector('.modal__close-button');
const closeAddCardModalButton = addCardModal.querySelector('.modal__close-button');
const closePhotoModalButton = photoModal.querySelector('.modal__close-button');

let nameInput = editProfileModal.querySelector('.modal__input_type_name');
let characterInput = editProfileModal.querySelector('.modal__input_type_character');
let profileName = document.querySelector('.profile__name');
let profileCharacter = document.querySelector('.profile__character');

let placeInput = addCardModal.querySelector('.modal__input_type_place');
let linkInput = addCardModal.querySelector('.modal__input_type_link');

let modalImage = photoModal.querySelector('.modal__image');
let modalPhotoTitle = photoModal.querySelector('.modal__title_type_photo');

const editForm = editProfileModal.querySelector('.modal__form');
const addCardForm = addCardModal.querySelector('.modal__form');

const cardTemplate = document.querySelector('#card-template').content;
const sectionElements = document.querySelector('.elements');

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


// функция создания карточек по умолчанию

initialCards.forEach(function (item) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.elements__image').src = item.link;
  cardElement.querySelector('.elements__image').alt = item.name;
  cardElement.querySelector('.elements__title').textContent = item.name;

  const cardLikeButton = cardElement.querySelector('.elements__like-button');
  const cardDeleteButton = cardElement.querySelector('.elements__delete-button');
  const openPhotoModalButton = cardElement.querySelector('.elements__image');

  // функциональность кнопки "лайк"
  cardLikeButton.addEventListener('click', () => {
    cardLikeButton.classList.toggle('elements__like-button_status_active');
  });
  // функциональность кнопки "удалить"
  cardDeleteButton.addEventListener('click', (evt) => {
    evt.target.closest('.elements__card').remove();
  });
  // открытие модалки фотографии
  openPhotoModalButton.addEventListener('click', (evt) => {
    toggleModal(photoModal);
    modalImage.src = evt.target.src;
    modalPhotoTitle.textContent = evt.target.nextElementSibling.firstElementChild.textContent;
  });

  sectionElements.append(cardElement);
});

// функция открытия/закрытия модалки

function toggleModal (modalWindow) {
  modalWindow.classList.toggle('modal_opened');

  if (modalWindow.classList.contains('modal_opened')) {
    nameInput.value = profileName.textContent;
    characterInput.value = profileCharacter.textContent;
  };
};

// функция кнопки "Сохранить" в профиле

function editFormSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileCharacter.textContent = characterInput.value;

  toggleModal(editProfileModal);
};

// функция добавления новой карточки

function addCardFormSubmitHandler (evt) {
  evt.preventDefault();

  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.elements__image').src = linkInput.value;
  cardElement.querySelector('.elements__image').alt = placeInput.value;
  cardElement.querySelector('.elements__title').textContent = placeInput.value;

  const cardLikeButton = cardElement.querySelector('.elements__like-button');
  const cardDeleteButton = cardElement.querySelector('.elements__delete-button');
  const openPhotoModalButton = cardElement.querySelector('.elements__image');

  // функциональность кнопки "лайк"
  cardLikeButton.addEventListener('click', () => {
    cardLikeButton.classList.toggle('elements__like-button_status_active');
  });
  // функциональность кнопки "удалить"
  cardDeleteButton.addEventListener('click', (evt) => {
    evt.target.closest('.elements__card').remove();
  });
  // открытие модалки фотографии
  openPhotoModalButton.addEventListener('click', (evt) => {
    toggleModal(photoModal);
    modalImage.src = evt.target.src;
    modalPhotoTitle.textContent = evt.target.nextElementSibling.firstElementChild.textContent;
  });

  sectionElements.prepend(cardElement);

  toggleModal(addCardModal);
};


openEditProfileModalButton.addEventListener('click', () => {
  toggleModal(editProfileModal);
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

