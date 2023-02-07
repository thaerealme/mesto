const editButton = document.querySelector('.profile__button_type_edit');
const addButton = document.querySelector('.profile__button_type_add');

const popup = document.querySelector('.popup');
const addPopup = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_image');

const popupCloseButton = popup.querySelector('.popup__close-button');
const addPopupCloseButton = addPopup.querySelector('.popup__close-button');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close-button');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupNameInput = document.querySelector('#name');
const popupDescriptionInput = document.querySelector('#description');
const addPopupTitleInput = addPopup.querySelector('#title');
const addPopupLinkInput = addPopup.querySelector('#link');

const formElement = popup.querySelector('.popup__form');
const formElementAdd = addPopup.querySelector('.popup__form');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const elements = document.querySelector('.elements-template').content;
const elementsList = document.querySelector('.elements');
const deleteButton = document.querySelectorAll('.elements__button-delete');

function openPopup() {
  popup.classList.add('visibility');
  popupNameInput.value = profileName.textContent;
  popupDescriptionInput.value = profileDescription.textContent;
}

function openAddPopup() {
  addPopup.classList.add('visibility');
}

function openImagePopup() {
  imagePopup.classList.add('visibility');
}

function closePopup() {
  if (popup.classList.contains('visibility')) {
    popup.classList.remove('visibility');
  } else if (addPopup.classList.contains('visibility')) {
    addPopup.classList.remove('visibility')
  } else {
    imagePopup.classList.remove('visibility')
  }
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  if (popup.classList.contains('visibility')) {
    profileName.textContent = popupNameInput.value;
    profileDescription.textContent = popupDescriptionInput.value;
  } else {
    const addCard = {
      name: addPopupTitleInput.value,
      link: addPopupLinkInput.value,
    }
    initialCards.unshift(addCard);
    addCards();
  }
  closePopup();
}

function addCards() {
  const templateElement = elements.cloneNode(true);
  const elementItem = templateElement.querySelector('.elements__item');
  elementItem.querySelector('.elements__button-heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__button-heart_active')
  });
  elementItem.querySelector('.elements__button-delete').addEventListener('click', function (evt) {
    evt.target.parentElement.remove();
  });
  elementItem.querySelector('.elements__image').addEventListener('click', function (evt) {
    imagePopup.querySelector('.popup__image-description').textContent = elementItem.querySelector('.elements__title').textContent;
    imagePopup.querySelector('.popup__image').src = evt.target.src;
    imagePopup.querySelector('.popup__image').alt = elementItem.querySelector('.elements__title').textContent;
    openImagePopup();
  });
  elementItem.querySelector('.elements__image').src = addPopupLinkInput.value;
  elementItem.querySelector('.elements__title').textContent = addPopupTitleInput.value;
  elementItem.querySelector('.elements__image').alt = addPopupTitleInput.value;
  elementsList.prepend(elementItem);
}

formElement.addEventListener('submit', handleFormSubmit);
formElementAdd.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', openPopup);
addButton.addEventListener('click', openAddPopup);
popupCloseButton.addEventListener('click', closePopup);
addPopupCloseButton.addEventListener('click', closePopup);
imagePopupCloseButton.addEventListener('click', closePopup);
initialCards.forEach(function (item) {
  const templateElement = elements.cloneNode(true);
  const elementItem = templateElement.querySelector('.elements__item');
  elementItem.querySelector('.elements__button-heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__button-heart_active');
  });
  elementItem.querySelector('.elements__button-delete').addEventListener('click', function (evt) {
    evt.target.parentElement.remove();
  });
  elementItem.querySelector('.elements__image').addEventListener('click', function (evt) {
    imagePopup.querySelector('.popup__image').src = item.link;
    imagePopup.querySelector('.popup__image').alt = item.name;
    imagePopup.querySelector('.popup__image-description').textContent = item.name;
    openImagePopup();
  });
  elementItem.querySelector('.elements__image').src = item.link;
  elementItem.querySelector('.elements__title').textContent = item.name;
  elementItem.querySelector('.elements__image').alt = item.name;
  elementsList.append(elementItem);
});
