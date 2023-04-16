export class Card {
  constructor(data, openPreviewPopup, templateSelector, openDeletePopup, api) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._data = data;
    this._openPreviewPopup = openPreviewPopup;
    this._openDeletePopup = openDeletePopup;
    this._api = api;
    this._user = this._api.getUserInfo();
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
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteButtonClick();
    })
  }
  _handleCardClick () {
    this._handleOpenPopup();
  }
  _handleLikeButtonClick () {
    this._elementHeart.classList.toggle('elements__button-heart_active');

    if(this._elementHeart.classList.contains('elements__button-heart_active')) {
      this._api.like(this._cardId)
      .then(likes => {
        this._likeCount.textContent = likes.likes.length;
      })
    } else {
      this._api.removeLike(this._cardId)
      .then(likes => {
        this._likeCount.textContent = likes.likes.length;
      })
    }
  }
  _handleDeleteButtonClick() {
    this._openDeletePopup(this._element, this._data);
  }
  _handleOpenPopup() {
    this._openPreviewPopup(this._name, this._link);
  }
  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.elements__image');
    this._elementHeart = this._element.querySelector('.elements__button-heart');
    this._likeCount = this._element.querySelector('.elements__like-count');
    this._deleteButton = this._element.querySelector('.elements__button-delete');
    this._setEventListeners();
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector('.elements__title').textContent = this._name;
    this._element.querySelector('.elements__like-count').textContent = this._likes.length;
    return this._element;
  }
}
