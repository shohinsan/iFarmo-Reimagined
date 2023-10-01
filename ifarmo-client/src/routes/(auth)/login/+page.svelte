<script lang="ts">
    import {Anchor, Button, Container, TextInput} from "@svelteuidev/core";
    import {EnvelopeClosed, LockClosed} from 'radix-icons-svelte';
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
    <Container {sizes} override={{ px: 0 }}>
        <form method="POST" use:enhance>

            <div class="input-container">
                <TextInput icon={EnvelopeClosed}
                       name="username"
                       placeholder="Your username"
                       radius="md"
                       size="md"/>
            </div>

            <div class="input-container">
                <TextInput icon={LockClosed}
                       name="password"
                       placeholder="Your Password"
                       radius="md"
                       size="md"/>
            </div>

            <Button fullSize variant='gradient' gradient={{ from: 'teal', to: 'green', deg: 105 }}>
                Submit
            </Button>
        </form>
        <p>Don't have an account?
            <Anchor href="/register">Register</Anchor>
        </p>
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
        margin-bottom: 20px;
    }
</style>
