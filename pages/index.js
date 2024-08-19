import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* Elements */
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
const cardSelector = "#card-template";
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");

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

// function getCardElement(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImageEl = cardElement.querySelector(".card__image");
//   const cardTitleEl = cardElement.querySelector(".card__title");
//   const likeButton = cardElement.querySelector(".card__like-button");
//   const deleteButton = cardElement.querySelector(".card__delete-button");
//   const viewImageModalImageEl = viewImageModal.querySelector(".modal__image");
//   const viewImageModalTitleEl = viewImageModal.querySelector(".modal__title");

//   // 6/7
//   // add click listener to the cardImageEl
//   // openPopUp() with preview image modal

//   likeButton.addEventListener("click", () => {
//     likeButton.classList.toggle("card__like-button_active");
//   });

//   deleteButton.addEventListener("click", () => {
//     cardElement.remove();
//   });

//   cardImageEl.alt = cardData.name;
//   cardImageEl.src = cardData.link;
//   cardTitleEl.textContent = cardData.name;

//   cardImageEl.addEventListener("click", () => {
//     viewImageModalImageEl.alt = cardImageEl.alt;
//     viewImageModalImageEl.src = cardImageEl.src;
//     viewImageModalTitleEl.textContent = cardTitleEl.textContent;

//     openPopUp(viewImageModal);
//   });

//   return cardElement;
// }

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

initialCards.forEach((cardData) => {
  renderCard(cardData, cardListEl);
});

/* Add card */
addCardForm.addEventListener("submit", handleAddCardSubmit);

addCardButton.addEventListener("click", () => {
  openPopUp(addCardModal);
});

/* enable Validator */

/*
const editFormElement = .querySelector();
const addFormElement =

const editFormValidator = ;
const addFormValidator = ;

editFormValidator.enableValidation();
addFormValidator.enableValidation();

*/
