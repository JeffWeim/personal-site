import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'

const Toggle = props => {
  const { checked, onChange } = props

  return (
    <>
      <Checkbox id="react-switch-new" type='checkbox' checked={checked} onChange={onChange} />
      <Label htmlFor="react-switch-new">
        <Button isActive={checked} />
      </Label>
    </>
  )
}

const Button = styled.span`
  background: #fff;
  border-radius: 23px;
  box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
  content: '';
  height: 23px;
  left: 1px;
  position: absolute;
  top: 1px;
  transition: 0.2s;
  width: 23px;

  ${({ isActive }) =>
    isActive &&
    css`
      left: calc(100% - 1px);
      transform: translateX(-100%);
    `}
`

const Label = styled.label`
  align-items: center;
  background: grey;
  border-radius: 100px;
  cursor: pointer;
  display: flex;
  height: 25px;
  justify-content: space-between;
  position: relative;
  transition: background-color 0.2s;
  width: 50px;

  &:active {
    ${Button} {
      width: 30px;
    }
  }
`

const Checkbox = styled.input`
  height: 0;
  margin: 0;
  visibility: hidden;
  width: 0;
`

Toggle.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Toggle
