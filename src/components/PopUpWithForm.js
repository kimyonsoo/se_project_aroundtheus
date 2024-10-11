import PopUp from "./PopUp.js";

export default class PopUpWithForm extends PopUp {
  constructor(popUpSelector, handleFormSubmit) {
    // Why super(popUpSelector) did not work? Re
    // PopUp accepts an object --- in its constructor
    // vs. PopUpwithForm inherits PopUp's functions and instances by super({popUpSelector}) but that does not mean popUpwithForm
    // necessarily have to accept an object in constructor -> because super({popUpSelector}) is handling it
    super({ popUpSelector });

    this._popUpForm = this._popUpElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;

    this._submitButton = this._popUpForm.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      // Here you insert the `value` by the `name` of the input
      input.value = data[input.name];
    });
  }

  _getInputValues() {
    //All elements found every time you call a method should be defined as class fields in the constructor, in order
    // not to waste resources on searching them again and again
    //but don't we get different value whenever there's new userinput?

    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  setSaving(isSaving) {
    console.log(`this._submitButton: ${this._submitButton}`);

    console.log(`isSaving: ${isSaving}`);
    if (isSaving) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  setEventListeners() {
    this._inputList = this._popUpForm.querySelectorAll(".modal__input");
    super.setEventListeners();
    this._popUpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.setSaving(true);
      this._handleFormSubmit(this._getInputValues());
      //should clear the inputs only after submitting a card in case a user accidentally close the form
    });
    this._popUpForm.reset();
  }

  close() {
    super.close();
  }
}
