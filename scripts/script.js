const $mobal = document.querySelector('.mobal')
const $btnCloseModal = document.querySelector('.mobal__icon-close')

const $btnUpdateProfile = document.querySelector('.profile__button-update-profile')

const profileName = document.querySelector('.profile__name')
const profileState = document.querySelector('.profile__state')

const openMobal = (className = '', content, title) => {

  $mobal.querySelector('.mobal__title').textContent = title
  $mobal.querySelector('.mobal__content').innerHTML = content
  $mobal.classList.add(className ? className : 'mobal--active')
}

const closeMobal = (className = '') => {

  $mobal.classList.remove(className ? className : 'mobal--active')
}

$btnUpdateProfile.addEventListener('click', () => {
  const templateContentMobal = `
          <form class="mobal__form" id="form-update-profile" action="">
            <input class="mobal__form-input" id="input-profile-name" type=text" value='${profileName.textContent}' />
            <input class="mobal__form-input" id="input-profile-state" type="text" value='${profileState.textContent}'/>
            <button class="button mobal__button-submit" id="button-update-profile" type=submit">
              Guardar
            </button>
          </form>
  `

  openMobal('', templateContentMobal, 'Editar Perfil')
})

$btnCloseModal.addEventListener('click', () => {
  closeMobal()
})

$mobal.addEventListener('click', (e) => {
  if (e.target === $mobal) {
    closeMobal()
  }
})

const heandleUpdateProfile = (e) => {
  e.preventDefault()

  const form = document.querySelector('#form-update-profile')
  const inputs = form.querySelectorAll('input')

  profileName.textContent = inputs[0].value
  profileState.textContent = inputs[1].value

  closeMobal()
}

document.addEventListener('submit', (e) => {
  e.preventDefault()

  // update profile
  if (e.target.id === 'form-update-profile') {
    heandleUpdateProfile(e)
  }
})


const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key))
}
