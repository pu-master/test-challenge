/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/react'

import FieldWrapper from './FieldWrapper'
import { styleButton } from '../styles/common'

const FbIconPath = require('../resources/fb-icon.svg')

const styleFbButton = css`
  background-color: #3b5998;
  border: none;
  color: white;
`

const styleImgWrapper = css`
  margin-right: 12px;
  width: 20px;
  font-size: 20px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  align-items: center;
`

function FbButton() {
  return (
    <FieldWrapper>
      <button
        type="button"
        css={css(styleButton, styleFbButton)}
      >
        <div css={styleImgWrapper}>
          <img src={FbIconPath.default} alt="Google" />
        </div>
        Inscription avec Facebook
      </button>
    </FieldWrapper>
  )
}

export default FbButton
