import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js"
import PopupWithConfirm from "../components/PopupWithConfirm.js"

import Section from "../components/Section.js"
import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import UserInfo from "../components/UserInfo.js"

// style
import './index.css'

// constats 
import {
  buttonEditProfile,
  buttonNewCard,
  profileName,
  profileState,
  TOKEN,
  GroupId,
  URL_BASE,
  buttonEditAvatar,
  buttonDeleteCard
} from "../constants/constants.js"
import Api from "../components/Api.js"

const api = new Api({
  baseUrl: `${URL_BASE}/v1/${GroupId}`,
  headers: {
    authorization: TOKEN,
    "Content-Type": "application/json"
  }
})

const initialCards = async () => {
  const cards = await api.getInitialCards()
  return cards
}

const popupWithConfirm = new PopupWithConfirm('.popup--delete-card');
popupWithConfirm.setEventListeners();


const cardsInitial = new Section({
  items: await initialCards(),
  renderer: (item) => {
    console.log(item);
    const newCard = new Card(
      {
        title: item.name,
        url: item.link,
        _id: item._id,
        likes: item.likes,
        islike: item.likes.some((like) => like._id === "88dd2732475600717adbae4c")
      },
      '#template-card',
      (name, link) => {
        const popupImage = new PopupWithImage('.popup--imagen-card');
        popupImage.setEventListeners();
        popupImage.open(name, link);
      },
      (id, callback) => {
        popupWithConfirm.open(id, async () => {
          const card = await api.deleteCard(id);
          if (card) {
            callback();
          }
        });
      },
      (id, callback) => {
        api.likeCard(id)
          .then((card) => {
            callback(card.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      (id, callback) => {
        api.likeCardDelete(id)
          .then((card) => {
            callback(card.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );

    const cardElement = newCard.createCard();
    cardsInitial.addItem(cardElement);
  }
}, '.elements__cards');

cardsInitial.renderer();

const formNewCard = new PopupWithForm('.popup--create-card', async (valuesCard) => {
  const { title, url } = valuesCard;

  const card = await api.createCard(title, url);

  if (card?._id) {
    const newCard = new Card({ title, url, _id: card._id, likes: card.likes },
      '#template-card',
      (name, link) => {
        const popupImage = new PopupWithImage('.popup--imagen-card');
        popupImage.setEventListeners();
        popupImage.open(name, link);
      },
      (id, callback) => {
        popupWithConfirm.open(id, async () => {
          const card = await api.deleteCard(id);
          if (card) {
            callback();
          }
        });
      }
    );

    const cardElement = newCard.createCard();
    cardsInitial.addItem(cardElement);
  }
});

formNewCard.setEventListeners();

buttonNewCard.addEventListener('click', () => {
  formNewCard.open();
  new FormValidator({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button-submit',
    inactiveButtonClass: 'form__button-submit_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: '.form__error_visible'
  }, formNewCard._popup).enableValidation();
});

const initialUser = async () => {
  const user = await api.getUserInfo()
  return user
}

const user = await initialUser()
const userInfo = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__state', avatarSelector: '.profile__image' })

userInfo.setUserInfo({ name: user.name, job: user.about })
userInfo.setAvatar(user.avatar)

const formUpdateProfile = new PopupWithForm('.popup--update-profile', async (valuesUpdate) => {
  const { name, state } = valuesUpdate
  const user = await api.updateUserInfo(name, state)
  if (user) {
    const userInfo = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__state' })
    userInfo.setUserInfo({ name: user.name, job: user.about })
  }
})

buttonEditProfile.addEventListener('click', () => {
  formUpdateProfile.open()
  formUpdateProfile.setEventListeners()
  const formInputs = formUpdateProfile._popup.querySelectorAll('.form__input')
  formInputs[0].value = profileName.textContent
  formInputs[1].value = profileState.textContent

  new FormValidator({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button-submit',
    inactiveButtonClass: 'form__button-submit_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: '.form__error_visible'
  }, formUpdateProfile._popup).enableValidation()

})

buttonEditAvatar.addEventListener('click', () => {
  const formUpdateAvatar = new PopupWithForm('.popup--upload-avatar-user-me', async (valuesAvatar) => {
    const { avatar } = valuesAvatar
    const user = await api.updateAvatarUser(avatar)
    if (user) {
      const userInfo = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__state', avatarSelector: '.profile__image' })
      userInfo.setAvatar(user.avatar)
    }
  })
  formUpdateAvatar.open()
  formUpdateAvatar.setEventListeners()
  new FormValidator({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button-submit',
    inactiveButtonClass: 'form__button-submit_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: '.form__error_visible'
  }, formUpdateAvatar._popup).enableValidation()
})

