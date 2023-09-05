<script>
    import {enhance} from "$app/forms";
    import {Button, Card, TextInput} from "@svelteuidev/core";
</script>

<svelte:head>
    <title>iFarmo</title>
</svelte:head>

<div class="content">
    <Card>
    <form action="?/change_password" method="POST" use:enhance>
        <TextInput label="Your Current Password" placeholder="Your current password" name="password"/>
        <TextInput label="Your new password" placeholder="Your new password" name="new_password"/>
        <TextInput label="Confirm your new password" placeholder="Confirm your new password"
                    name="confirm_new_password"/>
        <Button fullSize ripple variant='gradient' gradient={{from: 'teal', to: 'green', deg: 105}}
        override={{
            marginTop: '10px',
        }}>
            Save
        </Button>
    </form>
    </Card>
</div>

<style lang="scss">
  .content {
    padding-top: 50px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
