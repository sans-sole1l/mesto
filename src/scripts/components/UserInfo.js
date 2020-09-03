export class UserInfo {
  constructor({ profileName, profileCharacter }) {
    this._profileName = document.querySelector(profileName);
    this._profileCharacter = document.querySelector(profileCharacter);

    this._nameInput = document.querySelector('.modal__input_type_name');
    this._characterInput = document.querySelector('.modal__input_type_character');
  }

  getUserInfo() {
    const profileInfo = {name: this._profileName.textContent, character: this._profileCharacter.textContent};

    return profileInfo;
  }

  autoSetUserInfo({ name, character }) {
    this._nameInput.value = name;
    this._characterInput.value = character;
  }

  setUserInfo([{ name, character }]) {
    this._profileName.textContent = name;
    this._profileCharacter.textContent = character;
  }
}
