<script lang="ts">
    import { onMount, onDestroy, setContext, createEventDispatcher } from 'svelte';
    import L from 'leaflet';
    import 'leaflet/dist/leaflet.css';
    import Toolbox from "$components/Map/Toolbox.svelte";
    export let bounds: L.LatLngBoundsExpression | undefined = undefined;
    export let view: L.LatLngExpression | undefined = undefined;
    export let zoom: number | undefined = undefined;

    // Event dispatcher
    const dispatch = createEventDispatcher();

    let map: L.Map | undefined;
    let mapElement: HTMLElement;


    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            view = [position.coords.latitude, position.coords.longitude];
            zoom = 13;
        });
    }

    onMount(() => {
        // Initialize the map and other components
        map = L.map(mapElement)
            .on('zoom', (e) => dispatch('zoom', e));

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '<a href="/">iFarmo</a>'
        }).addTo(map);

        if (bounds) {
            map.fitBounds(bounds);
        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        view = [position.coords.latitude, position.coords.longitude];
                        zoom = 13;
                        map.setView(view, zoom);
                    },
                    (error) => {
                        console.error('Geolocation error:', error);
                        view = [0, 0];
                        zoom = 2;
                        map.setView(view, zoom);
                    }
                );
            } else {
                view = [0, 0];
                zoom = 2;
                map.setView(view, zoom);
            }
        }

        // Initialize the toolbox after the map is loaded
        let eye = true;
        let lines = true;
        let toolbar =  L.control({ position: 'topright' });
        let toolbarComponent;
        toolbar.onAdd = (map) => {
            let div = L.DomUtil.create('div');
            toolbarComponent = new Toolbox({
                target: div,
                props: {}
            });

            toolbarComponent.$on('click-eye', ({ detail }) => eye = detail);
            toolbarComponent.$on('click-lines', ({ detail }) => lines = detail);
            toolbarComponent.$on('click-reset', () => {
                map.setView(initialView, 5, { animate: true })
            })

            return div;
        }

        toolbar.onRemove = () => {
            if(toolbarComponent) {
                toolbarComponent.$destroy();
                toolbarComponent = null;
            }
        };

        // Add the toolbox to the map after it's initialized
        toolbar.addTo(map);
    });


    let eye = true;
    let lines = true;
    let toolbar =  L.control({ position: 'topright' });
    let toolbarComponent;
    toolbar.onAdd = (map) => {
        let div = L.DomUtil.create('div');
        toolbarComponent = new Toolbox({
            target: div,
            props: {}
        });

        toolbarComponent.$on('click-eye', ({ detail }) => eye = detail);
        toolbarComponent.$on('click-lines', ({ detail }) => lines = detail);
        toolbarComponent.$on('click-reset', () => {
            map.setView(initialView, 5, { animate: true })
        })

        return div;
    }

    toolbar.onRemove = () => {
        if(toolbarComponent) {
            toolbarComponent.$destroy();
            toolbarComponent = null;
        }
    };

    onDestroy(() => {
        map?.remove();
        map = undefined;
    });

    setContext('map', {
        getMap: () => map,
    });





</script>

<div class="layer loading-container" bind:this={mapElement}>
    {#if map}
        <slot />
    {/if}
</div>

<style>
    @import 'leaflet/dist/leaflet.css';
    .layer {
        height: 98vh;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .loading-container {
        text-align: center;
    }
</style>
