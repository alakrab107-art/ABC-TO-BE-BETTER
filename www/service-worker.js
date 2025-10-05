// Service Worker for BBC English Phonetics Trainer
const CACHE_NAME = 'bbc-phonetics-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './manifest.json',
  './icon-512.svg',
  // Consonant sound files
  './sounds/consonants/con_b.mp3',
  './sounds/consonants/con_ch.mp3',
  './sounds/consonants/con_d.mp3',
  './sounds/consonants/con_eth.mp3',
  './sounds/consonants/con_f.mp3',
  './sounds/consonants/con_g.mp3',
  './sounds/consonants/con_h.mp3',
  './sounds/consonants/con_j.mp3',
  './sounds/consonants/con_k.mp3',
  './sounds/consonants/con_l.mp3',
  './sounds/consonants/con_m.mp3',
  './sounds/consonants/con_n.mp3',
  './sounds/consonants/con_ng.mp3',
  './sounds/consonants/con_p.mp3',
  './sounds/consonants/con_r.mp3',
  './sounds/consonants/con_s.mp3',
  './sounds/consonants/con_sh.mp3',
  './sounds/consonants/con_t.mp3',
  './sounds/consonants/con_theta.mp3',
  './sounds/consonants/con_v.mp3',
  './sounds/consonants/con_w.mp3',
  './sounds/consonants/con_y.mp3',
  './sounds/consonants/con_z.mp3',
  './sounds/consonants/con_zh.mp3',
  // Vowel sound files
  './sounds/vowels/vow_a_long.mp3',
  './sounds/vowels/vow_ae.mp3',
  './sounds/vowels/vow_ai.mp3',
  './sounds/vowels/vow_au.mp3',
  './sounds/vowels/vow_e_short.mp3',
  './sounds/vowels/vow_ea.mp3',
  './sounds/vowels/vow_ei.mp3',
  './sounds/vowels/vow_er_long.mp3',
  './sounds/vowels/vow_i_long.mp3',
  './sounds/vowels/vow_i_short.mp3',
  './sounds/vowels/vow_ia.mp3',
  './sounds/vowels/vow_o_long.mp3',
  './sounds/vowels/vow_o_short.mp3',
  './sounds/vowels/vow_oi.mp3',
  './sounds/vowels/vow_ou.mp3',
  './sounds/vowels/vow_schwa.mp3',
  './sounds/vowels/vow_u_long.mp3',
  './sounds/vowels/vow_u_short.mp3',
  './sounds/vowels/vow_uh.mp3'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          response => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});