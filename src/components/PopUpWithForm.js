import PopUp from "./PopUp.js";

export default class PopUpWithForm extends PopUp {
  constructor(popUpSelector, handleFormSubmit) {
    // Why super(popUpSelector) did not work? Re 
    super({popUpSelector});

    this._popUpForm = this._popUpElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {

    console.log(this._popUpForm.content);
    const formEl = this._popUpForm.content
      .querySelector(".form")
      .cloneNode(true);
    
    console.log(formEl);
    return formEl;
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

// in index.js,
// const newCardPopUp = new PopUpWithForm('#add-card-modal'), () => {};
