import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {initialCards, validationConfig} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';

const addForm = document.forms['popup_add-form'];
const editForm = document.forms['popup_edit-form'];
const elementsList = document.querySelector('.elements');

const editButton = document.querySelector('.profile__button_type_edit');
const addButton = document.querySelector('.profile__button_type_add');



const userInfo = new UserInfo({
  userName: '.profile__name',
  userInfo: '.profile__description'
});

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

const addPopup = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (formData) => {
    const card = createCard({
      name: formData.name,
      link: formData.link
    }, handleImagePopup, '.elements-template');
    elementsList.prepend(card);
  }
});
addPopup.setEventListeners();

const editPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
  }
})
editPopup.setEventListeners();

editButton.addEventListener('click', handleEditPopup);
addButton.addEventListener('click', () => {
  addPopup.open();
})

const cardsList = new Section({ items: initialCards, renderer: (cardItem) => {
    const card = createCard(cardItem, handleImagePopup, '.elements-template');
    cardsList.addItem(card);
},
}, '.elements');
cardsList.renderItems();

function createCard (card, handleImagePopup, templateSelector) {
  const newCard = new Card(card, handleImagePopup, templateSelector);
  return newCard.generateCard();
}

function handleEditPopup() {
  const getInfo = userInfo.getUserInfo();
  editForm.querySelector('#name').value = getInfo.name;
  editForm.querySelector('#description').value = getInfo.description;
  editPopup.open();
}

function handleImagePopup(name, link) {
  validators[addForm.getAttribute('name')].toggleButtonState();
  imagePopup.open(name,link);
}

const validators = {};

const popupForms = document.querySelectorAll('.popup__form');
popupForms.forEach((form) => {
  const formValidator = new FormValidator(validationConfig, form);
  validators[form.getAttribute('name')] = formValidator;
  formValidator.enableValidation();
})
