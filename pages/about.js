import { useRef } from 'react'
import { useWindowScroll } from 'react-use'
import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import styled, { keyframes } from 'styled-components'

import { request } from '../lib/datocms'

import FadeIn from '../components/FadeIn'
import PaddedView from '../components/PaddedView'
import Project from '../components/Project'

const ABOUTPAGE_QUERY = `
  query {
    aboutPage {
      image {
        url
        alt
      }
      skills(markdown: false)
      text(markdown: false)
      projects {
        description
        link
        name
        images {
          alt
          url
        }
      }
    }
  }
`

const About = props => {
  const {
    data: {
      aboutPage: {
        image: { url, alt },
        text,
        skills,
        projects,
      },
    },
  } = props

  const projectsRef = useRef(null)

  const { _, y } = useWindowScroll()

  const scroll = ref => {
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Head>
        <title>About - Jeff Weimer</title>
      </Head>
      <PaddedView>
        <Intro>
          <FadeIn delay={0}>
            <Image src={url} alt={alt} />
          </FadeIn>

          <FadeIn delay={200}>
            <ReactMarkdown children={text} />
          </FadeIn>

          <FadeIn delay={400}>
            <ReactMarkdown children={skills} />
          </FadeIn>

          <DownArrow onClick={() => scroll(projectsRef)} isVisible={y < 10}>
            <DownIcon x='0px' y='0px' viewBox='0 0 492 492'>
              <path d='M442.668,268.536l-16.116-16.12c-5.06-5.068-11.824-7.872-19.024-7.872c-7.208,0-14.584,2.804-19.644,7.872L283.688,355.992V26.924C283.688,12.084,272.856,0,258.02,0h-22.804c-14.832,0-28.404,12.084-28.404,26.924v330.24L102.824,252.416c-5.068-5.068-11.444-7.872-18.652-7.872c-7.2,0-13.776,2.804-18.84,7.872l-16.028,16.12c-10.488,10.492-10.444,27.56,0.044,38.052l177.576,177.556c5.056,5.056,11.84,7.856,19.1,7.856h0.076c7.204,0,13.972-2.8,19.028-7.856l177.54-177.552C453.164,296.104,453.164,279.028,442.668,268.536z' />
            </DownIcon>
          </DownArrow>
        </Intro>

        <section ref={projectsRef}>
          <ProjectsTitle>Projects</ProjectsTitle>

          {projects.map((project, index) => (
            <Project key={index.toString()} project={project} />
          ))}
        </section>
      </PaddedView>
    </>
  )
}

const bounce = keyframes`
   0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`

const DownArrow = styled.button`
  -webkit-appearance: none;
  animation: ${bounce} 2.25s 2;
  background: none;
  border: none;
  bottom: 30px;
  cursor: pointer;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  pointer-events: ${({ isVisible }) => (isVisible ? 'auto' : 'none')};
  position: absolute;
  transition: all 300ms ease-in-out;
`

const DownIcon = styled.svg`
  fill: ${({ theme }) => theme.text.primary};
  width: 40px;
`

const Image = styled.img`
  border-radius: 50%;
  display: flex;
  margin: 0 auto;

  @media screen and (min-width: ${({ theme }) => theme.screen.md}) {
    display: block;
    margin: 0;
  }
`

const Intro = styled.section`
  min-height: calc(100vh - 125px);
  position: relative;
`

const ProjectsTitle = styled.h1`
  margin: 0 0 50px;
`

export async function getStaticProps(context) {
  const data = await request({
    query: ABOUTPAGE_QUERY,
    variables: {},
    preview: context.preview,
  })

  return {
    props: { data },
  }
}

export default About
