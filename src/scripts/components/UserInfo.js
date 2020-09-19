export class UserInfo {
  constructor({ profileName, profileCharacter, profileAvatar }) {
    this._profileName = document.querySelector(profileName);
    this._profileCharacter = document.querySelector(profileCharacter);
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    const profileInfo = {name: this._profileName.textContent, about: this._profileCharacter.textContent};

    return profileInfo;
  }

  setModalUserInfo({ name, about }, nameInput, characterInput) {
    nameInput.value = name;
    characterInput.value = about;
  }

  setUserInfo({ name, about }) {
    this._profileName.textContent = name;
    this._profileCharacter.textContent = about;
  }

  setUserAvatar({ avatar }) {
    this._profileAvatar.src = avatar;
  }

  setDefaultUserInfo(userData) {
    this._profileName.textContent = userData.name;
    this._profileCharacter.textContent = userData.about;
    this._profileAvatar.src = userData.avatar;
  }
}
