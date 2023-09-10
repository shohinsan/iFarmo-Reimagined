<script>
    import {Card, Container, Grid, Stack} from "@svelteuidev/core";
    import {page} from "$app/stores";

    let settingsItems = [
        {name: "General", href: "/settings"},
        {name: "Password", href: "/settings/password"},
    ];
</script>

<Container>
    <Grid>
        <Grid.Col xs={12} md={4}>
            <Card override={{
                width: '100%',
                height: '100%',
                boxShadow: '0 0 0 1px rgba(0,0,0,.05), 0 1px 3px rgba(0,0,0,.1)',
                backgroundColor: '#FAF9F6',
            }}>
                <Stack
                        override={{
                    padding: '2rem 1rem 0 1rem',
                    gap: '0.5rem',
                }}>
                    {#each settingsItems as item}
                        <a
                                href={item.href}
                                class:active={item.href === $page.url.pathname}
                                class:hover={true}
                        >
                            {item.name}
                        </a>
                    {/each}
                </Stack>
            </Card>
        </Grid.Col>
        <Grid.Col xs={12} md={8}>
            <div class="slot-height"/>
            <slot/>
        </Grid.Col>
    </Grid>
</Container>

<style lang="scss">
  a {
    text-decoration: none;
    color: #333;
    padding: 10px;
    display: inline-block;

    &:hover {
      color: #FF0000;
      border-radius: 0.5rem;
      background: linear-gradient(105deg, #CCCCCC, #FFFFFF); /* Grey to White gradient on hover */
    }

    &.active {
      border-radius: 0.5rem;
      background: linear-gradient(105deg, #00FFFF, #00FF00);
    }
  }
</style>
