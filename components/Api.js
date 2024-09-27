export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this.body = options.body;
    this._token = options.token;
    this._contentType = options.contentType;
  }
}