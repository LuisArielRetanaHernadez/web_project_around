const templateMobal = document.querySelector('#template-mobal')
const templatePoppa = document.querySelector('#template-poppa')

const btnUpdateProfile = document.querySelector('.profile__button-update-profile')
const btnModalAddCard = document.querySelector('.profile__button-add-target')

const profileName = document.querySelector('.profile__name')
const profileState = document.querySelector('.profile__state')

const cards = document.querySelector('.elements__photos')

let mobal = null
let poppa = null

const mobalFormAddCard = () => {
  const title = 'Agrega una tarjeta'
  const formAddCard = `
          <form class="form mobal__form" data-form-select="true" id="form-add-card" action="">
            <fieldset class="form__field-set mobal__form-field-set" data-field-select>
              <div class="form__field-component">
                <input class="form__input mobal__form-input" id="input-profile-name" required minlength="2" maxlength="30" type=text" placeholder='title' />
                <span class="form__error-message" id="input-profile-name-error"></span>
              </div>


              <div class="form__field-component">
                <input class="form__input mobal__form-input" id="input-profile-url-image"
                required
                type="url" placeholder='url' />
                <span class="form__error-message" id="input-profile-url-image-error"></span>
              </div>
              
              <button class="button form__button-submit mobal__button-submit" id="button-update-profile" type=submit">
                Guardar
              </button>
            </fieldset>
          </form>
  `
  genereteMobal(formAddCard, title)
}

const mobalUpadteProfile = () => {
  const title = 'Actualiza tu perfil'
  const formUpdate = `
          <form class="form mobal__form" id="form-update-profile" action="">
            <fieldset class="form__field-set" data-field-select>

            <div class="form__field-component">
              <input class="form__input mobal__form-input" id="input-profile-name"
              required minlength="7" maxlength="15"
              type=text" value='${profileName.textContent}'/>
              <span class="form__error-message" id="input-profile-name-error"></span>
            </div>

              <div class="form__field-component">
                <input class="form__input mobal__form-input" id="input-profile-state"
                required minlength="7" maxlength="15"
                type="text" value='${profileState.textContent}'/>
                <span class="form__error-message" id="input-profile-state-error"></span>
              </div>

              
              <button class="button form__button-submit mobal__button-submit" id="button-update-profile" type=submit">
                Guardar
              </button>
            </fieldset>
          </form>
  `
  genereteMobal(formUpdate, title)
}

const genereteMobal = (content, title) => {
  const peronalizeMobal = templateMobal.content.cloneNode(true).querySelector('.mobal')
  peronalizeMobal.querySelector('.mobal__title').textContent = title
  peronalizeMobal.querySelector('.mobal__content').innerHTML = content
  mobal = peronalizeMobal
}

btnModalAddCard.addEventListener('click', () => {
  mobalFormAddCard()
  mobal.classList.add('mobal--active')
  document.querySelector('.page').appendChild(mobal)
})

btnUpdateProfile.addEventListener('click', () => {
  mobalUpadteProfile()
  mobal.classList.add('mobal--active')
  document.querySelector('.page').appendChild(mobal)
})

const closeMobal = () => {
  mobal.classList.remove('mobal--active')
  document.querySelector('.page').removeChild(mobal)
  mobal = null
}

const openPoppa = () => {
  poppa = document.querySelector('.poppa')
  poppa.classList.add('poppa--active')
}

const closePoppa = () => {
  poppa.classList.remove('poppa--active')
  document.querySelector('.page').removeChild(poppa)
  poppa = null
}

const poppaImage = (image, name) => {
  poppa = templatePoppa.content.cloneNode(true).querySelector('.poppa')
  poppa.querySelector('.poppa__image').setAttribute('src', image)
  poppa.querySelector('.poppa__title').textContent = name
  poppa.querySelector('.poppa__icon-close').addEventListener('click', () => {
    closePoppa()
  })
  document.querySelector('.page').appendChild(poppa)
  openPoppa()
}

document.querySelector('.elements__photos').addEventListener('click', (e) => {
  if (e.target.classList.contains('photo__image')) {
    const photo = e.target.closest('.photo')
    const title = photo.querySelector('.photo__title').textContent
    const url = e.target.getAttribute('src')
    poppaImage(url, title)
  }
})

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    mobal && closeMobal()
    poppa && closePoppa()
  }
})

