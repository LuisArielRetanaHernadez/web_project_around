import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js"

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
  URL_BASE
} from "../constants/constants.js"
import Api from "../components/Api.js"

const api = new Api({
  baseUrl: `https://around.nomoreparties.co/v1/web-es-cohort-16`,
  headers: {
    authorization: TOKEN,
    "Content-Type": "application/json"
  }
})

const initialCards = async () => {
  const cards = await api.getInitialCards()
  console.log('cards -> ', cards)
  if (cards) {
    return cards
  }
  return []
}


const cardsInitial = new Section({
  items: initialCards(),
  renderer: (item) => {

    const newCard = new Card(
      {
        title: item.name,
        url: item.link
      },
      '#template-card',
      (name, link) => {
        console.log(name, link)
        const popupImage = new PopupWithImage('.popup--imagen-card')
        popupImage.setEventListeners()
        popupImage.open(name, link)
      })

    const cardElement = newCard.createCard()
    cardsInitial.addItem(cardElement)
  }
}, '.elements__cards')

cardsInitial.renderer()
// const newCard = new Card(card.name, card.link, '#template-photo')
// const cardElement = newCard.createCard()
// cards.appendChild(cardElement)

const formNewCard = new PopupWithForm('.popup--create-card', async (valuesCard) => {
  const { title, url } = valuesCard

  const card = api.createCard({ name: title, link: url })

  if (card) {
    const newCard = new Card({ title, url }, '#template-card', (name, link) => {
      const popupImage = new PopupWithImage('.popup--imagen-card')
      popupImage.setEventListeners()
      popupImage.open(name, link)
    })

    const cardElement = newCard.createCard()

    cardsInitial.addItem(cardElement)
  }

})

buttonNewCard.addEventListener('click', () => {
  formNewCard.open()
  formNewCard.setEventListeners()
  new FormValidator({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button-submit',
    inactiveButtonClass: 'form__button-submit_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: '.form__error_visible'
  }, formNewCard._popup).enableValidation()
})

const formUpdateProfile = new PopupWithForm('.popup--update-profile', async (valuesUpdate) => {
  const { name, state } = valuesUpdate
  const user = await api.updateUserInfo({ name, about: state })
  if (user) {
    const userInfo = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__state' })
    userInfo.setUserInfo(name, state)
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

