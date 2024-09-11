export default class PopUp {
  constructor({ popUpSelector }) {
    this._popUpElement = document.querySelector(popUpSelector);
  }

  _handleEscClose = (e) => {
    if (e.key == "Escape" && e.type === "keydown") {
      this.close();
    }
  };

  open() {
    this._popUpElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popUpElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this._popUpElement.addEventListener("click", (e) => {
      //e.preventDefault();
      this.close();
      //this._popUpElement.reset();
    });
  }
}
