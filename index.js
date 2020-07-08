const openModalButton = document.querySelector('.profile__edit-button');
const closeModalButton = document.querySelector('.modal__close-button');
const modal = document.querySelector('.modal');

function toggleModal () {
  modal.classList.toggle('modal_opened');
};

openModalButton.addEventListener('click', toggleModal);

closeModalButton.addEventListener('click', toggleModal);


const formElement = modal.querySelector('.modal__form');

function formSubmitHandler (evt) {
  evt.preventDefault();

  let nameInput = modal.querySelector('.modal__input_type_name');
  let characterInput = modal.querySelector('.modal__input_type_character');
  let nameOutput = document.querySelector('.profile__name');
  let characterOutput = document.querySelector('.profile__character');

  nameOutput.textContent = nameInput.value;
  characterOutput.textContent = characterInput.value;

  toggleModal();
};

formElement.addEventListener('submit', formSubmitHandler);
