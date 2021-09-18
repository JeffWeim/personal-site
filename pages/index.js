import PropTypes from 'prop-types'
import React from 'react'
import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import dynamic from 'next/dynamic'

import { request } from '../lib/datocms'

const PaddedView = dynamic(() => import('../components/PaddedView'))
const FadeIn = dynamic(() => import('../components/FadeIn'))

const HOMEPAGE_QUERY = `
  query {
    homePage {
      intro(markdown: false)
    }
  }
`

const Home = props => {
  const {
    data: {
      homePage: { intro },
    },
  } = props

  return (
    <>
      <Head>
        <title>Jeff Weimer | Moar Feetures Plz</title>
      </Head>

      <PaddedView>
        <Section>
          <FadeIn delay={300}>
            {/* eslint-disable-next-line */}
            <ReactMarkdown children={intro} />
          </FadeIn>
        </Section>
      </PaddedView>
    </>
  )
}

const Section = styled.section`
  height: calc(100vh - 200px);
  display: flex;
  align-items: center;
`

export async function getStaticProps(context) {
  const data = await request({
    query: HOMEPAGE_QUERY,
    variables: {},
    preview: context.preview,
  })

  return {
    props: { data },
  }
}

Home.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default Home
