const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    // Name of the cache storage.
    cacheName: 'asset-cache',
    plugins: [
      // This plugin will cache responses with these headers to a maximum-age of 30 days
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);






// GIVEN a text editor web application
// WHEN I open my application in my editor
// THEN I should see a client server folder structure
// WHEN I run `npm run start` from the root directory
// THEN I find that my application should start up the backend and serve the client
// WHEN I run the text editor application from my terminal
// THEN I find that my JavaScript files have been bundled using webpack
// WHEN I run my webpack plugins
// THEN I find that I have a generated HTML file, service worker, and a manifest file
// WHEN I use next-gen JavaScript in my application
// THEN I find that the text editor still functions in the browser without errors
// WHEN I open the text editor
// THEN I find that IndexedDB has immediately created a database storage
// WHEN I enter content and subsequently click off of the DOM window
// THEN I find that the content in the text editor has been saved with IndexedDB
// WHEN I reopen the text editor after closing it
// THEN I find that the content in the text editor has been retrieved from our IndexedDB
// WHEN I click on the Install button
// THEN I download my web application as an icon on my desktop
// WHEN I load my web application
// THEN I should have a registered service worker using workbox
// WHEN I register a service worker
// THEN I should have my static assets pre cached upon loading along with subsequent pages and static assets
// WHEN I deploy to Heroku
// THEN I should have proper build scripts for a webpack application
