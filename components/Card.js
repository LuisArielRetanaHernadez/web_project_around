export default class Card {
  constructor({ name, url }, templateSelector, handleCardClick) {
    this._name = name;
    this._url = url;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
}