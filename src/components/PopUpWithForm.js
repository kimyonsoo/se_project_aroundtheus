import PopUp from "./PopUp.js";

export default class PopUpWithForm extends PopUp {
  constructor(popUpSelector, handleFormSubmit) {
    super(popUpSelector);

    this._popUpForm = this._popUpElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const formEl = this._popUpForm.content
      .querySelector(".form")
      .cloneNode(true);
    return formEl;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popUpForm.addEventListener("submit", (e) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popUpForm.reset();
  }
}

// in index.js,
// const newCardPopUp = new PopUpWithForm('#add-card-modal'), () => {};
