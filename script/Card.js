export class Card {
  constructor(data, popup, templateSelector) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._popup = popup;
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
      this._handleLikeButtonClick();
    })
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleImageClick();
    })
    this._element.querySelector('.elements__button-delete').addEventListener('click', () => {
      this._handleDeleteButtonClick();
    })
  }
  _handleImageClick () {
    this._handleOpenPopup();
  }
  _handleLikeButtonClick () {
    this._element.querySelector('.elements__button-heart').classList.toggle('elements__button-heart_active');
  }
  _handleDeleteButtonClick() {
    this._element.remove();
    this._element = null;
  }
  _handleOpenPopup() {
    this._popup(this._name, this._link);
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
