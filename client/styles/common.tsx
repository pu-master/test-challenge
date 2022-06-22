import { css } from '@emotion/react'

const styleWrapper = css`
  position: relative;
  width: min-content;
  max-width: 100%;
  margin: 30px auto;
  padding-left: 50px;
  padding-right: 50px;
`

const styleInnerWrapper = css`
  position: relative;
  width: 540px;
  max-width: 100%;
  margin: auto;
  padding: 30px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 0 14px 0 rgb(0 0 0 / 15%);
  z-index: 1;
`

const styleSeparator = css`
  width: 100%;
  height: 1px;
  margin: 20px 0;
  background: #d7dae0;
`

const styleButton = css`
  position: relative;
  display: flex;
  width: 100%;
  height: 40px;
  align-items: center;
  justify-content: center;
  padding: 0px 24px;
  box-sizing: border-box!important;
  border-radius: 15px;
  text-align: center;
  line-height: unset;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0;
  box-shadow: none;
  white-space: nowrap;
  cursor: pointer;
  -webkit-box-pack: center;

  &:before {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    width: 100%;
    height: 100%;
    content: '';
    border-radius: 100px;
    pointer-events: none;
  }

  &:hover:before {
    background: rgba(255, 255, 255, 0.1);
  }
`

const styleSubmit = css`
  background-color: #ffcc01;
  border: none;
  color: white;
`

const styleForm = css`
  margin-top: 25px;
`

export {
  styleWrapper,
  styleInnerWrapper,
  styleSeparator,
  styleButton,
  styleSubmit,
  styleForm,
}
