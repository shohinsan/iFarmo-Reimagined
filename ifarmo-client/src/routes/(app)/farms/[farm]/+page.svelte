<script>
    import {page} from '$app/stores';
    import { Tabs, Container} from "@svelteuidev/core";
    import {Camera, EnvelopeClosed, Gear} from "radix-icons-svelte";

  // let farm = $page.data.farm;
  //   console.log("farm",farm)

</script>
<svelte:head>
    <title>iFarmo</title>
</svelte:head>
<div class="profile">

</div>
<div class="content">
    <Container override={{bc: 'AliceBlue'}}>

        Under discussion,
        <br />
        1) Ability To create your own key features and add them to your profile...
        <br />
        2) Allow farms to track down the amount of sales, and etc...
        <br />
        3) Request by the user, get notified as a farmer, and once the farmer accepts the request, the user gets notified as well...


        <Tabs>
            <Tabs.Tab label='Products' icon={Camera}>Products Tab content</Tabs.Tab>
            <Tabs.Tab label='Jobs' icon={EnvelopeClosed}>Jobs tab content</Tabs.Tab>
            <Tabs.Tab label='Equipment' icon={EnvelopeClosed}>Equipment tab content</Tabs.Tab>
        </Tabs>
    </Container>

</div>

<style lang="scss">
</style>
