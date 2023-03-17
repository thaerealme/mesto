import {fullImage, fullImageDescription, openPopup, imagePopup} from './index.js';
export class Card {
  constructor(data, templateSelector) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
  }
  _getTemplate() {
    this._element = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.elements__item')
    .cloneNode(true);

    return this._element;
  }
  _setEventListeners() {
    this._element.querySelector('.elements__button-heart').addEventListener('click', () => {
      this._element.querySelector('.elements__button-heart').classList.toggle('elements__button-heart_active');
    })
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleOpenPopup();
    })
    this._element.querySelector('.elements__button-delete').addEventListener('click', () => {
      this._element.remove();
    })
  }
  _handleOpenPopup() {
    fullImage.src = this._link;
    fullImage.alt = this._name;
    fullImageDescription.textContent = this._name;
    openPopup(imagePopup);
  }
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.elements__image').src = this._link;
    this._element.querySelector('.elements__image').alt = this._name;
    this._element.querySelector('.elements__title').textContent = this._name;
    return this._element;
  }
}
