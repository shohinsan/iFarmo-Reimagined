<!-- Select.svelte -->
<script>
    export let options = [];
    export let value = '';
    export let name = ''; // Add a name prop
</script>

<div class="custom-select">
    <select bind:value={value} name={name} class="styled-select">
        {#each options as option}
            <option value={option}>{option}</option>
        {/each}
    </select>
    <div class="selected-option">{value}</div>
    <div class="dropdown-icon">▼</div>
</div>

<style>
    .custom-select {
        position: relative;
        display: inline-block;
        width: 100%;
    }

    .styled-select {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #fff;
        cursor: pointer;
    }

    .selected-option {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #fff;
        cursor: pointer;
    }

    .dropdown-icon {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        pointer-events: none;
    }

    /* Style for the dropdown options */
    select {
        position: absolute;
        opacity: 0;
        width: 100%;
        cursor: pointer;
    }

    select option {
        background-color: #fff;
        color: #333;
        padding: 8px;
    }

    /* Style for the dropdown when opened */
    select:focus {
        outline: none;
    }
</style>
