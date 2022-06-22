/**
 * A validator for a required field.
 * @param value {string} The input value.
 * @returns A custom error message if a value is invalid, otherwise an empty string.
 */
 const validatorRequired = (value: string): string => {
  if (value === '') {
    return 'Ce champ est requis'
  }
  return ''
}

/**
 * A validator for a phone field.
 * @param value {string} The input value.
 * @returns A custom error message if a value is invalid, otherwise an empty string.
 */
 const validatorPhone = (value: string): string => {
  const error = validatorRequired(value)
  if (error !== '') {
    return error
  }

  const regEx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  if (!value.toLowerCase().match(regEx)) {
    return 'Phone invalide'
  }
  return ''
}

/**
 * A validator for an email field.
 * @param value {string} The input value.
 * @returns A custom error message if a value is invalid, otherwise an empty string.
 */
 const validatorEmail = (value: string): string => {
  const error = validatorRequired(value)
  if (error !== '') {
    return error
  }

  const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!value.toLowerCase().match(regEx)) {
    return 'Adresse email invalide'
  }
  return ''
}

/**
 * A validator for a password field.
 * @param value {string} The input value.
 * @returns A custom error message if a value is invalid, otherwise an empty string.
 */
 const validatorPassword = (value: string): string => {
  const error = validatorRequired(value)
  if (error !== '') {
    return error
  }

  const regEx = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&])[0-9a-zA-Z!@#$%^&]{8,}$/
  if (!value.match(regEx)) {
    return 'The password must be 8 characters at minimum and have at least one uppercase letter, one number, and one special character.'
  }
  return ''
}

/**
 * A validator for a confirm-password field.
 * @param password {string} The password to match.
 * @param value {string} The input value.
 * @returns A custom error message if a value is invalid, otherwise an empty string.
 */
 const validatorRePassword = (password: string, value: string): string => {
  const error = validatorRequired(value)
  if (error !== '') {
    return error
  }

  if (value !== password) {
    return 'Le mot de passe est différent du mot de passe de confirmation'
  }
  return ''
}
/**
 * A validator for a required checkbox field.
 * @param value {boolean} The input value.
 * @returns A custom error message if a value is invalid, otherwise an empty string.
 */
 const validatorCheckbox = (value: boolean): string => {
  if (!value) {
    return 'Ce champ est requis'
  }
  return ''
}

export {
  validatorRequired,
  validatorPhone,
  validatorEmail,
  validatorPassword,
  validatorRePassword,
  validatorCheckbox,
}
