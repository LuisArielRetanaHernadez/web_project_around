import { Card } from "./Card.js"
import { FormValidator } from "./FormValidator.js"

const profileName = document.querySelector('.profile__name')
const profileState = document.querySelector('.profile__state')

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

initialCards.forEach((card) => {
  const newCard = new Card(card.name, card.link, '#template-photo')
  const cardElement = newCard.createCard()
  cards.appendChild(cardElement)
})

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
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
observer.observe(document.body, { childList: true, subtree: true })

