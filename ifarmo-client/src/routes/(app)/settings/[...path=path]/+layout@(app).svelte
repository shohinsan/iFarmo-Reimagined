<script>
    import {Anchor, Card, Container, Grid, Stack} from "@svelteuidev/core";
</script>


    <Container override={{bc: 'AliceBlue'}}>
        <Grid override={{
            paddingBottom: '3rem',
        }}>
            <Grid.Col xs={12} md={4} override={{paddingTop: '10rem'}}>
                <Stack>
                    <Anchor underline={false} href="/settings">General</Anchor>
                    <Anchor underline={false} href="/settings/password">Password</Anchor>
                </Stack>

            </Grid.Col>
            <Grid.Col xs={12} md={8} >
                <slot />

            </Grid.Col>
        </Grid>
    </Container>
