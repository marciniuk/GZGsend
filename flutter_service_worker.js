'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "0b8e0a2db0802d6336b4a3ed3cbfef10",
"/": "0b8e0a2db0802d6336b4a3ed3cbfef10",
"assets/assets/private_chat_wallpaper.png": "a83379bb75cf6141f4b6fd46ff0bd394",
"assets/assets/new_group_wallpaper.png": "b23908fc33c68f61750b2752896e8c1e",
"assets/assets/fluffychat-banner.png": "4a005db27a8787aea061537223dabb7d",
"assets/assets/chat.svg": "eedd029d2f9f923ffbc09aeb5cf9b1f2",
"assets/assets/logo.svg": "9fa74d6e9c5c526b94f96dea62d06f41",
"assets/assets/favicon.png": "3ea6cdc2aeab08defd0659bad734a69b",
"assets/assets/favicon.ico": "58c583a47977a32782a8706d5a84533c",
"assets/assets/logo.png": "d329be9cd7af685717f68e03561f96c0",
"assets/assets/js/package/olm.js": "25f4beb0cf0627a593c8ebdd91e2ccf9",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/LICENSE": "72bf339a266760fb0802048c09e20a44",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/FontManifest.json": "f7161631e25fbd47f3180eae84053a51",
"assets/AssetManifest.json": "39ae6143a86017b675b2aec568b2cab8",
"browserconfig.xml": "653d077300a12f09a69caeea7a8947f8",
"manifest.json": "070a83a4792cd84cd9aef900ed06aac8",
"main.dart.js": "9f4ff81bf67552d09285ae7dfa0a9033"
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
