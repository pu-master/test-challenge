/** @jsx jsx */
import React, { useState } from 'react'
import { css, jsx } from '@emotion/react'

import FieldWrapper from './FieldWrapper'
import ErrorMessage from './ErrorMessage'

// Label style.
const styleLabel = css`
  margin-bottom: 6px;
  text-align: left;
  color: #8c96a3;
  font-size: 14px;
  font-weight: 700;
`

const styleAsterisk = css`
  display: inline-block;
  margin-left: 6px;
  color: #ff453e;
`

const styleInputWrapper = css`
  position: relative;
  width: 100%;
  height: fit-content;
  block-size: fit-content;
`

// Normal input styles.
const styleInput = css`
  width: 100%;
  padding: 7px 42px 7px 12px;
  font-size: 16px;
  border-radius: 10px;
  border: 2px solid #d7dae0;
  color: #707070!important;
  -webkit-text-fill-color: #707070!important;
  background: white;
`

// Styles of inputs in an error state.
const styleInputError = css`
  border-color: rgb(255, 69, 62) !important;
`

// Background styles of inputs.
const getBackgroundStyles = (image: string) => (
  css`
    background-image: url(${image});
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-size: 16px 18px;
    background-position: 98% 50%;
    cursor: auto;
  `
)

interface Props {
  type?: string
  label: string
  image?: string
  error: string
  onValidate: Function
  onChange: Function
}

function InputField({ type = 'text', label, image, error, onValidate, onChange }: Props) {
  const [value, setValue] = useState('')

  const handleChange = (event: React.ChangeEvent) => {
    const newValue: string = (event.target as HTMLInputElement).value
    setValue(newValue)
    onChange(newValue)
    onValidate(newValue)
  }

  const handleBlur = (event: React.SyntheticEvent) => {
    onValidate((event.target as HTMLInputElement).value)
  }

  return (
    <FieldWrapper>
      <div css={styleLabel}>
        { label }
        <div css={styleAsterisk}>
          *
        </div>
      </div>
      <div css={styleInputWrapper}>
        <input
          type={type}
          css={css(
            styleInput,
            image ? getBackgroundStyles(image) : null,
            error ? styleInputError : null
          )}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <ErrorMessage error={error} />
    </FieldWrapper>
  )
}

export default InputField
