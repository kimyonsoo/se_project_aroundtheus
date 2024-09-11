export default class PopUp {
  constructor({ popUpSelector }) {
    this._popUpElement = document.querySelector(popUpSelector);
    this._popUpCloseButton = this._popUpElement.querySelector(".modal__close");
  }

  _handleEscClose = (e) => {
    if (e.key == "Escape") {
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
    this._popUpCloseButton.addEventListener("click", () => {
      this.close();
    });

    this._popUpElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        this.close();
      }
    });
  }
}
