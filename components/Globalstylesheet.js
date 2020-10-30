import { createGlobalStyle } from 'styled-components'

const Globalstylesheet = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    color: ${({ theme }) => theme.text.primary};
    font-family: 'raleway-regular', sans-serif;
    height: 100%;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  body {
    background-color: ${({ theme }) => theme.bg.primary};
  }

  ul {
    padding: 0;
    padding-left: 20px;
  }

  button {
    padding: 0;
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    line-height: ${({ theme }) => theme.lineHeights.body};
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes[7]};
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes[6]};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes[5]};
  }

  h4 {
    font-size: ${({ theme }) => theme.fontSizes[4]};
  }

  a {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid ${({ theme }) => theme.text.primary};
  }

  &:focus {
    outline-style: dashed;
    outline-color: ${({ theme }) => theme.focus};
    outline-width: 1px;
  }


  model-viewer {
    #reveal {
      --poster-color: transparent;
    }

    .userInput {
      outline: none;
    }

    #reveal {
      --poster-color: transparent;
    }

    .slot {
      display: none !important;
    }
  }

  :root {
    --poster-color: transparent;
    --progress-bar-height: 0px;
  }
`

export default Globalstylesheet
