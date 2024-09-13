import PopUp from "./PopUp.js";

export default class PopUpWithForm extends PopUp {
  constructor(popUpSelector, handleFormSubmit) {
    // Why super(popUpSelector) did not work? Re 
    super({popUpSelector});

    this._popUpForm = this._popUpElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }


  _getInputValues() {

    this._inputList = this._popUpForm.querySelectorAll(".modal__input");
    this._inputValues = {}; 

    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
      console.log(input.value);
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popUpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popUpForm.reset();
  }
}
