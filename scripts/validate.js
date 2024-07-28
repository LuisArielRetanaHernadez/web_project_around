const showErrorInput = (formElement, inputForm, errorMessage, inputSetting) => {
  const inputErrorClass = inputSetting?.inputErrorClass
  const errorClass = inputSetting?.errorClass

  const errorElementMessage = formElement.querySelector(`#${inputForm.id}-error`)
  inputForm.classList.add(inputErrorClass ? inputErrorClass : 'form__input_type_error')
  errorElementMessage.textContent = errorMessage
  errorElementMessage.classList.add(errorClass ? errorClass : 'form__input-error_active')
}
const hiddeErrorInput = (formElement, inputForm, inputSetting) => {
  const inputErrorClass = inputSetting?.inputErrorClass
  const errorClass = inputSetting?.errorClass

  const errorElementMessage = formElement.querySelector(`#${inputForm.id}-error`)
  inputForm.classList.remove(inputErrorClass ? inputErrorClass : 'form__input_type_error')
  errorElementMessage.classList.remove(errorClass ? errorClass : 'form__input-error_active')
  errorElementMessage.textContent = ''
}

const checkInputValidity = (formElement, inputForm, inputSetting) => {
  if (!inputForm.validity.valid) {
    showErrorInput(formElement, inputForm, inputForm.validationMessage, inputSetting)
  } else {
    hiddeErrorInput(formElement, inputForm, inputSetting)
  }
}

const hasInvalidInput = (inputs) => {
  return inputs.some((input) => {
    return !input.validity.valid
  })
}

const toggleButtonState = (inputs, buttonSubmit, settigButton) => {
  const inactiveButtonClass = settigButton?.inactiveButtonClass
  if (hasInvalidInput(inputs)) {
    buttonSubmit.classList.add(inactiveButtonClass ? inactiveButtonClass : 'form__button-submit_disabled')
    buttonSubmit.setAttribute('disabled', true)
  } else {
    buttonSubmit.classList.remove('form__button-submit_disabled')
    buttonSubmit.removeAttribute('disabled')
  }
}

const setEventListeners = (formElement, elementsSelect) => {
  const { inputSelector, submitButtonSelector } = elementsSelect

  const inputs = Array.from(formElement.querySelectorAll(inputSelector ? inputSelector : '.form__input'))
  const buttonSubmit = formElement.querySelector(submitButtonSelector ? submitButtonSelector : '.form__button-submit')

  const settigButton = {
    inactiveButtonClass: elementsSelect?.inactiveButtonClass
  }
  toggleButtonState(inputs, buttonSubmit, settigButton)
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      const inputSetting = {
        inputErrorClass: elementsSelect?.inputErrorClass,
        errorClass: elementsSelect?.errorClass,
      }
      checkInputValidity(formElement, input, inputSetting)
      toggleButtonState(inputs, buttonSubmit)
    })
  })
}

export const enableValidation = (setting = {}) => {
  const formSelector = setting.formSelector
  const forms = Array.from(document.querySelectorAll(formSelector ? formSelector : '.form'))
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', (e) => {
      e.preventDefault()
    })
    const formsSelect = Array.from(formElement.querySelectorAll('[data-field-select]'))
    formsSelect.forEach((elemetForm) => {
      const elementsSelect = {
        settinginputSelector: setting?.settinginputSelector,
        submitButtonSelector: setting?.submitButtonSelector,
        inputErrorClass: setting?.inputErrorClass,
        errorClass: setting?.errorClass,
        inactiveButtonClass: setting?.inactiveButtonClass,
      }
      setEventListeners(elemetForm, elementsSelect)
    })
  })
}