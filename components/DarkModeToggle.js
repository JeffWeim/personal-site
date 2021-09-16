import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Toggle from './Toggle'

const DarkModeToggle = props => {
  const { dm } = props

  return (
    <Container>
      <Button type='button' onClick={dm.disable}>
        ☀
      </Button>
      <Toggle checked={dm.value} onChange={dm.toggle} />
      <Button type='button' onClick={dm.enable}>
        ☾
      </Button>
    </Container>
  )
}

const Button = styled.button`
  -webkit-appearance: none;
  background: none;
  border: none;
  color: inherit;
  width: 20px;
`

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 95px;
`

DarkModeToggle.propTypes = {
  dm: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default DarkModeToggle
