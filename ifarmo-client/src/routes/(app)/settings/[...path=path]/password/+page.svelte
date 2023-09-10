<script lang="ts">
    import InputField from "$components/InputField.svelte";
    import {enhance} from "$app/forms";
    import {fly} from 'svelte/transition';
    import type {ActionData} from "./$types";
    let form: ActionData
    import {Affix, Button, Card, Divider, Notification, TextInput} from "@svelteuidev/core";
    import {quintInOut} from "svelte/easing";


    let notificationOpened = false;
    export let formIsSubmitted = false;
    function submitForm() {
        console.log('Form submitted')
        formIsSubmitted = false;
        notificationOpened = true;
        setTimeout(() => (notificationOpened = false), 4000);
    }

</script>

<svelte:head>
    <title>iFarmo</title>
</svelte:head>

<div class="content">
    <Card
            override={{
        padding: '35px 50px 50rem 50px',
        width: '100%',
        backgroundColor: '#FAF9F6',
    }}>
        <Divider label='Change password' labelPosition='left' />
        <p>Update your password associated with your account</p>
        <form action="?/change_password" method="POST"
              use:enhance={() => ({ update }) => {
                  update({ reset: true });
                  submitForm();
              }}>

            <TextInput label="Your Current Password" placeholder="Your current password" name="password"/>
            <TextInput label="Your new password" placeholder="Your new password" name="new_password"/>
            <TextInput label="Confirm your new password" placeholder="Confirm your new password"
                        name="confirm_new_password"/>

            <Button override={{marginTop: '20px'}} type="submit"
                    element="button"  color="green">
                Save
            </Button>
        </form>
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
