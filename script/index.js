import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards, validationConfig} from './constants.js';
const editButton = document.querySelector('.profile__button_type_edit');
const addButton = document.querySelector('.profile__button_type_add');

const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
export const imagePopup = document.querySelector('.popup_type_image');
const popups = document.querySelectorAll('.popup');

export const fullImage = imagePopup.querySelector('.popup__image');
export const fullImageDescription = imagePopup.querySelector('.popup__image-description');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupNameInput = editPopup.querySelector('#name');
const popupDescriptionInput = editPopup.querySelector('#description');

const addPopupTitleInput = addPopup.querySelector('#title');
const addPopupLinkInput = addPopup.querySelector('#link');

const editForm = document.forms['popup_edit-form'];
const addForm = document.forms['popup_add-form'];

const elementsList = document.querySelector('.elements');

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keydownPopupHandler);
}

const keydownPopupHandler = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keydownPopupHandler);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupNameInput.value;
  profileDescription.textContent = popupDescriptionInput.value;
  closePopup(editPopup);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard({
    name: addPopupTitleInput.value,
    link: addPopupLinkInput.value
  }, handleOpenPopup, '.elements-template');
  const card = newCard.generateCard();
  elementsList.prepend(card);
  evt.target.reset();
  validators[addForm.getAttribute('name')].resetValidationState();
  closePopup(addPopup);
}

editForm.addEventListener('submit', handleProfileFormSubmit);
addForm.addEventListener('submit', handleAddFormSubmit);
editButton.addEventListener('click', () => {
  popupNameInput.value = profileName.textContent;
  popupDescriptionInput.value = profileDescription.textContent;
  openPopup(editPopup);
});
addButton.addEventListener('click', () => openPopup(addPopup));
initialCards.forEach((item) => {
  const card = new Card(item, handleOpenPopup, '.elements-template');
  const cardElement = card.generateCard();
  elementsList.append(cardElement);
});
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  })
});

const createCard = (card, popup, templateSelector) => {
  return new Card(card, popup, templateSelector);
}

function handleOpenPopup(name, link) {
  fullImage.src = link;
  fullImage.alt = name;
  fullImageDescription.textContent = name;
  openPopup(imagePopup);
}

const validators = {};

const popupForms = document.querySelectorAll('.popup__form');
popupForms.forEach((form) => {
  const formValidator = new FormValidator(validationConfig, form);
  validators[form.getAttribute('name')] = formValidator;
  formValidator.enableValidation();
})
