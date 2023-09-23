<script lang="ts">
    import {
        Modal,
        Group,
        Button,
        TextInput,
        Stack,
        Space,
        Notification,
        Affix, ActionIcon, Textarea, NativeSelect, Divider
    } from '@svelteuidev/core';
    import type {ModalProps} from '@svelteuidev/core';
    import {fly} from 'svelte/transition';
    import {quintInOut} from 'svelte/easing';
    import {Rocket} from "radix-icons-svelte";
    import {enhance} from "$app/forms";
    import type {ActionData} from "./$types";
    export let form: ActionData

    interface $$Props extends Partial<ModalProps> {
        withOpenButton?: boolean;
        closeModal?: (...args: any[]) => boolean;
    }

    export let opened = false;
    export let withOpenButton = true;
    export let closeModal = () => (opened = false);

    let notificationOpened = false;

    const title = 'Title';
    let titleValue;
    const type = 'Select Type';
    let typeValue;
    const description = 'Description';
    let descriptionValue;
    const quantity = 'Quantity';
    let quantityValue;
    const unitType = 'Select Unit Type';
    let unitTypeValue;
    const price = 'Price';
    let priceValue;
    const city = 'City';
    let cityValue;

    function submitForm() {
        console.log('Form submitted')
        opened = false;
        notificationOpened = true;
        setTimeout(() => (notificationOpened = false), 4000);
    }

    let files;

    $: if (files) {
        // Note that `files` is of type `FileList`, not an Array:
        // https://developer.mozilla.org/en-US/docs/Web/API/FileList
        console.log(files);

        for (const file of files) {
            console.log(`${file.name}: ${file.size} bytes`);
        }
    }

</script>

<Modal type="submit" {opened} on:close={closeModal} title="Post new product" {...$$restProps}>
    <form action="?/create" method="POST"
          use:enhance={() => ({ update }) => {
                  update({ reset: false });
                  submitForm();
              }}>
            <Stack>
                <TextInput name="title" bind:value={titleValue} placeholder={title} label={title}/>
                <NativeSelect
                        name="type"
                        data={['None','Fruit', 'Vegetable', 'Grains', 'Nuts', 'Meat', 'Dairy', 'Baked goods', 'Plants', 'Other']}
                        bind:value={typeValue} placeholder={type} label={type}>
                </NativeSelect>
                <Textarea bind:value={descriptionValue} placeholder={description} label={description}
                          name="description"
                          resize="vertical"
                          rows={6}
                          aria-label="Comment"/>
                <TextInput name="quantity"
                        bind:value={quantityValue} placeholder={quantity} label={quantity}/>
                <TextInput name="price"
                        bind:value={priceValue} placeholder={price} label={price}/>
                <NativeSelect name="unitType"
                        data={['None','piece', 'pack', 'lb', 'kg', 'g', 'gal', 'litre', 'ml', 'oz']}
                        bind:value={unitTypeValue} placeholder={unitType} label={unitType}>
                </NativeSelect>
                <TextInput name="city"
                        bind:value={cityValue} placeholder={city} label={city}/>

                <Divider />

                <div class="uplprod">
                    <label for="upload_products" class="custom-file-upload">
                        <i class="fa fa-cloud-upload"></i> Upload Excel File (dev)
                    </label>
                    <input accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" id="upload_products" name="upload_products" type="file" />
                </div>

                <Divider />
            </Stack>
            <Space h="lg"/>
            <Group position="right">
                <Button on:click={closeModal} variant="outline">Cancel</Button>
                <Button>Submit</Button>
            </Group>
    </form>

</Modal>
{#if withOpenButton}

    <ActionIcon on:click={() => (opened = true)}
                color="lime"
                radius="xl"
                variant="light"
                override={{
                    position: 'fixed',
                    top: '1000px',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 10,
                    '@media (min-width: 0)': {
                        size: 75,
                        },
                    '@media (min-width: 992px)': {
                        size: 100,
                        },
                    }}>
        <Rocket size={50}></Rocket>
    </ActionIcon>

{/if}
{#if notificationOpened}
    <Affix position={{ bottom: 20, right: 20 }}>
        <div transition:fly={{ x: 100, duration: 400, easing: quintInOut }}>
            <Notification
                    title="Form Submitted Successfully"
                    on:close={() => (notificationOpened = false)}
            >
                Your form was subbmitted successfully! No need to think about it any longer.
            </Notification>
        </div>
    </Affix>
{/if}


<style>
    .uplprod {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .custom-file-upload {
        width: 100%;
        max-width: 375px;
        height: 50px;
        display: flex; /* Add this */
        align-items: center;
        justify-content: center;
        text-align: center;
        border: 2px solid #ccc;
        padding: 6px 12px;
        cursor: pointer;
        background-color: #f8f8f8;
        color: #333;
        border-radius: 4px;
    }

    .custom-file-upload:hover {
        background-color: #e0e0e0;
    }

    input[type="file"] {
        display: none;
    }
</style>

