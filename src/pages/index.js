import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopUpWithImage from "../components/PopUpWithImage.js";
import "./index.css";
import Section from "../components/Section.js";
import { initialCards, validationConfig } from "../utils/Constants.js";

/** ELEMENTS **/
const cardListEl = document.querySelector(".cards__list");
const cardSelector = "#card-template";

/** SECTION CLASS **/

// const CardPreview = new PopUpWithImage(selectors.previewPop);
const cardSection = new Section(
  {
    initialArray: initialCards,
    renderer: (cardData) => {
      const cardEl = createCard(cardData, cardSelector, handleImageClick);
      cardSection.addItem(cardEl);
    },
  },
  cardListEl
);

cardSection.renderItems();

/* Elements */
// const validationConfig = {
//   inputSelector: ".modal__input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: "modal__button_disabled",
//   inputErrorClass: "modal__input_error",
//   errorClass: "modal__error",
// };

const closeButtons = document.querySelectorAll(".modal__close");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditModalCloseButton = profileEditModal.querySelector(
  "#profile-edit-modal-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const addCardButton = document.querySelector("#add-card-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalCloseButton = addCardModal.querySelector(
  "#add-card-modal-close-button"
);

const addCardForm = addCardModal.querySelector(".modal__form");
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardUrlInput = addCardForm.querySelector("#card-url-input");

const viewImageModal = document.querySelector("#view-image-modal");
const viewImageModalCloseButton = viewImageModal.querySelector(
  "#view-image-modal-close-button"
);
const viewImageModalImageEl = viewImageModal.querySelector(".modal__image");
const viewImageModalTitleEl = viewImageModal.querySelector(".modal__title");

/* Functions */

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

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
}

/* CreateCard function to replace getCardElement */
function createCard(cardData, cardSelector, handleImageClick) {
  const card = new Card(cardData, cardSelector, handleImageClick);
  return card.generateCard();
}

/* Event Handlers */

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  evt.target.reset();
  closePopUp(addCardModal);
  addFormValidator.disableButton();
}

function renderCard(cardData, cardList) {
  const cardElement = createCard(cardData, cardSelector, handleImageClick);
  cardList.prepend(cardElement);
}

function handleOverlayClose(evt) {
  if (Array.from(evt.target.classList).includes("modal")) {
    closePopUp(evt.target);
  }
}

function handleEscClose(evt) {
  if (evt.key == "Escape" && evt.type === "keydown") {
    const modal = document.querySelector(".modal_opened");
    closePopUp(modal);
  }
}

/*  handles the opening of the preview picture modal */
function handleImageClick(cardData) {
  viewImageModalImageEl.alt = cardData.name;
  viewImageModalImageEl.src = cardData.link;
  viewImageModalTitleEl.textContent = cardData.name;

  openPopUp(viewImageModal);
}

/* Event Listeners */

closeButtons.forEach((button) => {
  const closestModal = button.closest(".modal");
  button.addEventListener("click", () => closePopUp(closestModal));
});

profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  openPopUp(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// initialCards.forEach((cardData) => {
//   renderCard(cardData, cardListEl);
// });

/* Add card */
addCardForm.addEventListener("submit", handleAddCardSubmit);

addCardButton.addEventListener("click", () => {
  openPopUp(addCardModal);
});

/* enable Validator */

const editFormValidator = new FormValidator(validationConfig, profileEditForm);
const addFormValidator = new FormValidator(validationConfig, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
