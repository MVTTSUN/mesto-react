import { optionsApi } from './const.js';

export default class Api {
  constructor({ url, cohort, token }) {
    this._cohort = cohort;
    this._token = token;
    this._url = url;
  }

  _getResponseData(res) {
    return res.ok ? res.json() : Promise.reject();
  }

  async getCards() {
    return fetch(`${this._url}${this._cohort}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then((res) => this._getResponseData(res))
  };

  async sendCard({ name, link }) {
    return fetch(`${this._url}${this._cohort}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((res) => this._getResponseData(res));
  };

  async deleteCard(cardId) {
    return fetch(`${this._url}${this._cohort}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then((res) => this._getResponseData(res));
  };

  async getUserInfo() {
    return fetch(`${this._url}${this._cohort}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then((res) => this._getResponseData(res));
  };

  async updateUserInfo({ name, about }) {
    return fetch(`${this._url}${this._cohort}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then((res) => this._getResponseData(res));
  };

  async updateUserAvatar({ avatar }) {
    return fetch(`${this._url}${this._cohort}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then((res) => this._getResponseData(res));
  }

  async sendLike(cardId) {
    return fetch(`${this._url}${this._cohort}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => this._getResponseData(res));
  };

  async deleteLike(cardId) {
    return fetch(`${this._url}${this._cohort}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then((res) => this._getResponseData(res));
  };
}

export const api = new Api(optionsApi);