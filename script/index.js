let editButton = document.querySelector('.profile__button_type_edit');
let popupCloseButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let popupNameInput = document.querySelector('#name');
let popupDescriptionInput = document.querySelector('#description');
let formElement = document.querySelector('.popup__form');

function popupOpen() {
  popup.classList.add('popup_opened');
  popupNameInput.value = profileName.textContent;
  popupDescriptionInput.value = profileDescription.textContent;
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupNameInput.value;
  profileDescription.textContent = popupDescriptionInput.value;
  popupClose();
}

formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
