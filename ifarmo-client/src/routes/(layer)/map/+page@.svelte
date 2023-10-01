<script lang="ts">
    import type {LatLngExpression} from 'leaflet';
    import Leaflet from "$components/Map/Leaflet.svelte";
    import Marker from "$components/Map/Marker.svelte";
    import Popup from "$components/Map/Popup.svelte";
    import UserLocation from "$lib/icons/UserLocation.svelte";
    import Farm from "$lib/icons/Farm.svelte";
    import {onMount} from "svelte";

    let initialView: LatLngExpression = [51.514244, 7.468429];
    let latLng: LatLngExpression = [0, 0];
    let userLocation: LatLngExpression | null = null;

    const markerData: Array<{ latLng: LatLngExpression; description: string }> = [
        {
            latLng: [51.513870009926, 7.473969975241],
            description: "Description for Marker 1"
        },
    ];

    onMount(async () => {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        }) as GeolocationPosition;
        userLocation = [position.coords.latitude, position.coords.longitude];
        latLng = userLocation;
    });

</script>

<div>
    <Leaflet view={initialView} zoom={14}>
        {#if userLocation}
            <Marker {latLng} width={40} height={40}>
                <UserLocation width={40} height={40}/>
            </Marker>
        {/if}
        {#each markerData as {latLng, description}}
            <Marker {latLng} width={40} height={40}>
                <Farm width={40} height={40}/>
                <Popup width={150}>{description}</Popup>
            </Marker>
        {/each}
    </Leaflet>
</div>
