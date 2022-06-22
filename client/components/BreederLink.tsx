/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/react'

const style = css`
  margin-bottom: 30px;
`

function BreederLink() {
  return (
    <div css={style}>
      Vous êtes un refuge, un éleveur, un vétérinaire ou toiletteur ?
      <a href="/inscription-tipaw">Cliquez-ici</a>
    </div>
  )
}

export default BreederLink
