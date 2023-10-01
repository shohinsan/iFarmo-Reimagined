<script>
    import {page} from '$app/stores';
    import {Anchor, Badge, Button, Container, Group, Stack} from "@svelteuidev/core";
    import Farmer from "$lib/icons/Farmer.svelte";

    let showModal = false;
    let userRoleOptions = ['user', 'worker', 'farmer', 'gardener'];
    let profile = $page.data.profile;
    let cred = $page.data.profile.user;
    let far = $page.data.profile.farms;
    let isFarmerWithFarm = cred.role === "farmer" && far.length > 0;
    export let data;
</script>
<svelte:head>
    <title>iFarmo</title>
</svelte:head>
<div class="profile">

</div>
<div class="content">
    <Container>
        {#if profile}
            <div class="profile-card">
                <Group position="apart">
                    <Group>
                        <div class="profile-info">
                            <Farmer width={121} height={121} />
                            <h2 class="profile-username">@{cred.username}</h2>
                        </div>
                        <div class="profile-info">
                            <h1 class="profile-name">{cred.name}</h1>
                            <Group>
                                <Badge color="lime"> Email</Badge>
                                <p class="profile-email">{cred.email}</p>
                            </Group>
                            <Group>
                                <Badge color="lime">Role</Badge>
                                <p class="profile-role">{cred.role}</p>
                            </Group>
                            <Group>
                                <Badge color="lime">Active since</Badge>
                                <p class="profile-createdAt">{new Date(cred.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</p>
                            </Group>
                            <Group>
                                <Badge color="lime">Occupation</Badge>
                                <p class="profile-owner">
                                    {#if isFarmerWithFarm}
                                        Owner: {far[0].title} at {far[0].location}
                                    {:else if cred.role === "farmer"}
                                        Gardener
                                    {/if}
                                    {#if cred.role === "worker"}Worker{/if}
                                    {#if cred.role === "user"}User{/if}
                                </p>
                            </Group>

                        </div>
                    </Group>
                    {#if data.user}
                        <div class="button-section">
                            <Anchor underline={false} href="/settings">
                                <Button ripple variant='gradient' gradient={{from: 'orange', to: 'red', deg: 45}}>
                                    Edit User Information
                                </Button>
                            </Anchor>
                        </div>
                    {/if}
                </Group>

                <!--Need this later -->
                <!--{#if data.user.userId !== cred.userId}-->
                <!--    <div class="button-section">-->
                <!--        <Anchor underline={false} href="/{cred.username}/communication">-->
                <!--            <Button ripple variant='gradient' gradient={{from: 'orange', to: 'red', deg: 45}}>-->
                <!--                Send a Message-->
                <!--            </Button>-->
                <!--        </Anchor>-->
                <!--    </div>-->
                <!--{/if}-->
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
  .profile-card {
    padding: 50px 50px 1500px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

  .user-content {
    text-align: center;
    margin: 10px;
  }

  .profile-info {
    display: flex;
    flex-direction: column;
  }


  @media (max-width: 418px) {
    .profile-name {
      font-size: 16px;
    }

    .profile-username {
      font-size: 14px;
    }

    .profile-email,
    .profile-role,
    .profile-createdAt,
    .profile-owner {
      font-size: 11px;
    }
  }
</style>
