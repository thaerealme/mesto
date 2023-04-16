export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close-button');
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleMouseClose = this._handleMouseClose.bind(this);
        this.close = this.close.bind(this);
    }
    open () {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    close () {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
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
    setEventListeners() {
        this._closeButton.addEventListener('click', this.close);
        this._popup.addEventListener('mousedown', this._handleMouseClose);
    }

}