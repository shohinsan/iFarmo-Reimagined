<script>
    import InputField from "$components/InputField.svelte";
    import {enhance} from "$app/forms";
    import {Button, Card} from "@svelteuidev/core";
</script>

<svelte:head>
    <title>iFarmo</title>
</svelte:head>

<div class="content">
    <Card>
        <form action="?/change_password" method="POST" use:enhance>
            <InputField label="Your Current Password" placeholder="Your current password" name="password"/>
            <InputField label="Your new password" placeholder="Your new password" name="new_password"/>
            <InputField label="Confirm your new password" placeholder="Confirm your new password"
                        name="confirm_new_password"/>
            <Button element="button" variant="outline" color="red">
                Update your password
            </Button>
        </form>
    </Card>
</div>

<style lang="scss">
  .content {
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
