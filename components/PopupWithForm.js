import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputs = this._popup.querySelectorAll('.popup__input');
    const values = {};
    inputs.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popup.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }

  close() {
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }
}