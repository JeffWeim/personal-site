import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styled, { ThemeProvider } from 'styled-components'
import { useWindowSize } from 'react-use'
import dynamic from 'next/dynamic'
import useDarkMode from 'use-dark-mode'
import getConfig from 'next/config'

import { request } from '../lib/datocms'

import { darkTheme, lightTheme } from '../theme'

import '../public/fonts/fonts.css'

// eslint-disable-next-line
if (typeof window !== 'undefined') require('@google/model-viewer')

const { serverRuntimeConfig } = getConfig()

const Head = dynamic(() => import('../components/Head'))
const Header = dynamic(() => import('../components/Header'))
const SunMoon = dynamic(() => import('../components/SunMoon'))

const variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: 0.5,
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4 },
  },
}

const GLOBAL_QUERY = `
  {
    global {
      resume {
        url
      }
      _seoMetaTags {
        tag
        content
        attributes
      }
    }
    _site {
      globalSeo {
        fallbackSeo {
          description
          title
          image {
            url
          }
        }
        siteName
        titleSuffix
      }
      favicon: faviconMetaTags {
        attributes
        content
        tag
      }
    }
  }
`

const MyApp = props => {
  const {
    Component,
    pageProps,
    data: {
      global: {
        resume: { url },
        _seoMetaTags,
      },
      _site,
    },
    router: { pathname },
  } = props

  const dm = useDarkMode(true)

  const [isLoaded, setIsLoaded] = useState(false)
  const [windowWidth, setWindowWidth] = useState(null)
  const [theme, setTheme] = useState(dm.value ? darkTheme : lightTheme)

  const { width } = useWindowSize()

  useEffect(() => {
    setTheme(dm.value ? darkTheme : lightTheme)
  }, [dm.value])

  useEffect(() => {
    setWindowWidth(width)
  }, [width])

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    setWindowWidth(width)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Head
        site={_site}
        seoMetaTags={_seoMetaTags}
        gaCode={serverRuntimeConfig.gaCode}
      />

      <Header dm={dm} resumeUrl={url} />
      <motion.main
        animate="enter"
        exit="exit"
        initial="initial"
        key={pathname}
        variants={variants}
      >
        <SunMoon dm={dm || { value: false}} />

        {/* eslint-disable-next-line */}
        <Component {...pageProps} />

        <ModelViewerWrapper isLoaded={isLoaded} >
          <model-viewer
            tabIndex="-1"
            loading="lazy"
            src="/tree_palmDetailedShort.glb"
            shadow-intensity="0.5"
            min-camera-orbit="auto auto 2.5m"
            max-camera-orbit="auto auto 5m"
            camera-orbit="404.8deg 77.08deg 4.75m"
            field-of-view="45deg"
            exposure={dm.value ? '.25' : '0.55'}
            camera-target="0m 2m 0m"
            auto-rotate=""
            style={{
              position: 'fixed',
              bottom: 0,
              right: 0,
              height: '100%',
              width: '45%',
              minHeight: windowWidth > 1024 ? '1400px' : null,
              zIndex: '-1',
              outline: 'none',
              pointerEvents: 'none'
            }}
          />
        </ModelViewerWrapper>
      </motion.main>
    </ThemeProvider>
  )
}

const ModelViewerWrapper = styled.div`
  opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0)};
  transition: all 300ms ease;
  pointer-events: none;
  outline: none;
  outline-color: transparent;

  &:focus {
    outline: none;
    outline-color: transparent;
  }
`

MyApp.getInitialProps = async () => {
  const data = await request({
    query: GLOBAL_QUERY,
    variables: {},
  })

  return {
    data,
  }
}

MyApp.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.any]).isRequired,
  pageProps: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  router: PropTypes.objectOf(PropTypes.any).isRequired
}

export default MyApp
