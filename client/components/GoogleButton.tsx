/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/react'

import FieldWrapper from './FieldWrapper'
import { styleButton } from '../styles/common'

const GoogleIconPath = require('../resources/google-icon.svg')

const styleGoogleButton = css`
  background-color: white;
  border: 2px solid #707070;
  color: #707070;
`

const styleImgWrapper = css`
  display: flex;
  width: 20px;
  margin-right: 12px;
  font-size: 20px;
  -webkit-box-pack: center;
  justify-content: center;
  align-items: center;
`

function GoogleButton() {
  return (
    <FieldWrapper>
      <button
        type="button"
        css={css(styleButton, styleGoogleButton)}
      >
        <div css={styleImgWrapper}>
          <img src={GoogleIconPath.default} alt="Google" />
        </div>
        Inscription avec Google
      </button>
    </FieldWrapper>
  )
}

export default GoogleButton
