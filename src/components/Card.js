export class Card {
  constructor(data, openPreviewPopup, templateSelector, openDeletePopup, userId, handleCardLiked) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._data = data;
    this._likes = data.likes;
    this._openPreviewPopup = openPreviewPopup;
    this._openDeletePopup = openDeletePopup;
    this._handleCardLiked = handleCardLiked;
    this._userId = userId;
    this._ownerId = data.owner._id;
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
      this._handleCardLiked(this._elementHeart, this);
    })
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick();
    })
    if(this._deleteButton) {
      this._deleteButton.addEventListener('click', () => {
        this._handleDeleteButtonClick();
      })
    }
  }
  _handleCardClick () {
    this._handleOpenPopup();
  }
  _handleLikeButtonClick () {
    this._elementHeart.classList.toggle('elements__button-heart_active');
  }
  like(likes) {
    this._element.querySelector('.elements__like-count').textContent = likes.length;
    this._handleLikeButtonClick();
  }
  _handleDeleteButtonClick() {
    this._openDeletePopup(this);
  }
  _handleOpenPopup() {
    this._openPreviewPopup(this._name, this._link);
  }
  _checkIsLiked() {
    this._likes.forEach(userLiked => {
      if(userLiked._id.includes(this._userId)) {
        this._handleLikeButtonClick();
      }
    })
  }
  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.elements__image');
    this._elementHeart = this._element.querySelector('.elements__button-heart');
    this._likeCount = this._element.querySelector('.elements__like-count');
    this._deleteButton = this._element.querySelector('.elements__button-delete');
    this._element.querySelector('.elements__title').textContent = this._name;
    this._element.querySelector('.elements__like-count').textContent = this._likes.length;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._setEventListeners();
    this._checkIsLiked();
    this._isOwner();
    return this._element;
  }
  _isOwner () {
    if(this._ownerId !== this._userId) {
      this._deleteButton.remove();
    }
  }
  deleteCard() {
    this._element.remove();
  }
}
