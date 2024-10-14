import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopUpWithImage from "../components/PopUpWithImage.js";
import PopUpWithForm from "../components/PopUpWithForm.js";
import PopUpWithConfirm from "../components/PopUpWithConfirm.js";
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
  deletePopUpSelector,
  avatarPopUpSelector,
} from "../utils/Constants.js";
import Api from "../components/Api.js";

/** API **/
const config = {
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "984e74d2-6876-48b9-aa34-b5b7c14e830a",
    "Content-Type": "application/json",
  },
};

const api = new Api(config);

api
  .getInitialCards()
  .then((cardData) => {
    // const cardSection = new Section(
    //   {
    //     renderer: (cardData) => {
    //       const cardEl = createCard(cardData);
    //       cardSection.addItem(cardEl);
    //     },
    //   },
    //   cardListEl
    // );

    cardSection.renderItems(cardData);
  })
  .catch((err) => {
    console.error(`Initial Cards Fetch ${err}`);
  });

api
  .getUserInfo()
  .then((userData) => {
    console.log(`userData: ${userData}`);
    console.log(`userData.avatar: ${userData.avatar}`);
    console.log(`userData.avatar type: ${typeof userData.avatar}`);

    user.setUserInfo(userData.name, userData.about);
    user.setAvatar(userData.avatar);
  })
  .catch((err) => {
    console.error(`User Info Fetch ${err}`);
  });

/** ELEMENTS **/
const cardListEl = document.querySelector(".cards__list");

/* ELEMENT | PROFILE EDIT */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector(profilePopUpSelector);
const profileEditForm = profileEditModal.querySelector(".modal__form");

const avatarEditButton = document.querySelector("#avatar-edit-button");
const avatarEditModal = document.querySelector(avatarPopUpSelector);
const avatorEditForm = avatarEditModal.querySelector(".modal__form");

// const profileTitleInput = profileEditForm.querySelector("#profile-title-input");
// const profileDescriptionInput = profileEditForm.querySelector(
//   "#profile-description-input"
// );

/* ELEMENT | ADD CARD */
const addCardButton = document.querySelector("#add-card-button");
const addCardModal = document.querySelector(cardPopUpSelector);
const addCardForm = addCardModal.querySelector(".modal__form");

// const cardTitleInput = addCardForm.querySelector("#card-title-input");
// const cardUrlInput = addCardForm.querySelector("#card-url-input");

/* ELEMENT | REMOVE CARD */

// /** SECTION CLASS **/

const cardSection = new Section(
  {
    renderer: (cardData) => {
      const cardEl = createCard(cardData);
      cardSection.addItem(cardEl);
    },
  },
  cardListEl
);

/** USER CLASS **/

const user = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__avatar"
);

/** VALIDATOR CLASS **/

const profileFormValidator = new FormValidator(
  validationConfig,
  profileEditForm
);
const avatarFormValidator = new FormValidator(validationConfig, avatorEditForm);
const addFormValidator = new FormValidator(validationConfig, addCardForm);

profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();
addFormValidator.enableValidation();

/** POPUP CLASS **/

const viewImagePopUp = new PopUpWithImage(imagePopUpSelector);
const profileEditPopUp = new PopUpWithForm(
  profilePopUpSelector,
  handleProfileEditSubmit
);
const addCardPopUp = new PopUpWithForm(cardPopUpSelector, handleAddCardSubmit);
const deleteCardPopUp = new PopUpWithConfirm(
  deletePopUpSelector,
  handleDeleteCardSubmit
);

const avatarEditPopUp = new PopUpWithForm(
  avatarPopUpSelector,
  handleAvatarEditSubmit
);

// /** -------------------------------------- **/
// const cardTemplate =
//   document.querySelector("#card-template").content.firstElementChild;

/** FUNCTIONS **/

/* CARD */
function createCard(cardData) {
  const card = new Card(
    cardData,
    cardSelector,
    handleImageClick,
    handleTrashClick,
    handleLikeClick
  );
  return card.generateCard();
}

/* EVENT HANDLERS */

function handleProfileEditSubmit(data) {
  api
    .updateUserProfile({ name: data.title, about: data.description })
    .then((res) => {
      user.setUserInfo(res.name, res.about);
      profileEditPopUp.getPopUpForm().reset();

      profileEditPopUp.close();
    })
    .catch((err) => {
      console.error(`Profile Patch ${err}`);
    })
    .finally(() => {
      profileEditPopUp.setSaving(false);
    });
}

function handleAvatarEditSubmit(data) {
  api
    .updateAvatar({ avatar: data.url })
    .then((res) => {
      user.setAvatar(res.avatar);
      avatarEditPopUp.getPopUpForm().reset();

      avatarEditPopUp.close();
      avatarFormValidator.disableButton();
    })
    .catch((err) => {
      console.error(`Avatar Patch ${err}`);
    })
    .finally(() => {
      avatarEditPopUp.setSaving(false);
    });
}

function handleAddCardSubmit(cardInput) {
  //card.js has name and link, vs index.html has title and url
  api
    .addCard({ name: cardInput.title, link: cardInput.url })
    .then((res) => {
      const cardEl = createCard(res);
      cardSection.addItem(cardEl);
      addCardPopUp.getPopUpForm().reset();
      addCardPopUp.close();
      addFormValidator.disableButton();
    })
    .catch((err) => {
      console.error(`Add Card ${err}`);
    })
    .finally(() => {
      addCardPopUp.setSaving(false);
    });
}

function handleDeleteCardSubmit(card) {
  api
    .deleteCard(card._id)
    .then(() => {
      card.removeCard();
      deleteCardPopUp.close();
    })
    .catch((err) => {
      console.error(`Delete Card ${err}`);
    });
}

function handleProfileEditButtonClick() {
  const userProfile = user.getUserInfo();
  profileEditPopUp.setInputValues({
    title: userProfile.name,
    description: userProfile.description,
  });
  // profileTitleInput.value = userProfile.name;
  // profileDescriptionInput.value = userProfile.description;
  profileEditPopUp.open();
  profileFormValidator.resetValidation();
}

function handleImageClick(cardData) {
  viewImagePopUp.open(cardData);
}

function handleTrashClick(card) {
  console.log(`handleTrashClick(card): ${card}`);
  deleteCardPopUp.open(card);
}

function handleLikeClick(card) {
  if (!card.isLiked) {
    api
      .addLike(card.getId())
      .then(() => {
        card.setIsLiked(true);
      })
      .catch((err) => {
        console.error(`Delete Card ${err}`);
      });
  } else {
    api
      .removeLike(card.getId())
      .then(() => {
        card.setIsLiked(false);
      })
      .catch((err) => {
        console.error(`Delete Card ${err}`);
      });
  }
}

function handleAvatarEditButtonClick() {
  avatarEditPopUp.setInputValues({
    url: user.getAvatar(),
  });
  avatarEditPopUp.open();
  avatarFormValidator.resetValidation();
}

/** EVENT LISTENERS **/

profileEditPopUp.setEventListeners();
addCardPopUp.setEventListeners();
viewImagePopUp.setEventListeners();
deleteCardPopUp.setEventListeners();
avatarEditPopUp.setEventListeners();

profileEditButton.addEventListener("click", () => {
  handleProfileEditButtonClick();
});

addCardButton.addEventListener("click", () => {
  addCardPopUp.open();
});

avatarEditButton.addEventListener("click", () => {
  handleAvatarEditButtonClick();
});
