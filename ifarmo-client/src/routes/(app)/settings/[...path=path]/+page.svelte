<script>
    import {page} from '$app/stores';
    import InputField from '$components/InputField.svelte';
    import {enhance} from '$app/forms';
    import RoleSelect from "$components/Select.svelte";
    import {Button, Card} from "@svelteuidev/core";
    import Delete from "$components/Delete.svelte";
    let userRoleOptions = ['user', 'worker', 'farmer'];
    let credentials = $page.data.credentials;

</script>

<svelte:head>
    <title>iFarmo</title>
</svelte:head>

<div class="content">
    <Card>
        <form
                action="?/update"
                method="POST"
                use:enhance={() => ({ update }) => {
      update({ reset: false });
    }}
        >
            <InputField
                    bind:value={credentials.name}
                    label="Name"
                    placeholder="Your name"
                    name="name"
            />
            <InputField
                    bind:value={credentials.username}
                    label="Username"
                    placeholder="Your username"
                    name="username"
            />
            <InputField
                    bind:value={credentials.email}
                    label="Email"
                    placeholder="Your email"
                    name="email"
            />
            <RoleSelect bind:value={credentials.role} name="role" options={userRoleOptions}/>
            <div class="button-content">
                <Button element="a" href="{credentials.username}" variant="outline" color="red">
                    Cancel
                </Button>
                <Button element="button" variant="outline" color="red">
                    Update an account
                </Button>
            </div>
        </form>
        <div class="delete-button-field">
            <Button
                    element="button"
                    variant="outline"
                    color="red"
            >
                Delete an account
            </Button>
        </div>
        <Delete />
    </Card>

</div>

<style lang="scss">
  .content {
    padding-top: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .delete-button-field {
    margin-top: 100px;
    margin-bottom: 20px;
  }

  .button-content {
    margin-top: 20px;
  }

  .custom-select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    appearance: none; /* Removes default appearance */
    cursor: pointer;
  }

  .custom-select:focus {
    outline: none;
    border-color: #007bff; /* Change focus border color as needed */
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); /* Change focus shadow as needed */
  }

</style>
