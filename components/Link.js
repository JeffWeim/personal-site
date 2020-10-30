import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Link from 'next/Link'

const LinkElement = props => {
  const { as, children, external, href, passHref } = props

  return (
    <Link href={href || ''} as={as || ''} passHref={passHref}>
      <AnchorElement href={href || ''} target={external ? '_blank' : null}>
        {children}
      </AnchorElement>
    </Link>
  )
}

const AnchorElement = styled.a`
  border-bottom: none;
  cursor: pointer;

  ${({ textDecoration, theme }) =>
    textDecoration &&
    css`
      border-bottom: 1px solid ${theme.text.primary};
    `}
`

LinkElement.defaultProps = {
  as: '',
  passHref: false,
  textDecoration: false,
}

LinkElement.propTypes = {
  as: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
  href: PropTypes.string.isRequired,
  passHref: PropTypes.bool,
  textDecoration: PropTypes.bool,
}

export default LinkElement
