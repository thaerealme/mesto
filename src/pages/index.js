import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {initialCards, validationConfig} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import '../pages/index.css';

const addForm = document.forms['popup_add-form'];
const editForm = document.forms['popup_edit-form'];
const editFormSubmit = editForm.querySelector('.popup__submit');
const addFormSubmit = addForm.querySelector('.popup__submit');


const elementsList = document.querySelector('.elements');

const editButton = document.querySelector('.profile__button_type_edit');
const addButton = document.querySelector('.profile__button_type_add');
const editAvatar = document.querySelector('.profile__overlay');


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '09ce64c0-003b-45c0-9c84-9eae7fed4bad',
    'Content-Type': 'application/json'
  }
});

api.getUserInfo()
  .then(data => {
    userInfo.setUserInfo({
      name: data.name,
      description: data.about,
      id: data._id
    })
    userInfo.updateAvatar(data)
  })
  .catch((err) => {
    console.log(err);
  });

api.getInitialCards()
  .then((cards) => {
    cards.forEach(card => {
      const cardItem = createCard(card, handleImagePopup, '.elements-template', handleDeletePopup, api);
      if(card.owner._id !== userInfo._userId) {
        cardItem.querySelector('.elements__button-delete').remove();
      }
      elementsList.prepend(cardItem)
    })
  })
  .catch((err) => {
    console.log(err);
  });

const userInfo = new UserInfo({
  userName: '.profile__name',
  userInfo: '.profile__description',
  userImage: '.profile__image',
});

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

const addPopup = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (formData) => {
    renderLoading(true, editFormSubmit, 'Сохранить');
    api.addCard(formData)
    .then((data) => {
      const card = createCard(data, handleImagePopup, '.elements-template', handleDeletePopup, api);
      elementsList.prepend(card);
    })
    .catch(err => console.log(err))
    .finally(loading => renderLoading(true, editFormSubmit, 'Сохранить'))
  }
});
addPopup.setEventListeners();


const editPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (formData) => {
    renderLoading(true, editFormSubmit, 'Сохранить');
    api.updateUserInfo(formData)
    .then(() => {
      userInfo.setUserInfo(formData)
    })
    .catch(err => console.log(err))
    .finally(loading => {
      renderLoading(false, editFormSubmit, 'Сохранить')
    })
  }
})
editPopup.setEventListeners();

const deletePopup = new PopupWithConfirmation({
  popupSelector: '.popup_type_delete',
  handlePopupSubmit: (card, data) => {
    api.deleteCard(data._id)
    .then(res => {
      card.remove();
    })
    .catch(err => console.log(err));
    deletePopup.close();
  }
})
deletePopup.setEventListeners();

const avatarPopup = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (formData) => {
    renderLoading(true, editFormSubmit, 'Сохранить');
    api.updateAvatar(formData.avatar)
    .then(avatar => {
      userInfo.updateAvatar(avatar)
    })
    .catch(err => console.log(err))
    .finally(loading => renderLoading(false, editFormSubmit, 'Сохранить'))
  }
})
avatarPopup.setEventListeners();

editButton.addEventListener('click', handleEditPopup);
addButton.addEventListener('click', () => {
  addPopup.open();
})
editAvatar.addEventListener('click', () => {
  avatarPopup.open();
})

function createCard (card, handleImagePopup, templateSelector, handleDeletePopup, api) {
  const newCard = new Card(card, handleImagePopup, templateSelector, handleDeletePopup, api);
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

function handleDeletePopup(evt, data) {
  deletePopup.open(evt, data);
}

function renderLoading(isLoading, element, text) {
  if(isLoading) {
    element.textContent = 'Сохранение...'
  } else {
    element.textContent = text;
  }
}

const validators = {};

const popupForms = document.querySelectorAll('.popup__form');
popupForms.forEach((form) => {
  const formValidator = new FormValidator(validationConfig, form);
  validators[form.getAttribute('name')] = formValidator;
  formValidator.enableValidation();
})
