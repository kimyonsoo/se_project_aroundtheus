import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopUpWithImage from "../components/PopUpWithImage.js";
import PopUpWithForm from "../components/PopUpWithForm.js";
import UserInfo from "../components/UserInfo.js";

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

/** USER CLASS **/

const user = new UserInfo(".profile__title", ".profile__description");
const userProfile = user.getUserInfo();

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
  handleProfileEditButtonClick();
});



addCardButton.addEventListener("click", () => {
  addCardPopUp.open();
});

/** -------------------------------------- **/
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* CreateCard function to replace getCardElement */
function createCard(cardData) {
  const card = new Card(cardData, cardSelector, handleImageClick);
  return card.generateCard();
}

/* Event Handlers */

function handleProfileEditSubmit(data) {
  user.setUserInfo({name: data.title, description: data.description});
  profileEditPopUp.close();
}

function handleAddCardSubmit() {
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardEl = createCard({name, link});
  cardSection.addItem(cardEl);
  addCardPopUp.close();
  addFormValidator.disableButton();
}

function handleProfileEditButtonClick() {
  profileTitleInput.value = userProfile.name;
  profileDescriptionInput.value = userProfile.description;
  profileEditPopUp.open();

}

function handleAddCardButtonClick() {
  addCardPopUp.open();
}

/*  handles the opening of the preview picture modal */
function handleImageClick(cardData) {
  viewImagePopUp.open(cardData);
}

/* Event Listeners */

profileEditPopUp.setEventListeners();
addCardPopUp.setEventListeners();

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

/* enable Validator */

const editFormValidator = new FormValidator(validationConfig, profileEditForm);
const addFormValidator = new FormValidator(validationConfig, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
