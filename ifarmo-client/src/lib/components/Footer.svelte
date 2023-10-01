<script>
    import {
        Container,
        SimpleGrid,
        Text,
        Stack,
        Anchor,
       Divider, Group, ActionIcon
    } from "@svelteuidev/core";
    import {DiscordLogo, InstagramLogo, TwitterLogo} from "radix-icons-svelte";
</script>

<div class="content">
    <footer class="footer">
        <Container size="xl">
            <SimpleGrid spacing="xl" breakpoints={[
                { minWidth: 'xs', cols: 1 },
                { minWidth: 'sm', cols: 2 },
                { minWidth: 1200, cols: 4 }
            ]}>
                <div class="column">
                    <Text variant='gradient' size='xl' weight='bold'
                          override={{ marginBottom: '15px' }}
                          gradient={{ from: 'teal', to: 'green', deg: 45 }}>
                        iFarmo
                    </Text>
                </div>
                <div class="column">
                    <Text variant='gradient' size='xl' weight='bold'
                          override={{ marginBottom: '15px' }}
                          gradient={{ from: 'teal', to: 'green', deg: 45 }}>
                        Buy
                    </Text>
                    <Stack>
                        <Anchor underline={false} href="/">Registration</Anchor>
                        <Anchor underline={false} href="/">Buying help</Anchor>
                    </Stack>
                    <Text variant='gradient' size='xl' weight='bold'
                          override={{ marginBottom: '15px',  marginTop: '50px' }}
                          gradient={{ from: 'teal', to: 'green', deg: 45 }}>
                        Sell
                    </Text>
                    <Stack>
                        <Anchor underline={false} href="/">Post</Anchor>
                        <Anchor underline={false} href="/">Start posting</Anchor>
                        <Anchor underline={false} href="/">How to post</Anchor>
                    </Stack>
                </div>
                <div class="column">
                    <Text variant='gradient' size='xl' weight='bold'
                          override={{ marginBottom: '15px' }}
                          gradient={{ from: 'teal', to: 'green', deg: 45 }}>
                        Help
                    </Text>
                    <Stack>
                        <Anchor underline={false} href="/">Seller Center</Anchor>
                        <Anchor underline={false} href="/">Contact Us</Anchor>
                    </Stack>
                    <Text variant='gradient' size='xl' weight='bold'
                          override={{ marginBottom: '15px',  marginTop: '50px' }}
                          gradient={{ from: 'teal', to: 'green', deg: 45 }}>
                        Community
                    </Text>
                    <Stack>
                        <Anchor underline={false} href="/">Announcements</Anchor>
                        <Anchor underline={false} href="/">iFarmo Community</Anchor>
                        <Anchor underline={false} href="/">iFarmo for Business</Anchor>
                    </Stack>
                </div>
                <div class="column">
                    <Text variant='gradient' size='xl' weight='bold'
                          override={{ marginBottom: '15px' }}
                          gradient={{ from: 'teal', to: 'green', deg: 45 }}>
                        About iFarmo
                    </Text>
                    <Stack>
                        <Anchor underline={false} href="/">Company Info</Anchor>
                        <Anchor underline={false} href="/">News</Anchor>
                        <Anchor underline={false} href="/">Global Impact</Anchor>
                        <Anchor underline={false} href="/">Advertise with us</Anchor>
                    </Stack>
                    <Text variant='gradient' size='xl' weight='bold'
                          override={{ marginBottom: '15px',  marginTop: '50px' }}
                          gradient={{ from: 'teal', to: 'green', deg: 45 }}>
                        Legal
                    </Text>
                    <Stack>
                        <Anchor underline={false} href="/">Accessibility</Anchor>
                        <Anchor underline={false} href="/">User Agreement</Anchor>
                        <Anchor underline={false} href="/">Privacy Policy</Anchor>
                        <Anchor underline={false} href="/">Terms of Use</Anchor>
                        <Anchor underline={false} href="/">Cookies</Anchor>
                    </Stack>
                </div>
            </SimpleGrid>

            <Divider
                    override={{
                            marginTop: '50px',
                            marginBottom: '20px'
                        }}
                    size="xs"/>
            <Group
                   position="apart">
                <Text color="lime" >Copyright @ 2023-2023 iFarmo Inc.</Text>
                <Group>
                    <ActionIcon color="lime" >
                            <InstagramLogo size={32} />
                    </ActionIcon>
                    <ActionIcon color="lime">
                        <DiscordLogo size={32} />
                    </ActionIcon>
                    <ActionIcon color="lime">
                        <TwitterLogo size={32} />
                    </ActionIcon>
                </Group>
            </Group>
        </Container>

    </footer>
</div>

<style lang="scss">
  .content {

    @include breakpoint.down('sm') {
      align-items: center;
      text-align: center;
      justify-content: center;

    }
  }

  .footer {
    flex-direction: column;
    align-items: center;
    background-color: #0b1625;
    padding: 50px;
    display: flex;
    justify-content: center;

    @include breakpoint.down('sm') {
      flex-direction: column; /* Stack columns vertically on small screens */
      text-align: center;
    }
  }

  .column {
    background-color: #0b1625;
    padding: 39px;
  }
</style>
