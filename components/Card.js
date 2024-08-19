export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  /* Event Handlers */

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  /* Event Listeners */

  _setEventListeners() {
    //.card__like-button
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    //.card__delete-button
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({
        name: this._cardTitleEl.textContent,
        link: this._cardImageEl.alt,
      });
    });
  }

  /* Get template */

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);

    return this._cardElement;
  }

  /* Public method to generate card */

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardTitleEl.textContent = this._name;
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
