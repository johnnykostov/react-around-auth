class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  _checkRes(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }
  _request(url, headers) {
    return fetch(url, headers).then(this._checkRes);
  }
  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  getCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }
  editProfile({ name, about }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  addCard({ name, link }) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return this._request(`${this._baseUrl}/cards/likes/` + cardId, {
        method: "DELETE",
        headers: this._headers,
      });
    } else {
      return this._request(`${this._baseUrl}/cards/likes/` + cardId, {
        method: "PUT",
        headers: this._headers,
      });
    }
  }
  editAvatar(avatar) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    });
  }
  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/` + cardId, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "222d5076-8bf3-48ef-997c-4edbfcab26a5",
    "Content-Type": "application/json",
  },
});