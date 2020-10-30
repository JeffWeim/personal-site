import { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'

import DarkModeToggle from './DarkModeToggle'
import Link from './Link'

const Header = props => {
  const { dm, resumeUrl } = props

  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <HeaderElement>
      <Link href='/'>
        <Button>{dm.value ? '🙂' : '😎'}</Button>{' '}
      </Link>

      <Button
        type='button'
        onClick={() => setIsNavOpen(!isNavOpen)}
        style={{ position: 'relative', zIndex: 99 }}
      >
        🕹
      </Button>

      <AnimatePresence>
        {isNavOpen && (
          <>
            <ClickToClose
              onClick={() => setIsNavOpen(!isNavOpen)}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
            <Nav
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              initial={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <NavInner>
                <Links>
                  <Link href='/about'>
                    <LinkText
                      onClick={() => setIsNavOpen(false)}
                      onKeyPress={e => (e.keyCode === 13 ? setIsNavOpen(false) : null)}
                    >
                      About
                    </LinkText>
                  </Link>

                  <Link external passHref href={resumeUrl}>
                    <LinkText
                      onClick={() => setIsNavOpen(false)}
                      onKeyPress={e => (e.keyCode === 13 ? setIsNavOpen(false) : null)}
                    >
                      Resume
                    </LinkText>
                  </Link>
                </Links>

                <DarkModeToggle dm={dm} />
              </NavInner>
            </Nav>
          </>
        )}
      </AnimatePresence>
    </HeaderElement>
  )
}

const Button = styled.button`
  -webkit-appearance: none;
  border: none;
  background: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes[6]};
`

const ClickToClose = styled(motion.div)`
  background-color: #000;
  cursor: pointer;
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 5;
`

const HeaderElement = styled.header`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 20px;
`

const Links = styled.span`
  display: flex;
  flex-direction: column;
`

const LinkText = styled.span`
  padding: 7.5px 0 7.5px;
  display: block;
`

const Nav = styled(motion.nav)`
  background-color: ${({ theme }) => theme.bg.opposite};
  color: ${({ theme }) => theme.text.onPrimary};
  height: 100%;
  max-width: 300px;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 11;
`

const NavInner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 80px 20px 20px;
  justify-content: space-between;
`

Header.propTypes = {
  dm: PropTypes.objectOf(PropTypes.any).isRequired,
  resumeUrl: PropTypes.string.isRequired,
}

export default Header
