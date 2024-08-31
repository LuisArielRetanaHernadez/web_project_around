import PopupWithImage from "../components/PopupWithImage.js"
import Section from "../components/Section.js"
import { Card } from "./Card.js"
import { FormValidator } from "./FormValidator.js"

// constats 
import {
  buttonNewCard,
  profileName,
  profileState
} from "../constats/constats.js"
import PopupWithForm from "../components/PopupWithForm.js"

const initialCards = [
  {
    name: 'fragmento de codigo html',
    link: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'carro mercede benz',
    link: 'https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'manoplaza red bull',
    link: 'https://images.pexels.com/photos/19417092/pexels-photo-19417092/free-photo-of-deportes-de-motor-exposicion-formula-1-f1.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'palacio de bellas artes desde arriba',
    link: 'https://images.pexels.com/photos/1589347/pexels-photo-1589347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'angel de la independencia',
    link: 'https://images.pexels.com/photos/14071000/pexels-photo-14071000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'perro chihuahua banandose',
    link: 'https://images.pexels.com/photos/485294/pexels-photo-485294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
]


const cardsInitial = new Section({
  data: initialCards,
  renderer: (item) => {

    const newCard = new Card(
      {
        text: item.name,
        url: item.link
      },
      '#template-card',
      (name, link) => {
        const popupImage = new PopupWithImage('#template-poppa')
        popupImage.open(name, link)
      })

    const cardElement = newCard.createCard()
    cardsInitial.addItem(cardElement)
  }
}, '.elements__cards')

// const newCard = new Card(card.name, card.link, '#template-photo')
// const cardElement = newCard.createCard()
// cards.appendChild(cardElement)

const heandleUpdateProfile = (e) => {
  e.preventDefault()

  const form = document.querySelector('#form-update-profile')
  const inputs = form.querySelectorAll('input')

  profileName.textContent = inputs[0].value
  profileState.textContent = inputs[1].value

  const mobal = document.querySelector('.mobal')
  mobal && mobal.classList.remove('mobal--active')
}

const form = new PopupWithForm('#form-update-profile', (valuesCard) => {
  const { text, url } = valuesCard

  const newCard = new Card({ text, url }, '#template-card')
  const cardElement = newCard.createCard()

  cardsInitial.addItem(cardElement)
})

buttonNewCard.addEventListener('click', () => {
})


// agregue el evento submit en el document para que los formularios agregados dinamico del mobal
document.addEventListener('submit', (e) => {
  e.preventDefault()

  if (e.target.id === 'form-update-profile') {
    heandleUpdateProfile(e)
  }

  if (e.target.id === 'form-add-card') {
    handleAddNewCard(e)
  }
})

// crear un observador para observar la variable $mobal para saber si tiene un mobal asignado como valor para incertar las funciones de close
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {

    if (mutation.type === 'childList') {


      mobal?.addEventListener('click', (e) => {
        if (e.target === mobal) {
          closeMobal()
        }
      })

      mobal?.querySelector('.mobal__icon-close').addEventListener('click', () => {
        closeMobal()
      })

      poppa?.addEventListener('click', (e) => {
        if (e.target === poppa) {
          closePoppa()
        }
      })

      const formAddCard = document.querySelector('#form-add-card')
      const formUpdateProfile = document.querySelector('#form-update-profile')
      if (formAddCard || formUpdateProfile) {
        const formCreateCard = new FormValidator({
          formSelector: '.form',
          inputSelector: '.form__input',
          submitButtonSelector: '.form__button-submit',
          inactiveButtonClass: 'form__button-submit_disabled',
          inputErrorClass: 'form__input_type_error',
          errorClass: '.form__error_visible'
        }, formAddCard || formUpdateProfile)
        formCreateCard.enableValidation()
      }
    }
  })
})
observer.observe(document.querySelector('.page'), { childList: true })
