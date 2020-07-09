const openModalButton = document.querySelector('.profile__edit-button');
const closeModalButton = document.querySelector('.modal__close-button');
const modal = document.querySelector('.modal');

let nameInput = modal.querySelector('.modal__input_type_name');
let characterInput = modal.querySelector('.modal__input_type_character');
let profileName = document.querySelector('.profile__name');
let profileCharacter = document.querySelector('.profile__character');

const formElement = modal.querySelector('.modal__form');

// функция открытия/закрытия модалки

function toggleModal () {
  modal.classList.toggle('modal_opened');

  if (modal.classList.contains('modal_opened')) {
    nameInput.value = profileName.textContent;
    characterInput.value = profileCharacter.textContent;
    // console.log(nameInput.value);
    // console.log(modal.classList);
  // } else {
  //   console.log('!');
  //   console.log(modal.classList);
  };
};

// функция кнопки "Сохранить"

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileCharacter.textContent = characterInput.value;

  toggleModal();
};

openModalButton.addEventListener('click', toggleModal);

closeModalButton.addEventListener('click', toggleModal);

formElement.addEventListener('submit', formSubmitHandler);
