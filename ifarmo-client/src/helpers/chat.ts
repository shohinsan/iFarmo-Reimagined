import {readable} from "svelte/store";
import {browser} from '$app/environment';

function messenger(init = true) {

    let chatSocket: WebSocket;

    return readable([], (set, update,) => {
        if (!init) return;

        chatSocket = new WebSocket("ws://localhost:8000/chat");

        chatSocket.addEventListener("open", (event) => {
            console.log("Chat socket opened");
            chatSocket.send(JSON.stringify({type: "get_messages"}));
            console.log("Chat socket sent get_messages")
        });

        chatSocket.addEventListener("message", (event) => {
            console.log("Chat socket message received");
            // @ts-ignore
            update((messages) => [...messages, JSON.parse(event.data)]);
            console.log("Chat socket message updated")
        });

        chatSocket.addEventListener("close", (event) => {
            console.log("Chat socket closed");
        });

        return () => chatSocket.close();

    });
}

export const messages = messenger(browser);