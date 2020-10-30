import React from 'react'
import Head from 'next/head'

import Globalstylesheet from './Globalstylesheet'

const CustomHead = () => {
  return (
    <>
      <Head>
        <style></style>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'
        />
        <meta charSet='utf-8' />
        <link rel='icon' type='image/png' sizes='32x32' href='/fav/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='96x96' href='/fav/favicon-96x96.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/fav/favicon-16x16.png' />
        <link rel='icon' type='image/x-icon' href='/fav/favicon.ico' />
        <meta name='theme-color' content='#6ec5b6' />
      </Head>

      <Globalstylesheet />
    </>
  )
}

export default CustomHead
