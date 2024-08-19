import Popup from "./Popup";

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
}