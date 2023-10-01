<script>
    import {browser, dev} from '$app/environment';
    // if (browser) {
    //     if ('serviceWorker' in navigator) {
    //         navigator.serviceWorker.register('service-worker.ts', {
    //             scope: './',
    //             type: dev ? 'module' : 'classic',
    //         })
    //             .then((registration) => {
    //                 console.log('Service Worker registered with scope:', registration.scope);
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //                 console.error('Service Worker registration failed:', error);
    //             });
    //     } else {
    //         console.error('Service Worker is not supported in this environment.');
    //     }
    // }
</script>
<slot/>
