<script>
    import { onDestroy } from "svelte";
    import { messages } from "$helpers/chat";

    let messageData = [];
    const unsubscribe = messages.subscribe((messages) => {
        messageData = messages;
    });


    onDestroy(() => {
        unsubscribe();
    });

    export let data;
    const sender = data.credentials.username;
</script>

<div class="chat-app">
    <div class="chat-header">
        <h1>Chat Room</h1>
    </div>

    <div class="chat-messages">


        <!--{#each messages as message (message.id)}-->
        <!--    <div class="chat-message">-->
        <!--        <span>{message.sender}</span>-->
        <!--        <p>{message.text}</p>-->
        <!--    </div>-->
        <!--{/each}-->
    </div>

    <form class="chat-input-form">
        <input type="text" placeholder="Type your message..."/>
        <button type="submit">Send</button>
    </form>

</div>

<style>
</style>`