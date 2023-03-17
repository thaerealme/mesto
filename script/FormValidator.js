export class FormValidator {

  constructor (validateList, form) {
    this._validateList = validateList;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._validateList.inputSelector));
    this._buttonElement = this._form.querySelector(this._validateList.submitButtonSelector);
  }

  enableValidation () {
    this._setEventListeners();
  }

  _setEventListeners () {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      })
    })
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    if(this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._validateList.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._validateList.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _hideInputError(inputElement) {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validateList.inputErrorClass);
    this._errorElement.classList.remove(this._validateList.errorClass);
    this._errorElement.textContent = '';
  }

  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validateList.inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._validateList.errorClass);
  }

}
