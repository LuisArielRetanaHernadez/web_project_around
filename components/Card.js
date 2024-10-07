export default class Card {
  constructor({ title, url, _id, likes }, selectorElement, handleCardClick, handleCardDelete) {
    this._title = title;
    this._url = url;
    this._id = _id;
    this._likes = likes
    this._selectorElement = selectorElement
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
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
    this._element.querySelector('.card__likes-count').textContent = this.getLikes(this._likes);

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick(this._title, this._url);
    });

    this._element.querySelector('.card__icon-love').addEventListener('click', () => {
      this._likeCard();
    });

    this._element.querySelector('.card__icon-delete').addEventListener('click', () => {
      this._handleCardDelete(this._id, () => {
        this._deleteCard();
      })
    });

  }

  _likeCard() {
    this._element.querySelector('.card__icon-love').classList.toggle('card__icon-love_active')
  }

  getLikes() {
    return this._likes.length;
  }

  setLikes(likes) {
    this._likes = likes;
    this._element.querySelector('.card__like-count').textContent = this.getLikes();
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

}