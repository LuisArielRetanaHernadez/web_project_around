const showErrorInput = (formElement, inputForm, errorMessage) => {
  const errorElementMessage = formElement.querySelector(`#${inputForm.id}-error`)
  inputForm.classList.add('form__input_type_error')
  errorElementMessage.textContent = errorMessage
  errorElementMessage.classList.add('form__input-error_active')
}
const hiddeErrorInput = (formElement, inputForm) => {
  const errorElementMessage = formElement.querySelector(`#${inputForm.id}-error`)
  inputForm.classList.remove('form__input_type_error')
  errorElementMessage.classList.remove('form__input-error_active')
  errorElementMessage.textContent = ''
}

const checkInputValidity = (formElement, inputForm) => {
  if (!inputForm.validity.valid) {
    showErrorInput(formElement, inputForm, inputForm.validationMessage)
  } else {
    hiddeErrorInput(formElement, inputForm)
  }
}

const hasInvalidInput = (inputs) => {
  // return !formElement.checkValidity()
  return inputs.some((input) => {
    return !input.validity.valid
  })
}

const toggleButtonState = (inputs, buttonSubmit) => {
  console.log('has valid ', hasInvalidInput(inputs))
  if (hasInvalidInput(inputs)) {
    buttonSubmit.classList.add('form__button-submit_disabled')
    buttonSubmit.setAttribute('disabled', true)
  } else {
    buttonSubmit.classList.remove('form__button-submit_disabled')
    buttonSubmit.removeAttribute('disabled')
  }
}

const setEventListeners = formElement => {
  const inputs = Array.from(formElement.querySelectorAll('.form__input'))
  const buttonSubmit = formElement.querySelector('.form__button-submit')
  toggleButtonState(inputs, buttonSubmit)
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(formElement, input)
      toggleButtonState(inputs, buttonSubmit)
    })
  })
}

const enableValidation = () => {
  const forms = Array.from(document.querySelectorAll('.form'))
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', (e) => {
      e.preventDefault()
    })
    const formsSelect = Array.from(formElement.querySelectorAll('[data-field-select]'))
    formsSelect.forEach((elemetForm) => {
      console.log('formSelect ', elemetForm)
      setEventListeners(elemetForm)
    })
  })
}