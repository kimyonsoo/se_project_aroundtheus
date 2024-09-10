export default class PopUp {
    constructor ({ popUpSelector}) {
        this._popUpElement = document.querySelector(popUpSelector);
    }

    open() {

    }

    close() {

    }

    _handleEscClose() {
        function handleEscClose(evt) {
            if (evt.key == "Escape" && evt.type === "keydown") {
              const modal = document.querySelector(".modal_opened");
              closePopUp(modal);
            }
          }

    }
    //

    setEventListeners() {
        this._popUpElement.addEventListener("click", (evt) => {
            evt.preventDefault();
            //this._popUpElement.close();
            this._popUpElement.reset();
        })

    }
}