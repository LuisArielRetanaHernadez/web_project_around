

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    mobal && closeMobal()
    poppa && closePoppa()
  }
})

