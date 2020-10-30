import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import FadeIn from './FadeIn'
import Link from './Link'

const Project = props => {
  const { project } = props

  return (
    <FadeIn>
      <Container>
        <Link external passHref href={project.link}>
          <h2>{project.name}</h2>

          {project.images.map(image => (
            <Image key={image.url} src={image.url} alt={image.alt} />
          ))}
        </Link>
      </Container>
    </FadeIn>
  )
}

const Container = styled.div`
  margin: 0 0 75px;

  @media screen and (min-width: ${({ theme }) => theme.screen.md}) {
    margin: 0 0 200px;
  }
`

const Image = styled.img`
  max-width: 100%;
`

Project.propTypes = {
  project: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default Project
