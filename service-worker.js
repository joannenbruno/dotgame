/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["assets/audio/dustyroom_cartoon_bubble_pop.mp3","a026ac8241d7707d9c5f9eec15fe3f52"],["assets/icons/android-icon-144x144.png","080ea5accdf90a3efa57185e7e81db48"],["assets/icons/android-icon-192x192.png","3042598acf235efb3c638362ed8fc7de"],["assets/icons/android-icon-36x36.png","e42172f5acb8960222e3dc969b54f700"],["assets/icons/android-icon-48x48.png","9b52c4a3053d2f3680194dd5421d121e"],["assets/icons/android-icon-72x72.png","2369720c749d1f02fc34547e3169d96f"],["assets/icons/android-icon-96x96.png","e07ea3f2a7bb3b441cc453bb04b0b59b"],["assets/icons/apple-icon-114x114.png","37b017d1a5087b16f43d938aab8512bc"],["assets/icons/apple-icon-120x120.png","4b816b5df6bd1614e0c60cd3f3788121"],["assets/icons/apple-icon-144x144.png","080ea5accdf90a3efa57185e7e81db48"],["assets/icons/apple-icon-152x152.png","2f647215598ab0b13c6c3ace9d9d025a"],["assets/icons/apple-icon-180x180.png","e920dbfca0384a9f1c14604571aa1f71"],["assets/icons/apple-icon-57x57.png","6e49d7f7f799bbc0903e8171256f68ca"],["assets/icons/apple-icon-60x60.png","3c9bf5e0bbbefa14f5ea5cd7e57d2b00"],["assets/icons/apple-icon-72x72.png","2369720c749d1f02fc34547e3169d96f"],["assets/icons/apple-icon-76x76.png","d969844e62fe414d25285d79f8e3585f"],["assets/icons/apple-icon-precomposed.png","395e744e7c31996961abb8a01619dd7d"],["assets/icons/apple-icon.png","395e744e7c31996961abb8a01619dd7d"],["assets/icons/browserconfig.xml","653d077300a12f09a69caeea7a8947f8"],["assets/icons/favicon-16x16.png","63816e5218ab1bbbdf60bd3ab49e3813"],["assets/icons/favicon-32x32.png","6faca204dfab4ad4012cfe715204b6ed"],["assets/icons/favicon-96x96.png","e07ea3f2a7bb3b441cc453bb04b0b59b"],["assets/icons/favicon.ico","be4e65e8461e7f63a0579167c267a869"],["assets/icons/manifest.json","b58fcfa7628c9205cb11a1b2c3e8f99a"],["assets/icons/ms-icon-144x144.png","080ea5accdf90a3efa57185e7e81db48"],["assets/icons/ms-icon-150x150.png","e24fbe1752cfda46b5075a43f03fed32"],["assets/icons/ms-icon-310x310.png","1e126cf44b9d9c59dcfee9dd822c2adb"],["assets/icons/ms-icon-70x70.png","2b7caf5cc721269fddb29ef304fe6de7"],["assets/images/bubble","7fe7e5681d1cdf4dcd3d65e7bbf9895b"],["assets/images/bubble.json","5011bd28a2efd76539caa5b30a44587e"],["assets/images/bubble.png","af48b2a49c11a9429d01de71759f9522"],["assets/images/button.json","5a5bf7a3c35ef8ed4c50809417a68582"],["assets/images/button.png","f008370b84f7bb7cf37bf89172cb7367"],["assets/images/greenSheet.png","76374a1e2dd79afa962e3f9d26e10bef"],["assets/images/greenSheet.xml","f512d30feaca1d4a12d0878a08c58c87"],["assets/images/green_button00.png","3d3330e586e91bc22b4dccc2a0b6416f"],["assets/images/green_sliderDown.png","846ab36d3ee3aca0420e83c10af8b60d"],["assets/images/grey_sliderDown.png","b5524ab39d76b6b535256cc33c72aa7f"],["assets/images/grey_sliderEnd.png","e10bea1599e7e1d86468bb353501fd33"],["assets/images/grey_sliderHorizontal.png","60aefe4d46fb55b55b61565fb173ca10"],["assets/images/loader-bar.png","78ea0555ef7648bf378481a5d778d344"],["assets/images/loader-bg.png","dfb749fb41edc5c53626b50ec9d48776"],["assets/images/yellowSheet.png","4dd6dc9f50386b28d4da9f001cb85ca3"],["assets/images/yellowSheet.xml","7582c493da78358a4f80a92805c07554"],["assets/images/yellow_button00.png","c50722c62a24c939c4bc1e227e79a9f4"],["assets/images/yellow_sliderDown.png","46f5e34e12e5c21f959be5e969809741"],["dist/bundle.js","3c9f0843186fd32bf278bae5bb962112"],["dist/bundle.js.map","db2df44c1d2a2a073526a790b6bd2351"],["index.html","9fdca3ec9469d664ac986fbe349f26c8"],["swRegister.js","e6b1e7b7f094835770a96a6720d2a320"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '/index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







