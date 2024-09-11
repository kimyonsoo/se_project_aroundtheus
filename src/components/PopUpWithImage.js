import PopUp from "./PopUp.js";

class PopUpWithImage extends PopUp {
  constructor(popUpSelector) {
    super({ popUpSelector });

    this._viewImagePopUpImageEl = viewImageModal.querySelector(".modal__image");
    this._viewImagePopUpTitleEl = viewImageModal.querySelector(".modal__title");
  }

  open(data) {
    //data = {name, link}
    // add an image to the popup and the corresponding src
    //this method should be called in your image click handler in index.js
    this._viewImageModalImageEl.src = data.link;
    this._viewImageModalImageEl.alt = data.name;
    this._viewImageModalTitleEl.textContent = data.name;

    super.open();
  }

  //Create one instance of this class in index.js and call its parent’s setEventListeners() method.
}

// /*  handles the opening of the preview picture modal */
// function handleImageClick(cardData) {
//   viewImageModalImageEl.alt = cardData.name;
//   viewImageModalImageEl.src = cardData.link;
//   viewImageModalTitleEl.textContent = cardData.name;

//   openPopUp(viewImageModal);
// }
