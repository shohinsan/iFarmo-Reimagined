<script lang="ts">
    import {colorScheme, SvelteUIProvider} from '@svelteuidev/core';
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import './../../styles/main.scss'
    import './../../styles/fonts.scss'
    import {preparePageTransition} from "$helpers/pageTransition";

    preparePageTransition();

    export let data;
</script>

<SvelteUIProvider withNormalizeCSS withGlobalStyles themeObserver={$colorScheme}>
    <Navbar data={data}/>
        <slot data={data}/>
    <Footer/>
</SvelteUIProvider>

<style>
</style>