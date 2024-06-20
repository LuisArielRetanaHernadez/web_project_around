const $mobal = document.querySelector('.mobal')

const openMobal = (mobalEspicify) => {
  if (typeof mobalEspicify !== String) {
    return
  }
  $mobal.classList.add(mobalEspicify ? mobalEspicify : 'active')
}

const closeMobal = (mobalEspicify) => {
  if (typeof mobalEspicify !== String) {
    return
  }
  $mobal.classList.add(mobalEspicify ? mobalEspicify : 'active')
}