const editButton = document.querySelector('.profile__button_type_edit');
const addButton = document.querySelector('.profile__button_type_add');
const closeButtons = document.querySelectorAll('.popup__close-button');

const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_image');

const fullImage = imagePopup.querySelector('.popup__image');
const fullImageDescription = imagePopup.querySelector('.popup__image-description');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupNameInput = editPopup.querySelector('#name');
const popupDescriptionInput = editPopup.querySelector('#description');

const addPopupTitleInput = addPopup.querySelector('#title');
const addPopupLinkInput = addPopup.querySelector('#link');

const editForm = editPopup.querySelector('.popup__form');
const addForm = addPopup.querySelector('.popup__form');

const initialCards = [
  {
    name: 'Йосемити',
    link: 'https://images.unsplash.com/photo-1488441770602-aed21fc49bd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80'
  },
  {
    name: 'Эль Капитан',
    link: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    name: 'Сиерра',
    link: 'https://images.unsplash.com/photo-1557118635-b2aab8fcd02f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80'
  },
  {
    name: 'Мохаве',
    link: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    name: 'Каталина',
    link: 'https://images.unsplash.com/photo-1548521523-b3d6dc514f44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    name: 'Биг Сюр',
    link: 'https://images.unsplash.com/photo-1463111184515-4229db6371a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  }
];
const elementsList = document.querySelector('.elements');
const elements = document.querySelector('.elements-template').content;

function openPopup(popup) {
  popup.classList.add('popup__opened');
  setPopupListeners(popup);
}

function closePopup(popup) {
  popup.classList.remove('popup__opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupNameInput.value;
  profileDescription.textContent = popupDescriptionInput.value;
  closePopup(editPopup);
}

function addFormSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: addPopupTitleInput.value,
    link: addPopupLinkInput.value,
  };
  const cardTemplate = createCard(card);
  elementsList.prepend(cardTemplate);
  evt.target.reset();
  closePopup(addPopup);
}

function createCard(item) {
  const templateElement = elements.cloneNode(true);
  const cardElement = templateElement.querySelector('.elements__item');
  cardElement.querySelector('.elements__image').src = item.link;
  cardElement.querySelector('.elements__title').textContent = item.name;
  cardElement.querySelector('.elements__image').alt = item.name;
  cardElement.querySelector('.elements__button-heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__button-heart_active')
  });
  cardElement.querySelector('.elements__image').addEventListener('click', function (evt) {
    fullImage.src = item.link;
    fullImage.alt = item.name;
    fullImageDescription.textContent = item.name;
    openPopup(imagePopup);
  });
  cardElement.querySelector('.elements__button-delete').addEventListener('click', function (evt) {
    evt.target.parentElement.remove();
  });
  return cardElement;
}

const setPopupListeners = (popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  });
}

editForm.addEventListener('submit', handleFormSubmit);
addForm.addEventListener('submit', addFormSubmit);
editButton.addEventListener('click', () => {
  popupNameInput.value = profileName.textContent;
  popupDescriptionInput.value = profileDescription.textContent;
  openPopup(editPopup);
});
addButton.addEventListener('click', () => openPopup(addPopup));
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
initialCards.forEach((item) => {
  const card = createCard(item);
  elementsList.append(card);
});

// editPopup.addEventListener('click', (evt) => {
//   if (evt.target === editPopup) {
//     closePopup(editPopup);
//   }
// });
