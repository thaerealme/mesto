import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupSelector.querySelector('.popup__form');
    }
    _getInputValues() {
        // достал элементы полей
        this._inputList = this._popupSelector.querySelectorAll('.popup__input');
        // объект для заполнения элементами
        this._formValues = {};
        // добавляю значения полей в объект выше
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        // возврат объекта со значениями всех полей в форме
        return this._formValues;
    }
    _setEventListeners() {
        super._setEventListeners();
        // добавить обработчик отправки формы
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        })
    }
    close () {
        super.close();
        this._form.reset();
    }
}