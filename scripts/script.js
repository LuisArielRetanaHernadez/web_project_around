const $mobal = document.querySelector('.mobal')

const $btnUpdateProfile = document.querySelector('.profile__buton-update-profile')
const $btnCloseModal = document.querySelector('.mobal__icon-close')

const openMobal = (className = '', content) => {
  if (typeof className !== String || className === '') {
    returns
  }
  $mobal.classList.add(className ? className : 'active')
}

const closeMobal = (className = '', content) => {
  if (typeof className !== String) {
    return
  }
  $mobal.classList.add(className ? className : 'active')
}