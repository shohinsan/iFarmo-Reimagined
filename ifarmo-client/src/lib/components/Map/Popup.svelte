<script lang="ts">
    import { onMount, onDestroy, getContext } from 'svelte';
    import L from 'leaflet';

    let popup: L.Popup | undefined;
    let popupElement: HTMLElement;
    export let width: number;

    let open = false;

    const { getLayer }: { getLayer: () => L.Layer | undefined } = getContext('layer');
    const layer = getLayer();

    onMount(() => {
        popup = L.popup({
            minWidth: width // Set the minimum width of the popup
        }).setContent(popupElement);

        if (layer) {
            layer.bindPopup(popup);
            layer.on('popupopen', () => (open = true));
            layer.on('popupclose', () => (open = false));
        }
    });

    onDestroy(() => {
        layer?.unbindPopup();
        popup?.remove();
        popup = undefined;
    });
</script>

<div bind:this={popupElement}>
    {#if open}
        <slot />
    {/if}
</div>
