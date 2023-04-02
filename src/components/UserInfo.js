export default class UserInfo {
    constructor({userName, userInfo}) {
        this._userName = document.querySelector(userName);
        this._userInfo = document.querySelector(userInfo);
    }
    getUserInfo () {
        return {
            name: this._userName.textContent,
            description: this._userInfo.textContent
        }
    }
    setUserInfo (formData) {
        this._userName.textContent = formData.name;
        this._userInfo.textContent = formData.description;
    }
}