'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "0b8e0a2db0802d6336b4a3ed3cbfef10",
"/": "0b8e0a2db0802d6336b4a3ed3cbfef10",
"assets/assets/private_chat_wallpaper.png": "79a300713eb748518781489ba2458832",
"assets/assets/new_group_wallpaper.png": "da27dd53626f515a565b023c9690b4c6",
"assets/assets/fluffychat-banner.png": "c79eb543ae8dc4af5c21dedd92fc5dce",
"assets/assets/chat.svg": "dd9bd526923564581ec0bbac3cce33ab",
"assets/assets/logo.svg": "dd9bd526923564581ec0bbac3cce33ab",
"assets/assets/favicon.png": "b29625ae1df874ea2d6fce002081e90f",
"assets/assets/favicon.ico": "0d2d1ed42457fa1f03afa27fabe7c6ee",
"assets/assets/logo.png": "3ac2c2c7746ce2a7ac304052ea7d09ee",
"assets/assets/js/package/olm.js": "b63a3b8c4c4735266e626a3cba287657",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/LICENSE": "7188804c14598af16fab1fa7fa3154be",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/FontManifest.json": "f7161631e25fbd47f3180eae84053a51",
"assets/AssetManifest.json": "39ae6143a86017b675b2aec568b2cab8",
"browserconfig.xml": "653d077300a12f09a69caeea7a8947f8",
"manifest.json": "d0730d8ba1844e2657a61320ef2ba6cc",
"main.dart.js": "85cd2f7be2c81fe5ecbd0c8191bb4227"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
