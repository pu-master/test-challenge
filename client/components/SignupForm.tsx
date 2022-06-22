/** @jsx jsx */
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useCookies } from 'react-cookie'
import { Navigate } from "react-router-dom"
import { css, jsx } from '@emotion/react'

import { COOKIE_TOKEN } from '../constants'
import { SIGNUP, GET_ACCOUNT } from '../graphql/queries'

import FieldWrapper from './FieldWrapper'
import InputField from './InputField'
import CheckboxField from './CheckboxField'
import ErrorMessage from './ErrorMessage'

import {
  styleButton,
  styleSubmit,
  styleForm,
} from '../styles/common'

import {
  validatorRequired,
  validatorPhone,
  validatorEmail,
  validatorPassword,
  validatorRePassword,
  validatorCheckbox,
} from '../../shared/validators'

// Base64-encoded images for input fields.
const imageName = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABHklEQVQ4EaVTO26DQBD1ohQWaS2lg9JybZ+AK7hNwx2oIoVf4UPQ0Lj1FdKktevIpel8AKNUkDcWMxpgSaIEaTVv3sx7uztiTdu2s/98DywOw3Dued4Who/M2aIx5lZV1aEsy0+qiwHELyi+Ytl0PQ69SxAxkWIA4RMRTdNsKE59juMcuZd6xIAFeZ6fGCdJ8kY4y7KAuTRNGd7jyEBXsdOPE3a0QGPsniOnnYMO67LgSQN9T41F2QGrQRRFCwyzoIF2qyBuKKbcOgPXdVeY9rMWgNsjf9ccYesJhk3f5dYT1HX9gR0LLQR30TnjkUEcx2uIuS4RnI+aj6sJR0AM8AaumPaM/rRehyWhXqbFAA9kh3/8/NvHxAYGAsZ/il8IalkCLBfNVAAAAABJRU5ErkJggg=='
const imagePassword = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACIUlEQVQ4EX2TOYhTURSG87IMihDsjGghBhFBmHFDHLWwSqcikk4RRKJgk0KL7C8bMpWpZtIqNkEUl1ZCgs0wOo0SxiLMDApWlgOPrH7/5b2QkYwX7jvn/uc//zl3edZ4PPbNGvF4fC4ajR5VrNvt/mo0Gr1ZPOtfgWw2e9Lv9+chX7cs64CS4Oxg3o9GI7tUKv0Q5o1dAiTfCgQCLwnOkfQOu+oSLyJ2A783HA7vIPLGxX0TgVwud4HKn0nc7Pf7N6vV6oZHkkX8FPG3uMfgXC0Wi2vCg/poUKGGcagQI3k7k8mcp5slcGswGDwpl8tfwGJg3xB6Dvey8vz6oH4C3iXcFYjbwiDeo1KafafkC3NjK7iL5ESFGQEUF7Sg+ifZdDp9GnMF/KGmfBdT2HCwZ7TwtrBPC7rQaav6Iv48rqZwg+F+p8hOMBj0IbxfMdMBrW5pAVGV/ztINByENkU0t5BIJEKRSOQ3Aj+Z57iFs1R5NK3EQS6HQqF1zmQdzpFWq3W42WwOTAf1er1PF2USFlC+qxMvFAr3HcexWX+QX6lUvsKpkTyPSEXJkw6MQ4S38Ljdbi8rmM/nY+CvgNcQqdH6U/xrYK9t244jZv6ByUOSiDdIfgBZ12U6dHEHu9TpdIr8F0OP692CtzaW/a6y3y0Wx5kbFHvGuXzkgf0xhKnPzA4UTyaTB8Ph8AvcHi3fnsrZ7Wore02YViqVOrRXXPhfqP8j6MYlawoAAAAASUVORK5CYII='

const styleLogin = css`
  text-align: center;

  a {
    margin-left: 12px;
    color: #5acee8;
    font-weight: 700;
  }
`

function SignupForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [agreed, setAgreed] = useState(false)

  const [errorFirstName, setErrorFirstName] = useState('')
  const [errorLastName, setErrorLastName] = useState('')
  const [errorPhone, setErrorPhone] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorRePassword, setErrorRePassword] = useState('')
  const [errorAgreed, setErrorAgreed] = useState('')

  const [cookies, setCookie] = useCookies([COOKIE_TOKEN])

  const { loading: getAccountLoading, data } = useQuery(GET_ACCOUNT)
  const [signup, { loading, error }] = useMutation(SIGNUP, {
    onCompleted: (data) => {
      if (data && data.signup && data.signup.token) {
        setCookie(COOKIE_TOKEN, data.signup.token)
      }
      // TODO: When a token is not returned somehow, show an error.
    },
    refetchQueries: [
      { query: GET_ACCOUNT },
    ],
  })

  /**
   * A validator for fields.
   * @param field {string}
   * @returns {string} A custom error message if a validation fails.
   */
  const handleValidate = (field: string) => (value: string|boolean) => {
    let error = ''
    if (field === 'firstName') {
      error = validatorRequired(value as string)
      setErrorFirstName(error)
    } else if (field === 'lastName') {
      error = validatorRequired(value as string)
      setErrorLastName(error)
    } else if (field === 'phone') {
      error = validatorPhone(value as string)
      setErrorPhone(error)
    } else if (field === 'email') {
      error = validatorEmail(value as string)
      setErrorEmail(error)
    } else if (field === 'password') {
      error = validatorPassword(value as string)
      setErrorPassword(error)
    } else if (field === 'rePassword') {
      error = validatorRePassword(password, value as string)
      setErrorRePassword(error)
    } else if (field === 'agreed') {
      error = validatorCheckbox(value as boolean)
      setErrorAgreed(error)
    }
    return error
  }

  /**
   * The form submit event handler.
   */
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()

    const fieldsToValidate = [
      { field: 'firstName', value: firstName },
      { field: 'lastName', value: lastName },
      { field: 'phone', value: phone },
      { field: 'email', value: email },
      { field: 'password', value: password },
      { field: 'rePassword', value: rePassword },
      { field: 'agreed', value: agreed },
    ]

    // Check if there is any invalid field.
    let hasInvalid = false
    fieldsToValidate.forEach(({ field, value }) => {
      const error = handleValidate(field)(value)
      if (error !== '') {
        hasInvalid = true
      }
    })

    if (hasInvalid) {
      return
    }

    signup({
      variables: {
        firstName,
        lastName,
        phone,
        email,
        password,
      }
    })
  }

  // Render an error from server.
  const renderError = () => {
    if (!error) {
      return null
    }
    return (
      <ErrorMessage
        error={error.message || 'Failed to sign up.'}
        additionalCss={css`text-align: center;`}
      />
    )
  }

  if (!getAccountLoading && data && data.account) {
    return (
      <Navigate replace to="/dashboard" />
    )
  }


  return (
    <form css={styleForm} onSubmit={handleSubmit}>
      <InputField
        label="Votre prénom"
        image={imageName}
        error={errorFirstName}
        onValidate={handleValidate('firstName')}
        onChange={setFirstName}
      />
      <InputField
        label="Votre nom"
        error={errorLastName}
        onValidate={handleValidate('lastName')}
        onChange={setLastName}
      />
      <InputField
        type="tel"
        label="Votre phone"
        error={errorPhone}
        onValidate={handleValidate('phone')}
        onChange={setPhone}
      />
      <InputField
        type="email"
        label="Votre email"
        error={errorEmail}
        onValidate={handleValidate('email')}
        onChange={setEmail}
      />
      <InputField
        type="password"
        label="Votre mot de passe"
        image={imagePassword}
        error={errorPassword}
        onValidate={handleValidate('password')}
        onChange={setPassword}
      />
      <InputField
        type="password"
        label="Confirmez votre mot de passe"
        image={imagePassword}
        error={errorRePassword}
        onValidate={handleValidate('rePassword')}
        onChange={setRePassword}
      />
      <CheckboxField
        id="agree_conditions"
        labelContents={
          <React.Fragment>
            J'ai lu et accepté les&nbsp;
            <a target="_blank" href="/conditions-generales-d-utilisation">
              conditions générales d'utilisation
            </a>
            &nbsp;de Tipaw
          </React.Fragment>
        }
        error={errorAgreed}
        onValidate={handleValidate('agreed')}
        onChange={setAgreed}
      />
      <FieldWrapper>
        <button
          type="submit"
          css={css(styleButton, styleSubmit)}
          disabled={loading}
        >
          S'inscrire
        </button>
        { renderError() }
      </FieldWrapper>
      <FieldWrapper>
        <div css={styleLogin}>
          <span>Vous avez déjà un compte?</span>
          <a href="/connexion">S'identifier</a>
        </div>
      </FieldWrapper>
    </form>
  )
}

export default SignupForm
