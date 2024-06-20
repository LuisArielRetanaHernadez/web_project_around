const $mobal = document.querySelector('.mobal')

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