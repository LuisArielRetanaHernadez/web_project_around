import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(id, handleConfirmt) {
    this._handleConfirmt = handleConfirmt;
    this._id = id;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__button-confirm').addEventListener('click', () => {
      this._handleConfirmt(this._id);
      this.close();
    })
  }

}

