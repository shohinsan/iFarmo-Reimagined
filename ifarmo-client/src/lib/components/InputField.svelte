<script lang="ts">
    export let variant: 'solid' | 'outline' = 'outline';
    export let color: 'grey' | 'white' = 'grey';
    export let label = '';
    export let placeholder = '';
    export let value = '';
    export let className = '';

</script>

<div class="{className}">
    <label class="input-label">{label}</label>
    <br/>
    <input class="input-field"
            bind:value
            placeholder={placeholder}
            {...$$restProps}/>
</div>

<style lang="scss">
  .input-field {
    padding: 0.45rem 0.5rem;
    border-radius: 5px;
    transition: 0.15s;
    outline: none;
  }


  .input-field-solid {
    border: 1px solid #ddd;
    background-color: #fff;
  }

  .input-field-outline {
    border: 1px solid #ddd;
    background-color: transparent;
  }

  .input-field-grey {
    color: black;
    background-color: white;
  }
</style>
