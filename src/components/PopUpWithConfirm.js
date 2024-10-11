import PopUp from "./PopUp.js";

export default class PopUpWithConfirm extends PopUp {
  constructor(popUpSelector, handleFormSubmit) {
    super({ popUpSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popUpForm = this._popUpElement.querySelector(".modal__form");
  }

  open(card) {
    this.card = card;
    console.log(`open(card): this.card._id = ${this.card._id}`);
    super.open();
  }

  close() {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popUpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this.card);
    });
  }
}
