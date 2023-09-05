<script>
    import { Anchor, Button, Container } from "@svelteuidev/core";
    import { Input, InputWrapper } from '@svelteuidev/core';
    import {EnvelopeClosed, FontStyle, LockClosed, Person} from 'radix-icons-svelte';
    let sizes = {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
    };
</script>

<div class="content">
    <Container {sizes} size={300} override={{ px: 0 }}>
        <div class="input-container">
            <Input icon={FontStyle}
                   placeholder="Your name"
                   radius="md"
                   size="md" />
        </div>
        <div class="input-container">
            <Input icon={Person}
                   placeholder="Your username"
                   radius="md"
                   size="md" />
        </div>



        <div class="input-container">
            <Input icon={EnvelopeClosed}
                   placeholder="Your email"
                   radius="md"
                   size="md" />
        </div>

        <div class="input-container">
            <Input icon={LockClosed}
                   placeholder="Your Password"
                   radius="md"
                   size="md" />
        </div>

        <div class="input-container">
            <Input icon={LockClosed}
                   placeholder="Confirm Your Password"
                   radius="md"
                   size="md" />
        </div>

        <Button fullSize variant='gradient' gradient={{ from: 'teal', to: 'green', deg: 105 }}>
            Submit
        </Button>
        <p>Already have an account? <Anchor href="/login">Login</Anchor></p>
    </Container>
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
