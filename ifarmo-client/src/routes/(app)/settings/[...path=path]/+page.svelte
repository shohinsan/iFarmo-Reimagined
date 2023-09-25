<script lang="ts">
    import {page} from '$app/stores';
    import {enhance} from '$app/forms';
    import {fly} from 'svelte/transition';
    import {browser} from '$app/environment';

    const API_ENDPOINT = "http://0.0.0.0:8000/api/notification";

    import type {ActionData} from "./$types";

    let form: ActionData
    import {
        Affix,
        Anchor,
        Button,
        Card,
        Divider,
        Group,
        NativeSelect,
        Notification, Switch, Text,
        TextInput
    } from "@svelteuidev/core";
    import Delete from "$components/Delete.svelte";
    import {quintInOut} from "svelte/easing";

    let userRoleOptions = ['user', 'worker', 'farmer'];

    $: credentials = $page.data.credentials;

    let notificationOpened = false;
    export let formIsSubmitted = false;

    function submitForm() {
        console.log('Form submitted')
        formIsSubmitted = false;
        notificationOpened = true;
        setTimeout(() => (notificationOpened = false), 4000);
    }

    let checkedNotif: any =  browser ? (<any>window).Notification.permission === 'granted' : false;

    async function enableBrowserNotification() {
        if ((<any>window).Notification && (<any>window).Notification.permission === 'granted') {
            checkedNotif = true;
        } else if ((<any>window).Notification && (<any>window).Notification.permission === 'denied') {
            checkedNotif = false;
        } else if ((<any>window).Notification) {
            const permission = await (<any>window).Notification.requestPermission();
            checkedNotif = permission === 'granted';
        } else {
            checkedNotif = false;
        }
    }
    if (browser) {
        console.log("Notification permission is", ((<any>window).Notification.permission))
    }




</script>

<svelte:head>
    <title>iFarmo</title>
</svelte:head>

<div class="content">
    <Card type="submit"
          override={{
              padding: '35px 50px 50rem 50px',
              width: '100%',
        backgroundColor: '#FAF9F6',
    }}>
        <Divider label='Personal Information' labelPosition='left'/>
        <p>This information is intended to be displayed publicly</p>
        <form action="?/update"
              method="POST"
              use:enhance={() => ({ update }) => {
                  update({ reset: false });
                  submitForm();
              }}>
            <TextInput name="name"
                       bind:value={credentials.name}
                       label="Name"
                       placeholder="Your name"
            />
            <TextInput name="username"
                       bind:value={credentials.username}
                       label="Username"
                       placeholder="Your username"

            />

            <TextInput name="email"
                       bind:value={credentials.email}
                       label="Email"
                       placeholder="Your email"
            />

            <NativeSelect bind:value={credentials.role} name="role" data={userRoleOptions} label="Role">
                {#each userRoleOptions as option (option)}
                    <option value={option}>{option}</option>
                {/each}
            </NativeSelect>

            <Group override={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '20px',
                }}>
                <Anchor underline={false} href="{credentials.username}">
                    <Button ripple color="red">
                        Cancel
                    </Button>
                </Anchor>

                <Anchor root="button" type="submit" underline={false} href="{credentials.username}">
                    <Button
                            ripple variant='gradient' gradient={{from: 'teal', to: 'green', deg: 105}}>
                        Save
                    </Button>
                </Anchor>
            </Group>
        </form>


        <Divider
                override={{
                    marginTop: '40px',
                }}
                label='Security' labelPosition='left'/>


        <Group position="apart">
            <Text>Enable browser notifications</Text>

            <Switch
                    checked={checkedNotif}
                    size='md'
                    onLabel="ON"
                    offLabel="OFF"
                    id="Notificationclick"
                    on:click={enableBrowserNotification}
            />
        </Group>

        <br />
        <Text override={{
            color: 'red',
        }}>Note: location is disabled via Browser settings</Text>




        <Divider
                override={{
                    marginTop: '40px',
                }}
                label='Delete account' labelPosition='left'/>
        <p>No longer want to use our platform? You can delete your account here. This action is not reversible. All
            information relation to this account will be deleted permanently</p>
        <Delete/>
    </Card>


    {#if notificationOpened}
        <Affix position={{ bottom: 20, right: 20 }}>
            <div transition:fly={{ x: 100, duration: 400, easing: quintInOut }}>
                <Notification
                        title="Form Submitted Successfully"
                        on:close={() => (notificationOpened = false)}
                >
                    Your form was subbmitted successfully! No need to think about it any longer.
                </Notification>
            </div>
        </Affix>
    {/if}

</div>

<style lang="scss">
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

</style>
