import PropTypes from 'prop-types'
import React from 'react'
import Head from 'next/head'
import { renderMetaTags } from 'react-datocms'

import Globalstylesheet from './Globalstylesheet'

const CustomHead = props => {
  const { site, seoMetaTags } = props

  const gaScript = () => `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-C2LSGFTXPG');
    `

  return (
    <>
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-C2LSGFTXPG"
         />
        <script dangerouslySetInnerHTML={{ __html: gaScript() }} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#6ec5b6" />
        <meta name="medium" content="mult" />
        <meta name="Author" content="Jeff Weimer" />
        <meta name="keywords" content="Jeff Weimer" />

        {renderMetaTags(site.favicon)}
        {renderMetaTags(seoMetaTags)}
      </Head>
      <Globalstylesheet />
    </>
  )
}

CustomHead.propTypes = {
  site: PropTypes.objectOf(PropTypes.any).isRequired,
  seoMetaTags: PropTypes.arrayOf(PropTypes.any).isRequired,
}

export default CustomHead
