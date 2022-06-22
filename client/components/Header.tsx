/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/react'

const style = css`
  margin-bottom: 15px;
  font-weight: 500;
  font-size: 36px;
  color: #5acee8;
`

function Header() {
  return (
    <div css={style}>
      S'inscrire
    </div>
  )
}

export default Header
