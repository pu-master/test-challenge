/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/react'

const style = css`
  width: calc(100% - 0px);
  margin-bottom: 15px;
  vertical-align: top;
`

interface Props {
  children: React.ReactNode
}

function FieldWrapper({ children }: Props) {
  return (
    <div css={style}>
      { children }
    </div>
  )
}

export default FieldWrapper
