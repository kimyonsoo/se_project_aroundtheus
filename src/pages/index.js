import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopUpWithImage from "../components/PopUpWithImage.js";
import PopUpWithForm from "../components/PopUpWithForm.js";

import "./index.css";
import Section from "../components/Section.js";
import { initialCards, validationConfig } from "../utils/Constants.js";

/** ELEMENTS **/
const cardListEl = document.querySelector(".cards__list");
const cardSelector = "#card-template";
const imagePopUp = "#view-image-modal";
const profilePopUp = "#profile-edit-modal";
const cardPopUp = "#add-card-modal";

const profileEditModal = document.querySelector(profilePopUp);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileEditButton = document.querySelector("#profile-edit-button");

const profileTitle = document.querySelector(".profile__title");
const profileTitleInput = document.querySelector("#profile-title-input");

const profileDescription = document.querySelector(".profile__description");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const addCardModal = document.querySelector("#add-card-modal");
const addCardButton = document.querySelector("#add-card-button");

const addCardForm = addCardModal.querySelector(".modal__form");
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardUrlInput = addCardForm.querySelector("#card-url-input");


/** SECTION CLASS **/

const cardSection = new Section(
  {
    initialArray: initialCards,
    renderer: (cardData) => {
      const cardEl = createCard(cardData);
      cardSection.addItem(cardEl);
    },
  },
  cardListEl
);

cardSection.renderItems();

/** POPUP CLASS **/

const viewImagePopUp = new PopUpWithImage(imagePopUp);
const profileEditPopUp = new PopUpWithForm(
  profilePopUp,
  handleProfileEditSubmit
);
const addCardPopUp = new PopUpWithForm(cardPopUp, handleAddCardSubmit);

/** EVENT LISTENERS **/
viewImagePopUp.setEventListeners();

profileEditButton.addEventListener("click", () => {
  profileEditPopUp.open();
  fillProfileForm();

});

// profileEditForm.addEventListener("submit", handleProfileEditSubmit);
profileEditPopUp.setEventListeners();

addCardButton.addEventListener("click", () => {
  addCardPopUp.open();
});

// addCardForm.addEventListener("submit", handleAddCardSubmit);
addCardPopUp.setEventListeners();

/** -------------------------------------- **/
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* Functions */

// function openPopUp(modal) {
//   modal.classList.add("modal_opened");
//   modal.addEventListener("click", handleOverlayClose);
//   document.addEventListener("keydown", handleEscClose);
// }

// function closePopUp(modal) {
//   modal.classList.remove("modal_opened");
//   modal.removeEventListener("click", handleOverlayClose);
//   document.removeEventListener("keydown", handleEscClose);
// }

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
}

/* CreateCard function to replace getCardElement */
function createCard(cardData) {
  const card = new Card(cardData, cardSelector, handleImageClick);
  return card.generateCard();
}

/* Event Handlers */

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  profileEditPopUp.close();
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  evt.target.reset();
  addCardPopUp.close();
  addFormValidator.disableButton();
}

// function handleOverlayClose(evt) {
//   if (Array.from(evt.target.classList).includes("modal")) {
//     closePopUp(evt.target);
//   }
// }

// function handleEscClose(evt) {
//   if (evt.key == "Escape" && evt.type === "keydown") {
//     const modal = document.querySelector(".modal_opened");
//     closePopUp(modal);
//   }
// }

/*  handles the opening of the preview picture modal */
function handleImageClick(cardData) {
  viewImagePopUp.open(cardData);
}

/* Event Listeners */

// closeButtons.forEach((button) => {
//   const closestModal = button.closest(".modal");
//   button.addEventListener("click", () => closePopUp(closestModal));
// });


/* enable Validator */

const editFormValidator = new FormValidator(validationConfig, profileEditForm);
const addFormValidator = new FormValidator(validationConfig, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
