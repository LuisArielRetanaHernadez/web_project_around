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

  generetaCard() {
    this._element = this._getTemplateCard();
    this._element.querySelector('.photo__title').textContent = this._name;
    this._element.querySelector('.photo__image').setAttribute('src', this._url);

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.photo__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._url);
    });
  }

  _handleLikeClick() {
    this._element.querySelector('.card__like').classList.toggle('photo__like_active');
  }

  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }
}