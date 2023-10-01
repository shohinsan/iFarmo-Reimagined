<script lang="ts">
    import {Anchor, Button, Container, TextInput} from "@svelteuidev/core";
    import {EnvelopeClosed, FontStyle, LockClosed, Person} from 'radix-icons-svelte';
    import {enhance} from '$app/forms';

    let sizes = {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
    };


</script>

<div class="content">
    <form method="POST" use:enhance>
    <Container {sizes} override={{ px: 0 }}>
        <div class="input-container">
            <TextInput icon={FontStyle}
                   name="name"
                   placeholder="Your name"
                   radius="md"
                   size="md" />
        </div>
        <div class="input-container">
            <TextInput icon={Person}
                   name="username"
                   placeholder="Your username"
                   radius="md"
                   size="md" />
        </div>



        <div class="input-container">
            <TextInput icon={EnvelopeClosed}
                   name="email"
                   placeholder="Your email"
                   radius="md"
                   size="md" />
        </div>

        <div class="input-container">
            <TextInput icon={LockClosed}
                   name="password"
                   placeholder="Your Password"
                   radius="md"
                   size="md" />
        </div>

        <div class="input-container">
            <TextInput icon={LockClosed}
                   name="confirm_password"
                   placeholder="Confirm Your Password"
                   radius="md"
                   size="md" />
        </div>

        <Button fullSize variant='gradient' gradient={{ from: 'teal', to: 'green', deg: 105 }}>
            Submit
        </Button>
        <p>Already have an account? <Anchor href="/login">Login</Anchor></p>
    </Container>
    </form>
</div>

<style>
    .content {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 90vh;
    }

    .input-container {
        margin-bottom: 20px; /* Add margin to create space between input elements */
    }
</style>
