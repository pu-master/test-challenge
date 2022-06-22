/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/react'

const style = css`
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 600;
`

function SubHeader() {
  return (
    <div css={style}>
      Rejoignez Tipaw aujourd'hui. C'est gratuit !
    </div>
  )
}

export default SubHeader
