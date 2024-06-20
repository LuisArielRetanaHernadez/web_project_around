const $mobal = document.querySelector('.mobal')

const $btnUpdateProfile = document.querySelector('.profile__buton-update-profile')
const $btnCloseModal = document.querySelector('.mobal__icon-close')

const openMobal = (mobalEspicify = $mobal, className = '') => {
  if (typeof className !== String || className === '') {
    returns
  }
  mobalEspicify.classList.add(className ? className : 'active')
}

const closeMobal = (mobalEspicify = $mobal, className = '') => {
  if (typeof className !== String) {
    return
  }
  mobalEspicify.classList.add(className ? className : 'active')
}