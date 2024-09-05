export default class Card {
  constructor({ title, url }, selectorElement, handleCardClick) {
    this._title = title;
    this._url = url;
    this._selectorElement = selectorElement
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selectorElement)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._title;
    this._element.querySelector('.card__image').setAttribute('src', this._url);

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick(this._title, this._url);
    });

    this._element.querySelector('.card__icon-love').addEventListener('click', () => {
      this._likeCard();
    });

    this._element.querySelector('.card__icon-delete-image').addEventListener('click', () => {
      this._deleteCard();
    });
  }

  _likeCard() {
    this._element.querySelector('.card__icon-love').classList.toggle('card__icon-love_active')
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}