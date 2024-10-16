import PopUp from "./PopUp.js";

export default class PopUpWithForm extends PopUp {
  constructor(popUpSelector, handleFormSubmit) {
    // Why super(popUpSelector) did not work? Re
    super({ popUpSelector });

    this._popUpForm = this._popUpElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._popUpForm.querySelectorAll(".modal__input");
    this._inputValues = {};

    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
      console.log(this._inputValues);
      console.log(this._inputValues.title);
      console.log(this._inputValues.url);
    });

    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popUpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      //should clear the inputs only after submitting a card in case a user accidentally close the form
      this._popUpForm.reset();
    });
  }

  close() {
    super.close();
  }
}
