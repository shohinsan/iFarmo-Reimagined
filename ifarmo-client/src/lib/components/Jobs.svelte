<script lang="ts">
    import {
        Modal,
        Group,
        Button,
        TextInput,
        Stack,
        Space,
        Notification,
        Affix, ActionIcon
    } from '@svelteuidev/core';
    import type { ModalProps } from '@svelteuidev/core';
    import { fly } from 'svelte/transition';
    import { quintInOut } from 'svelte/easing';
    import {Rocket} from "radix-icons-svelte";

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
    const type = 'Type';
    let typeValue;
    const description = 'Description';
    let descriptionValue;
    const unitType = 'Unit Type';
    let unitTypeValue;
    const salary = 'Salary';
    let salaryValue;
    const city = 'City';
    let cityValue;



    const lastName = 'Last Name';


    function submitForm() {
        opened = false;
        notificationOpened = true;
        setTimeout(() => (notificationOpened = false), 4000);
    }
</script>

    <Modal {opened} on:close={closeModal} title="Post new product" {...$$restProps}>
        <Stack>
            <TextInput bind:value={titleValue} placeholder={title} label={title} />
            <TextInput bind:value={typeValue} placeholder={type} label={type} />
            <TextInput bind:value={descriptionValue} placeholder={description} label={description} />
            <TextInput bind:value={salaryValue} placeholder={salary} label={salary} />
            <TextInput bind:value={unitTypeValue} placeholder={unitType} label={unitType} />
            <TextInput bind:value={cityValue} placeholder={city} label={city} />
        </Stack>
        <Space h="lg" />
        <Group position="right">
            <Button on:click={closeModal} variant="outline">Cancel</Button>
            <Button on:click={submitForm}>Submit</Button>
        </Group>
    </Modal>




{#if withOpenButton}
    <ActionIcon on:click={() => (opened = true)} size={100} color="lime" radius="xl" variant="light"
                override={{
        position: 'fixed',
        top: '1000px',
        bottom: '20px',
        right: '20px',
        zIndex: 1000
    }}>
        <Rocket size={50} />
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
