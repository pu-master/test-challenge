/** @jsx jsx */
import React, { useState } from 'react'
import { css, jsx } from '@emotion/react'

import FieldWrapper from './FieldWrapper'
import ErrorMessage from './ErrorMessage'

const styleCheckbox = css`
  position: relative;
  display: inline-block;
  width: 10px;
  height: 10px;
  text-align: left;
  cursor: pointer;

  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 16px;
    height: 16px;
    top: 0;
    left: 0;
    border: 2px solid #d7dae0;
    border-radius: 2px;
    background-color: white;
  }

  &:checked:before {
    border-color: #5acee8;
  }

  &:checked:after {
    content: '';
    display: block;
    width: 4px;
    height: 8px;
    border: solid #5acee8;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    position: absolute;
    top: 3px;
    left: 6px;
  }
`

const styleLabel = css`
  margin-left: 16px;
  color: #616b77;
  font-weight: 500;
  font-size: 14px;
  text-align: left;
  vertical-align: middle;

  a {
    color: inherit;
    font-weight: inherit;

    &:hover {
      color: #5acee8;
      text-decoration: underline;
    }
  }
`

interface Props {
  id: string
  labelContents: React.ReactNode
  error: string
  onValidate: Function
  onChange: Function
}

function CheckboxField({ id, labelContents, error, onValidate, onChange }: Props) {
  const [checked, setChecked] = useState(false)

  const handleChange = (event: React.ChangeEvent) => {
    const newValue = (event.target as HTMLInputElement).checked
    setChecked(newValue)
    onChange(newValue)
    onValidate(newValue)
  }

  return (
    <FieldWrapper>
      <input
        type="checkbox"
        id={id}
        css={styleCheckbox}
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={id} css={styleLabel}>
        { labelContents }
      </label>
      <ErrorMessage error={error} />
    </FieldWrapper>
  )
}

export default CheckboxField
