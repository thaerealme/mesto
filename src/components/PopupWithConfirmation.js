import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor ({popupSelector, handlePopupSubmit}) {
        super(popupSelector);
        this._handlePopupSubmit = handlePopupSubmit;
        this._submitButton = this._popup.querySelector('.popup__submit');
        this._handleSubmitButton = this._handleSubmitButton.bind(this);
    }
    
    open (card, data) {
        super.open();
        this._card = card;
        this._data = data;
        this._submitButton.addEventListener('click', this._handleSubmitButton);
    }

    close () {
        super.close();
        this._submitButton.removeEventListener('click', this._handleSubmitButton);
    }

    _handleSubmitButton () {
        this._handlePopupSubmit(this._card, this._data);
    }
}