export default class UserInfo {
    constructor({userName, userInfo}) {
        this._userName = userName;
        this._userInfo = userInfo;
    }
    getUserInfo () {
        return {
            name: this._userName,
            description: this._userInfo
        }
    }
    setUserInfo () {
        this._userData = this.getUserInfo();
        this._profileName = document.querySelector('.profile__name');
        this._profileDescription = document.querySelector('.profile__description');
        this._profileName.textContent = this._userData.name;
        this._profileDescription.textContent = this._userData.description;
    }
}