export default class Card {
  constructor({ name, url }, templateSelector, handleCardClick) {
    this._name = name;
    this._url = url;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplateCard() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }
}