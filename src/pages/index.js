import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopUpWithImage from "../components/PopUpWithImage.js";
import PopUpWithForm from "../components/PopUpWithForm.js";
import UserInfo from "../components/UserInfo.js";

import "./index.css";
import Section from "../components/Section.js";
import {
  initialCards,
  validationConfig,
  cardSelector,
  imagePopUpSelector,
  profilePopUpSelector,
  cardPopUpSelector,
} from "../utils/Constants.js";

/** ELEMENTS **/
const cardListEl = document.querySelector(".cards__list");

/* ELEMENT | PROFILE EDIT */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector(profilePopUpSelector);
const profileEditForm = profileEditModal.querySelector(".modal__form");

const profileTitleInput = profileEditForm.querySelector("#profile-title-input");
const profileDescriptionInput = profileEditForm.querySelector(
  "#profile-description-input"
);

/* ELEMENT | ADD CARD */
const addCardButton = document.querySelector("#add-card-button");
const addCardModal = document.querySelector(cardPopUpSelector);
const addCardForm = addCardModal.querySelector(".modal__form");

// const cardTitleInput = addCardForm.querySelector("#card-title-input");
// const cardUrlInput = addCardForm.querySelector("#card-url-input");

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

/** VALIDATOR CLASS **/

const editFormValidator = new FormValidator(validationConfig, profileEditForm);
const addFormValidator = new FormValidator(validationConfig, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/** POPUP CLASS **/

const viewImagePopUp = new PopUpWithImage(imagePopUpSelector);
const profileEditPopUp = new PopUpWithForm(
  profilePopUpSelector,
  handleProfileEditSubmit
);
const addCardPopUp = new PopUpWithForm(cardPopUpSelector, handleAddCardSubmit);

// /** -------------------------------------- **/
// const cardTemplate =
//   document.querySelector("#card-template").content.firstElementChild;

/** FUNCTIONS **/

/* CARD */
// Re - why we keep createCard in index.js again? Why not in Card.js?
function createCard(cardData) {
  const card = new Card(cardData, cardSelector, handleImageClick);
  return card.generateCard();
}

/* EVENT HANDLERS */

function handleProfileEditSubmit(data) {
  user.setUserInfo(data.title, data.description);
  profileEditPopUp.close();
}

function handleAddCardSubmit(cardInput) {
  const cardEl = createCard({ name: cardInput.title, link: cardInput.url });
  cardSection.addItem(cardEl);
  addCardPopUp.close();
  addFormValidator.disableButton();
}

function handleProfileEditButtonClick() {
  const userProfile = user.getUserInfo();
  profileTitleInput.value = userProfile.name;
  profileDescriptionInput.value = userProfile.description;
  profileEditPopUp.open();
}

function handleImageClick(cardData) {
  viewImagePopUp.open(cardData);
}

/** EVENT LISTENERS **/

profileEditPopUp.setEventListeners();
addCardPopUp.setEventListeners();
viewImagePopUp.setEventListeners();

profileEditButton.addEventListener("click", () => {
  handleProfileEditButtonClick();
});

addCardButton.addEventListener("click", () => {
  addCardPopUp.open();
});
