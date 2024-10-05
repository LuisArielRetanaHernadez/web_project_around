import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleConfirmt) {
    super(popupSelector);
    this._handleFormSubmit = handleConfirmt;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__button-confirm').addEventListener('click', () => {
      this._handleFormSubmit();
      this.close();
    })
  }

}

