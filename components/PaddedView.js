import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const PaddedView = props => {
  const { children, maxWidth } = props

  return <Base maxWidth={maxWidth}>{children}</Base>
}

const Base = styled.div`
  margin: 0 auto;
  max-width: ${({ maxWidth }) => `${maxWidth}px`};
  padding: 10px 20px;
  width: 100%;

  @media screen and (min-width: ${({ theme }) => theme.screen.md}) {
    padding: 50px 20px;
    text-align: left;
  }
`

PaddedView.defaultProps = {
  maxWidth: 1400,
}

PaddedView.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node]).isRequired,
  maxWidth: PropTypes.number,
}

export default PaddedView
