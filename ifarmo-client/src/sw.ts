import {PUBLIC_VAPID_PUBLIC_KEY} from '$env/static/public';
const convertToBase64 = (str: string | undefined) => {
    const utf8Encoder = new TextEncoder();
    const data = utf8Encoder.encode(str);
    return base64ArrayBuffer(data);
};
const base64ArrayBuffer = (arrayBuffer: Iterable<number>) => {
    let binary = '';
    const bytes = new Uint8Array(arrayBuffer);

    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary);
};
export const getServiceWorkerWebPushConfig = () => ({
    userVisibleOnly: true,
    applicationServerKey: convertToBase64(PUBLIC_VAPID_PUBLIC_KEY)
});