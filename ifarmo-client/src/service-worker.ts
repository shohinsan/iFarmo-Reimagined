// // @ts-ignore
// import {build, files, version} from '$service-worker';
// // @ts-ignore
// const sw = self as unknown as ServiceWorkerGlobalScope;
//
// const CACHE = `cache-${version}`;
//
// const ASSETS = [
//     ...build, // the app itself
//     ...files  // everything in `static`
// ];
//
// // @ts-ignore
// sw.self.addEventListener('install', (event) => {
//     async function addFilesToCache() {
//         // @ts-ignore
//         const cache = await caches.open(CACHE);
//         await cache.addAll(ASSETS);
//     }
//     event.waitUntil(addFilesToCache());
//     console.log('installing service worker')
// });
// // @ts-ignore
// sw.self.addEventListener('activate', (event) => {
//     async function deleteOldCaches() {
//         // @ts-ignore
//         for (const key of await caches.keys()) {
//             // @ts-ignore
//             if (key !== CACHE) await caches.delete(key);
//         }
//     }
//     event.waitUntil(deleteOldCaches());
//     console.log('activating service worker')
// });
// // @ts-ignore
// sw.self.addEventListener('fetch', (event) => {
//     if (event.request.method !== 'GET') return;
//     async function respond() {
//         const url = new URL(event.request.url);
//         // @ts-ignore
//         const cache = await caches.open(CACHE);
//
//         // `build`/`files` can always be served from the cache
//         if (ASSETS.includes(url.pathname)) {
//             return cache.match(url.pathname);
//         }
//         console.log('fetching service worker')
//         try {
//             // @ts-ignore
//             const response = await fetch(event.request);
//             if (event.request.url.startsWith('http') && response.status === 200) {
//                 cache.put(event.request, response.clone());
//             }
//             return response;
//         } catch {
//             return cache.match(event.request);
//         }
//     }
//     event.respondWith(respond());
// });
//
//     function getEndpoint() {
//     return sw.self.registration.pushManager.getSubscription()
//         // @ts-ignore
//         .then(function (subscription) {
//             if (subscription) {
//                 return subscription.endpoint;
//             }
//             throw new Error('User not subscribed');
//         });
// }
//
//
// //@ts-ignore
// function oto(event: PushEvent): void {
//     if (event.data) {
//         const payload = event.data.json();
//         console.log('Data in event:', payload);
//     } else {
//         console.log('No Payload Data In OTO');
//     }
//     console.log('Event in service workers', event);
// }
//
// const testEvent = {
//     data: new Blob(['This is some test data']),
// };
//
// oto(testEvent);
//
// //@ts-ignore
// sw.self.addEventListener('push', (event) => {
//     oto(event);
// });
//
// sw.addEventListener('notificationclick', function (event: { notification: any; }) {
//     const clickedNotification = event?.notification;
//     console.log('clickedNotification', clickedNotification)
// });