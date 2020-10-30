import { motion, AnimatePresence } from 'framer-motion'
import { useIntersection } from 'react-use'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const FadeIn = props => {
  const { children, delay = 100, reset = false } = props

  const intersectionRef = React.useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '50px',
    threshold: 1,
  })

  const [inView, setInView] = useState(false)

  useEffect(() => {
    const inViewNow = intersection && intersection.intersectionRatio >= 0.5

    if (inViewNow) {
      return setInView(inViewNow)
    } else if (reset) {
      return setInView(false)
    }
  }, [intersection, reset])

  return (
    <Container ref={intersectionRef} inView={inView} delay={delay}>
      {children}
    </Container>
  )
}

const Container = styled.div`
  opacity: ${({ inView }) => (inView ? 1 : 0)};
  transform: ${({ inView }) => (inView ? 'translateY(0px)' : 'translateY(30px)')};
  transition: ${({ delay }) => `all 400ms ease-out ${delay}ms`};
`

FadeIn.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
}

export default FadeIn
