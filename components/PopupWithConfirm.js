import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(action) {
    this._handleFormSubmit = action;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__button-confirm').addEventListener('click', () => {
      this._confirmDelete();
      this.close();
    })
  }

  _confirmDelete() {
    this._handleFormSubmit();
  }
}

