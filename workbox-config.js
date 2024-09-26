// workbox-config.js
module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['**/*.{html,js,css}'],
  swDest: 'dist/service-worker.js',
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 10
        }
      }
    },
    {
      urlPattern: new RegExp('https://your-api/'),
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        networkTimeoutSeconds: 10
      }
    }
  ]
};
