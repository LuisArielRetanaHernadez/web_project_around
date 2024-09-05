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

  close() {
    super.close()
    console.log('form popup ', this._popup.querySelector('.popup__form'))
    this._popup.querySelector('.popup__form').reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }
}