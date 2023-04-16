import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor ({popupSelector, handlePopupSubmit}) {
        super(popupSelector);
        this._handlePopupSubmit = handlePopupSubmit;
        this._submitButton = this._popup.querySelector('.popup__submit');
    }
    
    open (card, data) {
        super.open();
        this._card = card;
        this._data = data;
        this._submitButton.addEventListener('click', () => {
            this._handlePopupSubmit(this._card, this._data);
        })
    }
}