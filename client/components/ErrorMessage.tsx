/** @jsx jsx */
import React from 'react'
import { css, jsx, SerializedStyles } from '@emotion/react'

const style = css`
  margin-top: 5px;
  font-size: 12px;
  font-weight: 600;
  color: rgb(255, 69, 62);
  text-align: left;
`

interface Props {
  error: string
  additionalCss?: SerializedStyles
}

function ErrorMessage({ error, additionalCss }: Props) {
  if (error === '') {
    return null
  }

  return (
    <div css={css(style, additionalCss || null)}>
      { error }
    </div>
  )
}

export default ErrorMessage
