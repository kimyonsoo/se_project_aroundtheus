import PopUp from "./PopUp.js";

class PopUpWithForm extends PopUp {
  constructor({ popUpSelector, handleFormSubmit }) {
    super(popUpSelector);

    this._popUpForm = this._popUpElement.querySelector("");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {}

  setEventListeners() {}

  close() {
    this._popUpForm.reset();

    super.close();
  }
}

// in index.js,
// const newCardPopUp = new PopUpWithForm('#add-card-modal'), () => {};
