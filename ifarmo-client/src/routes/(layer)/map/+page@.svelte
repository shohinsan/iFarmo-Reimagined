<script lang="ts">
    import type { LatLngExpression } from 'leaflet';
    import Leaflet from "$components/Map/Leaflet.svelte";
    import Marker from "$components/Map/Marker.svelte";
    import Popup from "$components/Map/Popup.svelte";


    let initialView: LatLngExpression = [51.514244, 7.468429];

    const markerData: Array<{ latLng: LatLngExpression; description: string }> = [
        {
            latLng: [51.513870009926, 7.473969975241],
            description: "Description for Marker 1"
        },
    ];
</script>

<div >
    <Leaflet view={initialView} zoom={14}>
        {#each markerData as {latLng, description}}
            <Marker {latLng} width={40} height={40}>
                <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve"
                     style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"
                     viewBox="0 0 45 40"><path d="m23.046 25.449 9.601 16.885H13.253l9.793-16.885ZM45 23.965H25.702l9.575 16.84L45 23.965ZM44.963 20.923 35.339 4.254l-9.668 16.669h19.292ZM32.771 2.618h-4.17L8.522 37.237l2.08 3.603L32.771 2.618ZM25.084 2.618H11.465L0 22.476l6.768 11.722 18.316-31.58Z" style="fill:#e9204f;fill-rule:nonzero" transform="translate(0 -2.618)"/></svg>
                <Popup width={150}>{description}</Popup>
            </Marker>
        {/each}
    </Leaflet>
</div>