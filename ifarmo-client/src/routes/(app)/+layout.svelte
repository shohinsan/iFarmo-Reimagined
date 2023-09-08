<script lang="ts">
    import {colorScheme, SvelteUIProvider} from '@svelteuidev/core';
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import './../../styles/main.scss'
    import './../../styles/fonts.scss'

    import { onNavigate } from '$app/navigation';
    onNavigate((navigation) => {
        if (!document.startViewTransition) return;
        return new Promise<void>((resolve) => {
            const image = document.querySelector<HTMLElement>(`a[href="${navigation.to?.url.pathname}"] *`);
            const vtn = image?.dataset.vtn;
            console.log('Navigation occurred:', navigation.to?.url.pathname);
            console.log('Image:', image);
            console.log('vtn:', vtn);
            if (image && vtn) {
                image.style.setProperty('view-transition-name', vtn);
            }
            document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });
        });
    });

    export let data;
</script>

<SvelteUIProvider withNormalizeCSS withGlobalStyles themeObserver={$colorScheme}>
    <Navbar data={data}/>
    <div class="background">
        <slot data={data}/>
    </div>

    <Footer/>
</SvelteUIProvider>

<style>
    .background {
        background: var(--bg-color);}
</style>