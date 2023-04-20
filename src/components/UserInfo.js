export default class UserInfo {
    constructor({userName, userInfo, userImage}) {
        this._userName = document.querySelector(userName);
        this._userInfo = document.querySelector(userInfo);
        this._userImage = document.querySelector(userImage);
    }
    getUserInfo () {
        return {
            name: this._userName.textContent,
            description: this._userInfo.textContent,
            id: this._userId
        }
    }
    getUserId () {
        return this._userId;
    }
    setUserInfo (formData) {
        this._userName.textContent = formData.name;
        this._userInfo.textContent = formData.description;
        this._userId = formData.id;
    }
    updateAvatar (data) {
        this._userImage.src = data.avatar;
    }
}