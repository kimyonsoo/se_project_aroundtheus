export default class UserInfo {
  constructor(nameSelector, descriptionSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._userData = {
      name: this._name.textContent.trim(),
      description: this._description.textContent.trim(),
    };
    return this._userData;
  }

  getAvatar() {
    return this._avatar.src;
  }

  setUserInfo(name, description) {
    this._name.textContent = name;
    this._description.textContent = description;
  }

  setAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
