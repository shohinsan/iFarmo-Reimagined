<script lang="ts">
    import {
        Modal,
        Group,
        Button,
        Space,
        Notification,
        Affix, Anchor
    } from '@svelteuidev/core';
    import type {ModalProps} from '@svelteuidev/core';
    import {fly} from 'svelte/transition';
    import {quintInOut} from 'svelte/easing';
    import {enhance} from "$app/forms";
    import {page} from "$app/stores";

    interface $$Props extends Partial<ModalProps> {
        withOpenButton?: boolean;
        closeModal?: (...args: any[]) => boolean;
    }

    let default_title = "Are you sure you want delete?";

    // function changeTitle(page: string) {
    //     if (page === "Products") {
    //         default_title = "Are you sure you want to delete a product?";
    //     } else if (page === "Equipment") {
    //         default_title = "Are you sure you want to delete an equipment?";
    //     } else if (page === "Jobs") {
    //         default_title = "Are you sure you want to delete a job?";
    //     }
    // }

    export let opened = false;
    export let withOpenButton = true;
    export let closeModal = () => (opened = false);

    let notificationOpened = false;

    function submitForm() {
        console.log('Form submitted successfully')
        opened = false;
        notificationOpened = true;
        setTimeout(() => (notificationOpened = false), 4000);
    }
</script>

<Modal type="submit" {opened} on:close={closeModal} title={default_title} {...$$restProps}>
    <form action="?/delete" method="POST" use:enhance={submitForm}>
        <Space h="lg"/>
        <Group position="right">
                <Button on:click={closeModal} variant="outline">Cancel</Button>
            <Button>Submit</Button>
        </Group>
    </form>
</Modal>

{#if withOpenButton}
    <Button override={{
        width: '49%',
    }} ripple color="red" on:click={() => (opened = true)}>Delete account</Button>
{/if}

{#if notificationOpened}
    <Affix position={{ bottom: 20, right: 20 }}>
        <div transition:fly={{ x: 100, duration: 400, easing: quintInOut }}>
            <Notification
                    title="Form Submitted Successfully"
                    on:close={() => (notificationOpened = false)}
            >
                Your account has been deleted, you are redirected to the home page.
            </Notification>
        </div>
    </Affix>
{/if}