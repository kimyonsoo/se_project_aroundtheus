function handleEscClose(evt) {
  if (evt.key == "Escape" && evt.type === "keydown") {
    const modal = document.querySelector(".modal_opened");
    closePopUp(modal);
  }
}

function openPopUp(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("click", handleOverlayClose);
  document.addEventListener("keydown", handleEscClose);
}

function closePopUp(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("click", handleOverlayClose);
  document.removeEventListener("keydown", handleEscClose);
}

export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    alert("setEventListener run");

    //.card__like-button
    const likeButton = this._cardElement.querySelector(".card__like-button");
    console.log(likeButton);

    //.card__delete-button
  }

  _handleLikeButton() {}

  _handleDeleteButton() {}

  _handleImagePreview() {}

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);

    return this._cardElement;
  }

  generateCard() {
    this_cardElement = this._getTemplate();
    this._setEventListeners();

    this._cardElement.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;

    this._cardElement.querySelector(".card__title").textContent = this._name;

    return this._cardElement;
  }
}
