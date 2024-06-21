const $mobal = document.querySelector('.mobal')
const $btnCloseModal = document.querySelector('.mobal__icon-close')

const $btnUpdateProfile = document.querySelector('.profile__buton-update-profile')

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
          <form class="mobal__form" action="">
            <input class="mobal__form-input" type="text" />
            <input class="mobal__form-input" type="text" />
            <button class="button mobal__button-submit" type="submit">
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