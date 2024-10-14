export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleTrashButtonClick,
    handleLikeButtonClick
  ) {
    this._name = data.name;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._link = data.link;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleTrashButtonClick = handleTrashButtonClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
  }

  /* Event Handlers */

  // _handleLikeButton() {
  //   this._likeButton.classList.toggle("card__like-button_active");
  // }

  /* Event Listeners */

  _setEventListeners() {
    //.card__like-button
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButtonClick(this);
    });

    //.card__delete-button
    this._deleteButton.addEventListener("click", () => {
      this._handleTrashButtonClick(this);
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({
        name: this._cardTitleEl.textContent,
        link: this._cardImageEl.src,
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
    this._isLiked = this._isLiked;
    this.setIsLiked(this._isLiked);

    this._setEventListeners();

    return this._cardElement;
  }

  removeCard() {
    if (this._cardElement) {
      // this is removing from DOM
      // console.log(`this._cardElement: ${this._cardElement}`);
      this._cardElement.remove();
      this._cardElement = null;
    } else {
      console.error("Card element do not exist!");
    }
  }

  getId() {
    return this._id;
  }

  setIsLiked(isLiked) {
    this.isLiked = isLiked;
    if (isLiked) {
      this._likeButton.classList.toggle("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }
}
