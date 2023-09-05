<script>
    import {page} from '$app/stores';
    import {enhance} from '$app/forms';
    import RoleSelect from "$components/Select.svelte";
    import {Anchor,Grid, Button, Card, Container, Divider, TextInput} from "@svelteuidev/core";
    import Delete from "$components/Delete.svelte";

    let showModal = false;

    let userRoleOptions = ['user', 'worker', 'farmer'];
    let credentials = $page.data.credentials;
    let farm = $page.data.farm;

    let userDataEditMode = false;

    function editUserData() {
        userDataEditMode = true;
    }

    function cancelEdit() {
        userDataEditMode = false;
    }
</script>

<svelte:head>
    <title>iFarmo</title>
</svelte:head>

<div class="content">
        <form
                action="?/update"
                method="POST"
                use:enhance={() => ({ update }) => {
      update({ reset: false });
      userDataEditMode = false;
    }}>
            <Card>
            <div style="width: 550px; margin: auto">
                    <TextInput
                            bind:value={credentials.name}
                            label="Name"
                            placeholder="Your name"
                            name="name"
                    />
                    <TextInput
                            bind:value={credentials.username}
                            label="Username"
                            placeholder="Your username"
                            name="username"
                    />
                    <TextInput override={{
                        marginBottom: '20px'
                    }}
                            bind:value={credentials.email}
                            label="Email"
                            placeholder="Your email"
                            name="email"
                    />
                    <RoleSelect bind:value={credentials.role} name="role" options={userRoleOptions} />
                    <div class="button-content">
                        <Anchor underline={false} href="{credentials.username}">
                            <Button ripple fullSize color='red'>
                                Cancel
                            </Button>
                        </Anchor>
                        <Anchor underline={false} href="{credentials.username}">
                            <Button fullSize ripple variant='gradient' gradient={{from: 'teal', to: 'green', deg: 105}}
                                    override={{
                                        marginTop: '10px',
                                    }}>
                                Save
                            </Button>
                        </Anchor>
                    </div>
                    <Divider/>
                    <Delete centered overlayOpacity={0.55} overlayBlur={3}/>
            </div>
            </Card>
        </form>

</div>

<style lang="scss">
  .content {
    padding-top: 150px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .delete-button-field {
  }

  .button-content {
    margin-top: 20px;
  }


</style>
