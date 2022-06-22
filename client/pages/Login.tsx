/** @jsx jsx */
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useCookies } from 'react-cookie'
import { Navigate } from "react-router-dom"
import { css, jsx } from '@emotion/react'

import { COOKIE_TOKEN } from '../constants'
import { LOGIN, GET_ACCOUNT } from '../graphql/queries'

import Header from '../components/Header'
import FieldWrapper from '../components/FieldWrapper'
import InputField from '../components/InputField'
import ErrorMessage from '../components/ErrorMessage'

import {
  styleWrapper,
  styleInnerWrapper,
  styleSeparator,
  styleButton,
  styleSubmit,
  styleForm,
} from '../styles/common'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [cookies, setCookie] = useCookies([COOKIE_TOKEN])

  const { loading: getAccountLoading, data } = useQuery(GET_ACCOUNT)
  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      if (data && data.login && data.login.token) {
        setCookie(COOKIE_TOKEN, data.login.token)
      }
      // TODO: When a token is not returned somehow, show an error.
    },
    refetchQueries: [
      { query: GET_ACCOUNT },
    ],
  })

  /**
   * The form submit event handler.
   */
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()

    login({
      variables: {
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
        error={error.message || 'Failed to login.'}
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
    <div css={styleWrapper}>
      <div css={styleInnerWrapper}>
        <Header label="Login" />
        <div css={styleSeparator}></div>
        <form css={styleForm} onSubmit={handleSubmit}>
          <InputField
            type="email"
            label="Votre email"
            onChange={setEmail}
          />
          <InputField
            type="password"
            label="Votre mot de passe"
            onChange={setPassword}
          />
          <FieldWrapper>
            <button
              type="submit"
              css={css(styleButton, styleSubmit)}
              disabled={loading}
            >
              Login
            </button>
            { renderError() }
          </FieldWrapper>
        </form>
      </div>
    </div>
  )
}

export default Login
