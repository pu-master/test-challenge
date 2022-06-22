/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/react'

import Header from '../components/Header'
import SubHeader from '../components/SubHeader'
import BreederLink from '../components/BreederLink'
import GoogleButton from '../components/GoogleButton'
import FbButton from '../components/FbButton'
import SignupForm from '../components/SignupForm'

import {
  styleWrapper,
  styleInnerWrapper,
  styleSeparator,
} from '../styles/common'

function Signup() {
  return (
    <div css={styleWrapper}>
      <div css={styleInnerWrapper}>
        <Header label="S'inscrire" />
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

export default Signup
