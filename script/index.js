let editButton = document.querySelector('.profile__button_type_edit');
let popupCloseButton = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let popupNameInput = document.querySelector('#name');
popupNameInput.value = profileName.textContent;
let popupDescriptionInput = document.querySelector('#description');
popupDescriptionInput.value = profileDescription.textContent;


function popup() {
  let popup = document.querySelector('.popup');
  popup.classList.toggle('popup_opened');
}

let formElement = document.querySelector('.popup__form');
function handleFormSubmit(evt) {
  evt.preventDefault();
  let name = popupNameInput.value;
  let description = popupDescriptionInput.value;
  profileName.textContent = name;
  profileDescription.textContent = description;
  popup();
}
formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', popup);
popupCloseButton.addEventListener('click', popup);
