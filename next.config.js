const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')

if (typeof require !== 'undefined') {
  require.extensions['.css'] = (file) => {}
}

module.exports = withCSS(withSass({
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/user': { page: '/user' },
      '/admin': { page: '/admin' },
      '/catalog': { page: '/catalog' },
      '/package': { page: '/package' },
      '/payment': { page: '/payment' },
      '/report': { page: '/report' },
      '/token': { page: '/token' },
    }
  },
  webpack (config, options) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|md)$/,
      use: {
        loader: 'raw-loader',
        options: {
          limit: 100000
        },
      }
    })

    return config
  },
}))