import { css } from '@emotion/react'

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

export {
  styleButton,
}
