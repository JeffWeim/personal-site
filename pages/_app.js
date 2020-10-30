import { request } from '../lib/datocms'
import { ThemeProvider } from 'styled-components'
import { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import useDarkMode from 'use-dark-mode'
import { useWindowSize } from 'react-use'

if (typeof window !== 'undefined') require('@google/model-viewer')

import { darkTheme, lightTheme } from '../theme'

import Head from '../components/Head'
import Header from '../components/Header'
import SunMoon from '../components/SunMoon'

import '../public/fonts/fonts.css'

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
  } = props

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

      <main>
        <SunMoon dm={dm} />
        <Header dm={dm} resumeUrl={url} />

        <Component {...pageProps} />

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
              padding: `10% 0 0 ${width < 768 ? 'calc(50vw - 5px)' : 'calc(50vw + 15%)'}`,
              zIndex: '-1',
            }}
          />
        </ModelViewerWrapper>
      </main>
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

export default MyApp
