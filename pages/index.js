import { request } from '../lib/datocms'
import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'

import PaddedView from '../components/PaddedView'
import FadeIn from '../components/FadeIn'

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
        <title>Home - Jeff Weimer</title>
      </Head>

      <PaddedView>
        <Section>
          <FadeIn>
            <ReactMarkdown children={intro} linkTarget='_blank' />
          </FadeIn>
        </Section>
      </PaddedView>
    </>
  )
}

const Section = styled.section``

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

export default Home
