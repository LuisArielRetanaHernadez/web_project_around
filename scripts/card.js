class Card {
  constructor(text, url, selectorElement) {
    this._text = text;
    this._url = url;
    this._selectorElement = selectorElement
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selectorElement)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.photo__icon-love').addEventListener('click', () => {
      this._likeCard();
    });

    this._element.querySelector('.pphoto__icon-delete-image').addEventListener('click', () => {
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