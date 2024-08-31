const templateMobal = document.querySelector('#template-mobal')
const templatePoppa = document.querySelector('#template-poppa')

const btnUpdateProfile = document.querySelector('.profile__button-update-profile')
const btnModalAddCard = document.querySelector('.profile__button-add-target')

const profileName = document.querySelector('.profile__name')
const profileState = document.querySelector('.profile__state')

const cards = document.querySelector('.elements__photos')

let mobal = null
let poppa = null

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    mobal && closeMobal()
    poppa && closePoppa()
  }
})

