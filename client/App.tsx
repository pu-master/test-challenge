/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/react'

import Header from './components/Header'
import SubHeader from './components/SubHeader'
import BreederLink from './components/BreederLink'
import GoogleButton from './components/GoogleButton'
import FbButton from './components/FbButton'
import SignupForm from './components/SignupForm'

const styleWrapper = css`
  position: relative;
  width: min-content;
  max-width: 100%;
  margin: 30px auto;
  padding-left: 50px;
  padding-right: 50px;
`

const styleInnerWrapper = css`
  position: relative;
  width: 540px;
  max-width: 100%;
  margin: auto;
  padding: 30px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 0 14px 0 rgb(0 0 0 / 15%);
  z-index: 1;
`

const styleSeparator = css`
  width: 100%;
  height: 1px;
  margin: 20px 0;
  background: #d7dae0;
`

function App() {
  return (
    <div css={styleWrapper}>
      <div css={styleInnerWrapper}>
        <Header />
        <SubHeader />
        <BreederLink />
        <GoogleButton />
        <FbButton />
        <div css={styleSeparator}></div>
        <SignupForm />
      </div>
    </div>
  )
}

export default App
