class FormValidator {
  constructor(setting, formElement) {
    this._formSelector = setting.formSelector;
    this._inputSelector = setting.inputSelector;
    this._submitButtonSelector = setting.submitButtonSelector;
    this._inactiveButtonClass = setting.inactiveButtonClass;
    this._inputErrorClass = setting.inputErrorClass;
    this._errorClass = setting.errorClass;
    this._formElement = formElement;
  }
}