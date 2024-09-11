import PopUp from "./PopUp.js";

export default class PopUpWithImage extends PopUp {
  constructor(popUpSelector) {
    super({ popUpSelector });

    this._imagePopUpImageEl = this._popUpElement.querySelector(".modal__image");
    this._imagePopUpTitleEl = this._popUpElement.querySelector(".modal__title");
  }

  open(data) {
    super.open();

    this._imagePopUpImageEl.src = data.link;
    this._imagePopUpImageEl.alt = data.name;
    this._imagePopUpTitleEl.textContent = data.name;
  }
}
