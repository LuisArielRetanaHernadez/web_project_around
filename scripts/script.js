const btnCloseModal = document.querySelector('.mobal__icon-close')

const btnUpdateProfile = document.querySelector('.profile__button-update-profile')
const btnModalAddCard = document.querySelector('.profile__button-add-target')
const btnDeleteCard = document.querySelectorAll('.photo__button-delete')

const profileName = document.querySelector('.profile__name')
const profileState = document.querySelector('.profile__state')

const templateMobal = document.querySelector('#template-mobal')
const templatePoppa = document.querySelector('#template-poppa')
const templatePhoto = document.querySelector('#template-photo')

const photos = document.querySelector('.elements__photos')

let mobal = null
let poppa = null

const initialPhotos = [
  {
    name: 'fragmento de codigo html',
    link: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'carro mercede benz',
    link: 'https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'manoplaza red bull',
    link: 'https://images.pexels.com/photos/19417092/pexels-photo-19417092/free-photo-of-deportes-de-motor-exposicion-formula-1-f1.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'palacio de bellas artes desde arriba',
    link: 'https://images.pexels.com/photos/1589347/pexels-photo-1589347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'angel de la independencia',
    link: 'https://images.pexels.com/photos/14071000/pexels-photo-14071000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'perro chihuahua banandose',
    link: 'https://images.pexels.com/photos/485294/pexels-photo-485294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
]
// El genedaor de modal lo hago para que el contenido del modal sea dinamico y se pueda agregar 
// cualquier conteniedo ya sea formulario, alertas, etc...
const mobalFormAddCard = () => {
  const title = 'Agrega una tarjeta'
  const formAddCard = `
          <form class="mobal__form" id="form-add-card" action="">
            <input class="mobal__form-input" id="input-profile-name" type=text" placeholder='title' />
            <input class="mobal__form-input" id="input-profile-url-image" type="url" placeholder='url' />
            <button class="button mobal__button-submit" id="button-update-profile" type=submit">
              Guardar
            </button>
          </form>
  `
  genereteMobal('', formAddCard, title)
}

const mobalUpadteProfile = () => {
  const title = 'Actualiza tu perfil'
  const formUpdate = `
          <form class="mobal__form" id="form-update-profile" action="">
            <input class="mobal__form-input" id="input-profile-name" type=text" value='${profileName.textContent}'/>
            <input class="mobal__form-input" id="input-profile-state" type="text" value='${profileState.textContent}'/>
            <button class="button mobal__button-submit" id="button-update-profile" type=submit">
              Guardar
            </button>
          </form>
  `
  genereteMobal('', formUpdate, title)
}

const genereteMobal = (className = '', content, title) => {
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

const closeMobal = (className = '') => {
  mobal.classList.remove(className ? className : 'mobal--active')
  document.querySelector('.page').removeChild(mobal)
  mobal = null
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

const lovePhoto = (photo) => {
  console.log('photo ', photo)
  photo.classList.toggle('photo__icon-love_active')
}

const generetePhoto = (title, url) => {
  const photo = templatePhoto.content.cloneNode(true).querySelector('.photo')
  photo.querySelector('.photo__title').textContent = title
  photo.querySelector('.photo__image').setAttribute('src', url)
  return photo
}

const showErrorInput = (formElement, inputForm, errorMessage) => {
  const errorElementMessage = formElement.querySelector(`.${inputForm.id}-error`)
  inputForm.classList.add('form__input_type_error')
  errorElementMessage.textContent = errorMessage
  errorElementMessage.classList.add('form__input-error_active')
}
const hiddeErrorInput = (formElement, inputForm) => {
  const errorElementMessage = formElement.querySelector(`.${inputForm.id}-error`)
  inputForm.classList.remove('form__input_type_error')
  errorElementMessage.classList.remove('form__input-error_active')
  errorElementMessage.textContent = ''
}

photos.addEventListener('click', e => {
  if (e.target.classList.contains('photo__icon-love-image')) {
    const parentButton = e.target.closest('.photo__icon-love')
    lovePhoto(parentButton)
  }
  if (e.target.classList.contains('photo__icon-delete-image')) {
    const parentButton = e.target.closest('.photo')
    deletePhoto(parentButton)
  }

  if (e.target.classList.contains('photo__image')) {
    const photo = e.target.closest('.photo')
    const title = photo.querySelector('.photo__title').textContent
    const url = e.target.getAttribute('src')
    poppaImage(url, title)
  }
})


const handleAddNewCard = (e) => {
  e.preventDefault()
  const form = document.querySelector('#form-add-card')
  const inputs = form.querySelectorAll('input')
  const title = inputs[0].value
  const url = inputs[1].value

  const photo = generetePhoto(title, url)

  photos.prepend(photo)

  closeMobal()
}

initialPhotos.forEach((photo) => {
  const $photo = generetePhoto(photo.name, photo.link)
  photos.appendChild($photo)
})

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

const openPoppa = () => {
  poppa = document.querySelector('.poppa')
  poppa.classList.add('poppa--active')
}

const closePoppa = () => {
  poppa.classList.remove('poppa--active')
  document.querySelector('.page').removeChild(poppa)
  poppa = null
}

const deletePhoto = (photo) => {
  photo.remove()
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    mobal && closeMobal()
    poppa && closePoppa()
  }
})

// agregue el evento submit en el document para que los formularios agregados dinamico del mobal
document.addEventListener('submit', (e) => {
  e.preventDefault()

  // update profile
  if (e.target.id === 'form-update-profile') {
    heandleUpdateProfile(e)
  }

  // add new card
  if (e.target.id === 'form-add-card') {
    handleAddNewCard(e)
  }
})

// crear un observador para observar la variable $mobal para saber si tiene un mobal asignado como valor para incertar las funciones de close
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {

    if (mutation.type === 'childList') {

      mobal?.addEventListener('click', (e) => {
        if (e.target === mobal) {
          closeMobal()
        }
      })
      mobal?.querySelector('.mobal__icon-close').addEventListener('click', () => {
        closeMobal()
      })
      poppa?.addEventListener('click', (e) => {
        if (e.target === poppa) {
          closePoppa()
        }
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

loeadProfile()

