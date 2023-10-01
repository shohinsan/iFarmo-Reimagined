import {type Actions, redirect} from "@sveltejs/kit";
import {getServiceWorkerWebPushConfig} from "../../../../sw";

const TOKEN_SECRET = process.env.TOKEN_SECRET;
const API_ENDPOINT = "https://localhost:8443/api/product";
const NOTIFICATION_API_ENDPOINT = "https://localhost:8443/api/notification";

export const actions = {
    delete: async ({cookies, fetch, params}) => {
        const authToken = cookies.get('access-token');
        if (authToken) {
            const productId = params.productId;
            const response = await fetch(`${API_ENDPOINT}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({productId}),
            });
        }
        throw redirect(303, `/products`);
    },
    update: async ({request, cookies, fetch, params}) => {
        const authToken = cookies.get('access-token');
        const data = await request.formData();
        const productId = params.productId;
        const updateProfileData = {
            productId: productId,
            title: data.get('title'),
            type: data.get('type'),
            description: data.get('description'),
            quantity: data.get('quantity'),
            unitType: data.get('unitType'),
            price: data.get('price'),
            city: data.get('city'),
        };
        if (authToken) {
            await fetch(`${API_ENDPOINT}/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(updateProfileData),
            });
        }
        throw redirect(303, `/products/${productId}`);
    },
    send_notification: async ({ request, cookies, fetch }) => {
        const authToken = cookies.get('access-token');
        if (authToken) {
            if (typeof navigator !== 'undefined') {
                const serviceWorkerRegistration = await navigator.serviceWorker.getRegistration();
                console.log("serviceWorkerRegistration", serviceWorkerRegistration);
                const webPushConfig = getServiceWorkerWebPushConfig();
                console.log("webPushConfig", webPushConfig);

                if (serviceWorkerRegistration) {
                    const pushSubscription = await serviceWorkerRegistration.pushManager.subscribe(webPushConfig);
                    console.log("pushSubscription", pushSubscription);

                    const pushSubscriptionPayload = JSON.stringify(pushSubscription);
                    console.log("pushSubscriptionPayload", pushSubscriptionPayload);
                }
            }

            await fetch(`${NOTIFICATION_API_ENDPOINT}/send`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
        }
        console.log('send_notifications');
        throw redirect(303, `/products`);
    },



    register_notification: async ({request,cookies, fetch}) => {
        const payload = {
            title: 'Welcome to Svelte UI Dev',
            body: 'You will receive notifications from Svelte UI Dev',
            icon: '/favicon.ico',
        }

        const delay = 1000 * 60 * 60 * 24 * 7;
        const ttl = 60 * 60 * 24 * 7;

        const authToken = cookies.get('access-token');
        if (authToken) {
            await fetch(`${NOTIFICATION_API_ENDPOINT}/register`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({payload, delay, ttl}),
            });
        }
        console.log('register_notifications')
        throw redirect(303, '/products');
    }
} satisfies Actions;