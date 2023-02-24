const showInputError = (validateList, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validateList.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validateList.errorClass);
};

const hideInputError = (validateList, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validateList.inputErrorClass);
  errorElement.classList.remove(validateList.errorClass);
  errorElement.textContent = '';
};

const setEventListeners = (validateList, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validateList.inputSelector));
  const buttonElement = formElement.querySelector(validateList.submitButtonSelector);
  toggleButtonState(validateList, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(validateList, formElement, inputElement);
      toggleButtonState(validateList, inputList, buttonElement);
    });
  });
};

const enableValidation = (validateList) => {
  const formList = Array.from(document.querySelectorAll(validateList.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(validateList, formElement);
  });
};

const isValid = (validateList, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(validateList, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(validateList, formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (validateList, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validateList.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validateList.inactiveButtonClass);
  }
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});
