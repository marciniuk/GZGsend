'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "ec07974a325e2d6d4a2d32f77426c54e",
"/": "ec07974a325e2d6d4a2d32f77426c54e",
"icons/Icon-192.png": "839e87c4f6800df757bb28180f8e2949",
"icons/Icon-512.png": "f57dad4f6efa0339b50d5c65f36dc03c",
"assets/assets/private_chat_wallpaper.png": "a83379bb75cf6141f4b6fd46ff0bd394",
"assets/assets/new_group_wallpaper.png": "b23908fc33c68f61750b2752896e8c1e",
"assets/assets/fluffychat-banner.png": "4a005db27a8787aea061537223dabb7d",
"assets/assets/chat.svg": "eedd029d2f9f923ffbc09aeb5cf9b1f2",
"assets/assets/logo.svg": "9fa74d6e9c5c526b94f96dea62d06f41",
"assets/assets/favicon.png": "3ea6cdc2aeab08defd0659bad734a69b",
"assets/assets/favicon.ico": "58c583a47977a32782a8706d5a84533c",
"assets/assets/logo.png": "d329be9cd7af685717f68e03561f96c0",
"assets/assets/js/package/olm.js": "503869fd17c0466168af83f58f6e9021",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/LICENSE": "ac324f9dcc185a79b3dfb685bba467c8",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/FontManifest.json": "f7161631e25fbd47f3180eae84053a51",
"assets/AssetManifest.json": "39ae6143a86017b675b2aec568b2cab8",
"sql-wasm.js": "7ce6f6c33529a9703e33e194e79b7691",
"manifest.json": "cc4b6aa791018840b65fd0b0e325b201",
"main.dart.js": "21814c071ae77a4d0120cd09fb207f62",
"favicon.png": "a409751f0ecf6dee76fb350d7402f9be",
"sql-wasm.wasm": "9acb7a2acdb22234cf19be0aa2f332d0"
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
