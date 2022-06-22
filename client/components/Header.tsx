/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/react'

const style = css`
  margin-bottom: 15px;
  font-weight: 500;
  font-size: 36px;
  color: #5acee8;
`

interface Props {
  label: string
}

function Header({ label }: Props) {
  return (
    <div css={style}>
      { label }
    </div>
  )
}

export default Header
