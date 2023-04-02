import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        // достал элементы полей
        this._inputList = this._form.querySelectorAll('.popup__input');
    }
    _getInputValues() {
        // объект для заполнения элементами
        this._formValues = {};
        // добавляю значения полей в объект выше
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        // возврат объекта со значениями всех полей в форме
        return this._formValues;
    }
    setEventListeners() {
        super.setEventListeners();
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