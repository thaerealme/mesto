export class Card {
  constructor(data, openPreviewPopup, templateSelector) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._openPreviewPopup = openPreviewPopup;
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
    this._elementHeart.addEventListener('click', () => {
      this._handleLikeButtonClick();
    })
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick();
    })
    this._element.querySelector('.elements__button-delete').addEventListener('click', () => {
      this._handleDeleteButtonClick();
    })
  }
  _handleCardClick () {
    this._handleOpenPopup();
  }
  _handleLikeButtonClick () {
    this._elementHeart.classList.toggle('elements__button-heart_active');
  }
  _handleDeleteButtonClick() {
    this._element.remove();
    this._element = null;
  }
  _handleOpenPopup() {
    this._openPreviewPopup(this._name, this._link);
  }
  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.elements__image');
    this._elementHeart = this._element.querySelector('.elements__button-heart');
    this._setEventListeners();
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector('.elements__title').textContent = this._name;
    return this._element;
  }
}
