<script>
    import {page} from '$app/stores';
    import {Button, Container} from "@svelteuidev/core";


    let showModal = false;
    let userRoleOptions = ['user', 'worker', 'farmer', 'gardener'];
    let profile = $page.data.profile;
    let cred = $page.data.profile.user;
    let far = $page.data.profile.farms;

    export let data;

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
<div class="profile">

</div>
<div class="content">
    <Container override={{bc: 'AliceBlue'}}>

        {#if profile}
            <div class="profile-card">
                <img src="https://static.productionready.io/images/smiley-cyrus.jpg" alt="Profile Picture">
                <h1 class="profile-name">{cred.name}</h1>
                <h2 class="profile-username">@{cred.username}</h2>
                <p class="profile-email">{cred.email}</p>
                <p class="profile-role">{cred.role}</p>
                <p class="profile-createdAt">User Since: {new Date(cred.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}</p>
                <p class="profile-owner">
                    {#if cred.role === "farmer"}Owner: {far[0].title} at {far[0].location}{/if}
                    {#if cred.role === "worker"}Worker{/if}
                    {#if cred.role === "user"}User{/if}
                </p>
                {#if data.user}
                    <div class="button-section">
                        <Button element="a" href="/settings" variant="outline" color="red" on:click={editUserData}>
                            Edit User Information
                        </Button>
                    </div>
                {/if}
            </div>
        {/if}
    </Container>
    {#if cred.role !== "farmer"}
        <div class="user-content">
            Show your feed here
        </div>
    {/if}
</div>

<style lang="scss">

  .content {
    padding-top: 150px;
  }

  .profile-card {
    padding: 20px;
    background-color: lightgrey;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    text-align: center;
  }

  .profile-card img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  .profile-name {
    margin: 5px 0;
    font-size: 24px;
  }

  .profile-username {
    color: #555;
    margin: 5px 0;
    font-size: 18px;
  }

  .profile-email, .profile-role, .profile-createdAt, .profile-owner {
    margin: 5px 0;
    color: #888;
  }

  .button-section {
    padding-top: 20px;
  }

  .user-content {
    text-align: center;
    margin: 10px;
  }

</style>
