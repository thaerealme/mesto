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

const editFormName = editForm.querySelector('#name');
const editFormDescription = editForm.querySelector('#description');


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

  .then(api.getInitialCards()
    .then(cards => {
      const cardsList = new Section({
        items: cards,
        renderer: (cardItem) => {
          const card = createCard(cardItem, handleImagePopup, '.elements-template', handleDeletePopup, userInfo._userId, handleCardLiked);
          cardsList.addItem(card);
        },
      }, '.elements')
      cardsList.renderItems();
    })
    .catch(err => console.log(err)))

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
      const cardsList = new Section({
        items: [data],
        renderer: (cardItem) => {
          const card = createCard(cardItem, handleImagePopup, '.elements-template', handleDeletePopup, userInfo._userId, handleCardLiked);
          cardsList.createItem(card);
        },
      }, '.elements')
      cardsList.renderItems();
      addPopup.close();
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
      editPopup.close();
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
  handlePopupSubmit: (card) => {
    api.deleteCard(card._data._id)
    .then(res => {
      card.deleteCard();
      deletePopup.close();
    })
    .catch(err => console.log(err));
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
      avatarPopup.close();
    })
    .catch(err => console.log(err))
    .finally(loading => renderLoading(false, editFormSubmit, 'Сохранить'))
  }
})
avatarPopup.setEventListeners();

editButton.addEventListener('click', handleEditPopupSubmit);
addButton.addEventListener('click', () => {
  addPopup.open();
})
editAvatar.addEventListener('click', () => {
  avatarPopup.open();
})

function createCard (card, handleImagePopup, templateSelector, handleDeletePopup, userId, handleCardLiked) {
  const newCard = new Card(card, handleImagePopup, templateSelector, handleDeletePopup, userId, handleCardLiked);
  return newCard.generateCard();
}


function handleCardLiked(element, card) {
  if(element.classList.contains('elements__button-heart_active')) {
    api.removeLike(card._cardId)
    .then(res => {
      card.like(res.likes);
    })
    .catch(err => console.log(err))
  } else {
    api.like(card._cardId)
    .then(res => {
      card.like(res.likes);
    })
    .catch(err => console.log(err))
  }
}

function handleEditPopupSubmit() {
  const user = userInfo.getUserInfo();
  editFormName.value = user.name;
  editFormDescription.value = user.description;
  editPopup.open();
}

function handleImagePopup(name, link) {
  imagePopup.open(name,link);
}

function handleDeletePopup(card) {
  deletePopup.open(card);
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
