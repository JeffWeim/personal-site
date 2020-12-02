import { request } from '../lib/datocms'
import Head from 'next/head'
import ReactMarkdownWithHtml from 'react-markdown/with-html'
import styled from 'styled-components'
import dynamic from 'next/dynamic'

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
        <title>Jeff Weimer | Home</title>
      </Head>

      <PaddedView>
        <Section>
          <FadeIn delay={300}>
            <ReactMarkdownWithHtml allowDangerousHtml children={intro} />
          </FadeIn>
        </Section>
      </PaddedView>
    </>
  )
}

const Section = styled.section`
  height: calc(100vh - 173px);
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

export default Home
