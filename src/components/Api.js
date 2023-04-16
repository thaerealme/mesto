export default class Api {
    constructor (options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    getInitialCards () {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
    }
    getUserInfo() {
       return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }
    updateUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about:  data.description
            })
        })
    }
    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(res => {
          if(res.ok) {
            return res.json();
          } else {
            return Promise.reject(`Ошибка: ${res.status}`);
          }
        })
    }
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }   
        })
    }
    like (cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }  
        })
    }
    removeLike (cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }  
        })
    }
    updateAvatar (image) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: image
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }   
        })
    }
}