import {
  validatorRequired,
  validatorPhone,
  validatorEmail,
  validatorPassword,
  validatorRePassword,
  validatorCheckbox,
} from '../shared/validators'

test('Should validate a required field', () => {
  expect(validatorRequired('')).toBe('Ce champ est requis')
  expect(validatorRequired('some value')).toBe('')
})

test('Should validate a phone field', () => {
  expect(validatorPhone('')).toBe('Ce champ est requis')

  expect(validatorPhone('invalid phone number')).toBe('Phone invalide')
  expect(validatorPhone('12345678')).toBe('Phone invalide')
  expect(validatorPhone('+(12)34567890')).toBe('Phone invalide')
  expect(validatorPhone('+(123)4567 890')).toBe('Phone invalide')

  expect(validatorPhone('+1234567890')).toBe('')
  expect(validatorPhone('+(123)4567890')).toBe('')
  expect(validatorPhone('+(123)456 7890')).toBe('')
})

test('Should validate an email field', () => {
  expect(validatorEmail('')).toBe('Ce champ est requis')
  expect(validatorEmail('invalid email')).toBe('Adresse email invalide')
  expect(validatorEmail('invalid email@')).toBe('Adresse email invalide')

  expect(validatorEmail('test@test.com')).toBe('')
})

test('Should validate a password field', () => {
  expect(validatorPassword('')).toBe('Ce champ est requis')

  const error = 'The password must be 8 characters at minimum and have at least one uppercase letter, one number, and one special character.'
  expect(validatorPassword('12345!Q')).toBe(error)
  expect(validatorPassword('123456!q')).toBe(error)
  expect(validatorPassword('aaaaaaqQ')).toBe(error)
  expect(validatorPassword('123456qQ')).toBe(error)

  expect(validatorPassword('123456!Q')).toBe('')
})

test('Should validate a confirm password field', () => {
  expect(validatorRePassword('password', '')).toBe('Ce champ est requis')
  expect(validatorRePassword('password', 'differnt password')).toBe('Le mot de passe est différent du mot de passe de confirmation')

  expect(validatorRePassword('password', 'password')).toBe('')
})

test('Should validate a check box field', () => {
  expect(validatorCheckbox(false)).toBe('Ce champ est requis')

  expect(validatorCheckbox(true)).toBe('')
})
