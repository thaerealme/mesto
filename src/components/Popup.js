export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._closeButton = this._popupSelector.querySelector('.popup__close-button');
    }
    open () {
        this._setEventListeners();
        this._popupSelector.classList.add('popup_opened');
    }
    close () {
        this._removeEventListeners();
        this._popupSelector.classList.remove('popup_opened');
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            document.removeEventListener('keydown', this._handleEscClose);
            this.close();
        }
    }
    _handleMouseClose(evt) {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
            this.close();
        }
    }
    _setEventListeners() {
        this._closeButton.addEventListener('click', this.close);
        this._popupSelector.addEventListener('mousedown', (evt) => {
            this._handleMouseClose(evt);
        });
        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
    }
    _removeEventListeners() {
        this._closeButton.removeEventListener('click', this.close);
        this._popupSelector.removeEventListener('mousedown', this._handleMouseClose);
        document.removeEventListener('keydown', this._handleEscClose);
    }
}