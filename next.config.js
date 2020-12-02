module.exports = {
  serverRuntimeConfig: {
    gaCode: process.env.NEXT_GA_TRACKING_CODE,
  },
  images: {
    domains: ['www.datocms-assets.com'],
    deviceSizes: [330, 475, 768, 1024, 1025, 1200, 1920, 2048, 3840],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./utils/generateSitemap')
    }

    return config
  },
}
