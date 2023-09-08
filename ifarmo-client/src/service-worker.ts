/// <reference types="@sveltejs/kit" />

const sw = /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (self));
import {build, files, version} from '$service-worker';

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

const ASSETS = [
    ...build, // the app itself
    ...files  // everything in `static`
];

sw.self.addEventListener('install', (event) => {
    // Create a new cache and add all files to it
    async function addFilesToCache() {
        const cache = await caches.open(CACHE);
        await cache.addAll(ASSETS);
    }

    event.waitUntil(addFilesToCache());
});

sw.self.addEventListener('activate', (event) => {
    // Remove previous cached data from disk
    async function deleteOldCaches() {
        for (const key of await caches.keys()) {
            if (key !== CACHE) await caches.delete(key);
        }
    }

    event.waitUntil(deleteOldCaches());
});

sw.self.addEventListener('fetch', (event) => {
    // ignore POST requests etc
    if (event.request.method !== 'GET') return;
    // if (matchUrl.pathname.startsWith('/api')) return;
    // if (matchUrl.pathname.startsWith('/admin')) return;

    async function respond() {
        const url = new URL(event.request.url);
        const cache = await caches.open(CACHE);

        // https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

        // `build`/`files` can always be served from the cache
        // Here we can end up in a crazy state where some of the cache is gone, which
        // leads us to white screen of death
        const cacheMatch = await cache.match(event.request);

        // TODO: make issue on Kit github
        // Work around for if cache has been partly deleted
        if (ASSETS.includes(url.pathname) && cacheMatch) {
            return cacheMatch;
        }

        // for everything else, try the network first, but
        // fall back to the cache if we're offline
        try {
            const response = await fetch(event.request);

            if (response.status === 200) {
                await cache.put(event.request, response.clone());
            }

            return response;
        } catch {
            // Insanity is doing the same thing twice and hoping for a different result
            const lastCacheMatchAttempt = await cache.match(event.request);

            if (lastCacheMatchAttempt) {
                return lastCacheMatchAttempt;
            } else {
                return new Response('Something went very wrong. Try force closing and reloading the app.', {
                    status: 408,
                    headers: {'Content-Type': 'text/html'}
                });
            }
        }
    }

    event.respondWith(respond());
});

sw.addEventListener('push', function (event: { data: { json: () => any; }; waitUntil: (arg0: any) => void; }) {
    try {
        const payload = event.data
            ? event.data.json()
            : {title: 'iFarmo', body: 'Someone is interested in your post'};

        if (payload) {
            const {title, ...options} = payload;
            event.waitUntil(sw.registration.showNotification(title, options));
        } else {
            console.warn('No payload for push event', event);
        }
        // TODO: We can also implement analytics for received pushes as well if we want:
        // https://web.dev/push-notifications-handling-messages/#wait-until
    } catch (e) {
        console.warn('Malformed notification', e);
    }
});

sw.addEventListener('notificationclick', (event: any) => {
    const clickedNotification = event?.notification;
    console.log('CLICKED NOTIF');
    clickedNotification.close();
    event.waitUntil(
        sw.clients.matchAll({type: 'window'}).then((clientsArr: any) => {
                const hadWindowToFocus = clientsArr.length && clientsArr.length > 0;
                if (hadWindowToFocus) {
                    const client = clientsArr[0];
                    if (!client.url.includes('/')) {
                        client.navigate('/');
                    }
                    client.focus()
                } else {
                    sw.clients.openWindow('/').then((windowClient: { focus: () => void; }) => {
                            windowClient.focus();
                        }
                    );
                }
            }
        )
    );
});