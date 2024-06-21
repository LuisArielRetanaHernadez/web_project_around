const $mobal = document.querySelector('.mobal')

const $btnUpdateProfile = document.querySelector('.profile__buton-update-profile')
const $btnCloseModal = document.querySelector('.mobal__icon-close')

const openMobal = (className = '', content, title) => {

  $mobal.querySelector('.mobal__title').textContent = title
  $mobal.querySelector('.mobal__content').innerHTML = content
  $mobal.classList.add(className ? className : 'mobal--active')
}

const closeMobal = (className = '') => {
  if (typeof className !== String) {
    return
  }
  $mobal.classList.add(className ? className : 'mobal--active')
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