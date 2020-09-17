export class UserInfo {
  constructor({ profileName, profileCharacter, profileAvatar }) {
    this._profileName = document.querySelector(profileName);
    this._profileCharacter = document.querySelector(profileCharacter);
    this._profileAvatar = document.querySelector(profileAvatar);

    this._nameInput = document.querySelector('.modal__input_type_name');
    this._characterInput = document.querySelector('.modal__input_type_character');
  }

  getUserInfo() {
    const profileInfo = {name: this._profileName.textContent, about: this._profileCharacter.textContent};

    return profileInfo;
  }

  setModalUserInfo({ name, about }) {
    this._nameInput.value = name;
    this._characterInput.value = about;
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
