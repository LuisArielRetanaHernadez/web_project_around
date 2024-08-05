export class Card {
  constructor(text, url, selectorElement) {
    this._text = text;
    this._url = url;
    this._selectorElement = selectorElement
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selectorElement)
      .content
      .querySelector('.photo')
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.photo__title').textContent = this._text;
    this._element.querySelector('.photo__image').setAttribute('src', this._url);

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.photo__icon-love').addEventListener('click', () => {
      this._likeCard();
    });

    this._element.querySelector('.photo__icon-delete-image').addEventListener('click', () => {
      this._deleteCard();
    });
  }

  _likeCard() {
    this._element.querySelector('.photo__icon-love-image').classList.toggle('photo__icon-love_active')
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}