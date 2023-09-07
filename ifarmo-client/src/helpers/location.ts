import { readable } from 'svelte/store';

const locationPromise = new Promise((resolve, reject) => {
    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const url = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&format=json`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const res = await response.json();

                const city = res.address.county;
                resolve({city, latitude, longitude});
            },
            (error) => {
                reject(error);
            }
        );
    } else {
        reject(new Error('Geolocation is not available.'));
    }
});

const location = readable(null, (set) => {
    locationPromise
        .then((data) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            set(data);
        })
        .catch((error) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            set({ error });
        });
});

export default location;