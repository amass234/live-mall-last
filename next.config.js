const withCSS = require('@zeit/next-css')
if (typeof require !== 'undefined') {
  require.extensions['.css'] = (file) => { }
}

const defaultPathMap = {
  '/': { page: '/', query: { id: 'user' } },
  '/user': { page: '/', query: { id: 'user' } },
  '/payment': { page: '/', query: { id: 'payment' } },
  '/catalog': { page: '/', query: { id: 'catalog' } },
  '/package': { page: '/', query: { id: 'package' } },
  '/adminlist': { page: '/', query: { id: 'adminlist' } },
  '/report': { page: '/', query: { id: 'report' } },
  '/token': { page: '/', query: { id: 'token' } },
  '/login': { page: '/login' },
}

module.exports = withCSS({
  exportPathMap: async function () {
    return defaultPathMap
  },
  cssLoaderOptions: { url: false }
})
