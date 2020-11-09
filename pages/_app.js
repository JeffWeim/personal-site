import { motion, AnimatePresence } from 'framer-motion'
import { request } from '../lib/datocms'
import { ThemeProvider } from 'styled-components'
import { useState, useEffect } from 'react'
import { useWindowSize } from 'react-use'
import dynamic from 'next/dynamic'
import getConfig from 'next/config'
import Router from 'next/router'
import styled, { css } from 'styled-components'
import useDarkMode from 'use-dark-mode'
import withGA from 'next-ga'
import { useAmp } from 'next/amp'

if (typeof window !== 'undefined') require('@google/model-viewer')

const { serverRuntimeConfig } = getConfig()

import { darkTheme, lightTheme } from '../theme'

const Head = dynamic(() => import('../components/Head'))
const Header = dynamic(() => import('../components/Header'))
const SunMoon = dynamic(() => import('../components/SunMoon'))

import '../public/fonts/fonts.css'

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
      },
    },
    router: { pathname },
  } = props

  const isAmp = useAmp()
  const dm = useDarkMode(false, { storageKey: null })
  const [theme, setTheme] = useState(dm.value ? darkTheme : lightTheme)
  const [isLoaded, setIsLoaded] = useState(false)

  const { width } = useWindowSize()

  useEffect(() => {
    setTheme(dm.value ? darkTheme : lightTheme)
  }, [dm.value])

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 500)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Head />

      <motion.main
        animate='enter'
        exit='exit'
        initial='initial'
        key={pathname}
        variants={variants}
      >
        <SunMoon dm={dm} />
        <Header dm={dm} resumeUrl={url} />

        <Component {...pageProps} />

        {!isAmp && (
          <ModelViewerWrapper isLoaded={isLoaded}>
            <model-viewer
              loading='eager'
              src='/tree_palmDetailedShort.glb'
              shadow-intensity='0.5'
              min-camera-orbit='auto auto 2.5m'
              max-camera-orbit='auto auto 5m'
              camera-orbit='404.8deg 77.08deg 4.75m'
              field-of-view='45deg'
              exposure={dm.value ? '.25' : '0.55'}
              camera-target='0m 2m 0m'
              auto-rotate=''
              style={{
                position: 'fixed',
                bottom: 0,
                right: 0,
                height: '100%',
                width: '100%',
                minHeight: width > 1024 ? '1400px' : null,
                padding: `10% 0 0 ${
                  width < 768 ? 'calc(50vw - 5px)' : 'calc(50vw + 15%)'
                }`,
                zIndex: '-1',
              }}
            />
          </ModelViewerWrapper>
        )}
      </motion.main>
    </ThemeProvider>
  )
}

const ModelViewerWrapper = styled.div`
  opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0)};
  transition: all 300ms ease;
  pointer-events: none;
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

export default withGA(serverRuntimeConfig.gaCode, Router)(MyApp)
