import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Link from 'next/link'

const LinkElement = props => {
  const {  children, external, href, passHref, textDecoration } = props

  return (
    <Link
      href={href || ''}
      // as={as || ''}
      passHref={passHref}
    >
      <AnchorElement
        // href={href || ''}
        target={external ? '_blank' : null}
        $textDecoration={textDecoration}
      >
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
  external: false,
  passHref: false,
  textDecoration: false,
}

LinkElement.propTypes = {
  external: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
  href: PropTypes.string.isRequired,
  passHref: PropTypes.bool,
  textDecoration: PropTypes.bool,
}

export default LinkElement
