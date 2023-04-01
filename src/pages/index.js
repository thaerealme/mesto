import {Card} from '../components/Card.js';
import {FormValidator} from '../utils/FormValidator.js';
import {initialCards, validationConfig} from '../utils/constants.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';

const editButton = document.querySelector('.profile__button_type_edit');
const addButton = document.querySelector('.profile__button_type_add');

const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');

const imagePopup = document.querySelector('.popup_type_image');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupNameInput = editPopup.querySelector('#name');
const popupDescriptionInput = editPopup.querySelector('#description');

const addPopupTitleInput = addPopup.querySelector('#title');
const addPopupLinkInput = addPopup.querySelector('#link');

const addForm = document.forms['popup_add-form'];
const elementsList = document.querySelector('.elements');

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const card = createCard({
    name: addPopupTitleInput.value,
    link: addPopupLinkInput.value
  }, handleOpenPopup, '.elements-template');
  elementsList.prepend(card);
  evt.target.reset();
  validators[addForm.getAttribute('name')].resetValidationState();
  const popup = new Popup(addPopup);
  popup.close();
}

addForm.addEventListener('submit', handleAddFormSubmit);
editButton.addEventListener('click', () => {
  const userInfo = new UserInfo({userName: profileName.textContent, userInfo: profileDescription.textContent});
  const getUserInfo = userInfo.getUserInfo();
  popupNameInput.value = getUserInfo.name;
  popupDescriptionInput.value = getUserInfo.description;
  const popup = new PopupWithForm({
    popupSelector: editPopup,
    handleFormSubmit: (formData) => {
      const user = new UserInfo({userName: formData.name, userInfo: formData.description});
      user.setUserInfo();
    }
  })
  popup.open();
});

addButton.addEventListener('click', () => {
  const popup = new Popup(addPopup);
  popup.open();
})

const cardsList = new Section({ items: initialCards, renderer: (cardItem) => {
    const card = new Card(cardItem, handleOpenPopup, '.elements-template');
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
},
}, '.elements');
cardsList.renderItems();

const createCard = (card, handleOpenPopup, templateSelector) => {
  const newCard = new Card(card, handleOpenPopup, templateSelector);
  return newCard.generateCard();
}

function handleOpenPopup(name, link) {
  const popup = new PopupWithImage(imagePopup);
  popup.open(name,link);
}

const validators = {};

const popupForms = document.querySelectorAll('.popup__form');
popupForms.forEach((form) => {
  const formValidator = new FormValidator(validationConfig, form);
  validators[form.getAttribute('name')] = formValidator;
  formValidator.enableValidation();
})
