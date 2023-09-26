import {getServiceWorkerWebPushConfig} from "../../../sw";
import { json } from "@sveltejs/kit";

export async function POST() {
    let serviceWorkerRegistration = typeof await navigator.serviceWorker.getRegistration();
    console.log("serviceWorkerRegistration", serviceWorkerRegistration)
    const webPushConfig = getServiceWorkerWebPushConfig();
    console.log("webPushConfig", webPushConfig)
    if (serviceWorkerRegistration) {
        // @ts-ignore
        const pushSubscription = await serviceWorkerRegistration.pushManager.subscribe(
            webPushConfig
        );
        console.log("pushSubscription", pushSubscription)
        const pushSubscriptionPayload = JSON.stringify(pushSubscription);
        console.log("pushSubscriptionPayload", pushSubscriptionPayload)
        const response = await fetch("http://137.184.224.144:8000/api/notification/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: pushSubscriptionPayload,
        });
        console.log("response", response);
        return await response.json();
    }
}