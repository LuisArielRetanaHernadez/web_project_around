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
}