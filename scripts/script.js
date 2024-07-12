const $btnCloseModal = document.querySelector('.mobal__icon-close')

const $btnUpdateProfile = document.querySelector('.profile__button-update-profile')
const $btnModalAddCard = document.querySelector('.profile__button-add-target')

const profileName = document.querySelector('.profile__name')
const profileState = document.querySelector('.profile__state')

const $templateMobal = document.querySelector('#template-mobal')

let $mobal = null

const mobalFormAddCard = () => {
  const title = 'Agrega una tarjeta'
  const formAddCard = `
          <form class="mobal__form" id="form-update-profile" action="">
            <input class="mobal__form-input" id="input-profile-name" type=text" value='Title' />
            <input class="mobal__form-input" id="input-profile-url-image" type="url" value='URL'/>
            <button class="button mobal__button-submit" id="button-update-profile" type=submit">
              Guardar
            </button>
          </form>
  `
  genereteMobal('', formAddCard, title)
}

const mobalUpadteProfile = () => {
  const title = 'Actualiza tu perfil'
  const formAddCard = `
          <form class="mobal__form" id="form-update-profile" action="">
            <input class="mobal__form-input" id="input-profile-name" type=text" value='${profileName.textContent}'/>
            <input class="mobal__form-input" id="input-profile-state" type="text" value='${profileState.textContent}'/>
            <button class="button mobal__button-submit" id="button-update-profile" type=submit">
              Guardar
            </button>
          </form>
  `
  genereteMobal('', formAddCard, title)
}

const genereteMobal = (className = '', content, title) => {
  const $peronalizeMobal = $templateMobal.content.cloneNode(true).querySelector('.mobal')
  $peronalizeMobal.querySelector('.mobal__title').textContent = title
  $peronalizeMobal.querySelector('.mobal__content').innerHTML = content
  $mobal = $peronalizeMobal
}

$btnModalAddCard.addEventListener('click', () => {
  mobalFormAddCard()
  console.log('mobal ', $mobal)
  $mobal.classList.add('mobal--active')
  document.querySelector('.page').appendChild($mobal)
})

$btnUpdateProfile.addEventListener('click', () => {
  mobalUpadteProfile()
  $mobal.classList.add('mobal--active')
  document.querySelector('.page').appendChild($mobal)
})

const openMobal = (content, title) => {
  if ($mobal) return
  $mobal = genereteMobal(className, content, title)
  $mobal.classList.add(className ? className : 'mobal--active')
}

const closeMobal = (className = '') => {
  $mobal.classList.remove(className ? className : 'mobal--active')
  document.querySelector('.page').removeChild($mobal)
}

const heandleUpdateProfile = (e) => {
  e.preventDefault()

  const form = document.querySelector('#form-update-profile')
  const inputs = form.querySelectorAll('input')

  profileName.textContent = inputs[0].value
  profileState.textContent = inputs[1].value

  setLocalStorage('profile', {
    name: inputs[0].value,
    state: inputs[1].value
  })

  // close modal
  closeMobal()
}

document.addEventListener('submit', (e) => {
  e.preventDefault()

  // update profile
  if (e.target.id === 'form-update-profile') {
    heandleUpdateProfile(e)
  }
})

// crear un observador para observar la variable $mobal para saber si tiene un mobal asignado como valor para incertar las funciones de close
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {

    if (mutation.type === 'childList') {

      $mobal?.addEventListener('click', (e) => {
        if (e.target === $mobal) {
          closeMobal()
        }
      })
      $mobal.querySelector('.mobal__icon-close').addEventListener('click', () => {
        closeMobal()
      })
    }
  })
})
observer.observe(document.querySelector('.page'), { childList: true })


const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key))
}

const loeadProfile = () => {
  const profile = getLocalStorage('profile')
  if (profile) {
    profileName.textContent = profile.name
    profileState.textContent = profile.state
  } else {
    profileName.textContent = 'Nombre'
    profileState.textContent = 'Estado'

  }
}

const loadLocalStorage = () => {
  loeadProfile()
}

loadLocalStorage()
