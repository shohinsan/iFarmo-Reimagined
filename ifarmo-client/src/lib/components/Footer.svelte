<script>
    import {Container, SimpleGrid, Card, Text, Stack, Button, Anchor, Box, colorScheme, Input} from "@svelteuidev/core";
    import {EnvelopeClosed} from "radix-icons-svelte";
</script>

<div class="content">
    <footer class="footer">
        <Container fixed size="md" override={{ px: 'xl' }}>
            <SimpleGrid spacing="xl" breakpoints={[
                { minWidth: 'xs', cols: 1 },
                { minWidth: 'sm', cols: 2 },
                { minWidth: 1200, cols: 4 }
            ]}>
                <div class="column">
                    <Text size="lg" override={{ marginBottom: '10px' }}>Buy</Text>
                    <Stack>
                        <Anchor underline={false} href="/">Registration</Anchor>
                        <Anchor underline={false} href="/">Buying help</Anchor>
                    </Stack>
                </div>
                <div class="column">
                    <Text size="lg" override={{ marginBottom: '10px' }}>Sell</Text>
                    <Stack>
                        <Anchor underline={false} href="/">Post</Anchor>
                        <Anchor underline={false} href="/">Start posting</Anchor>
                        <Anchor underline={false} href="/">How to post</Anchor>
                    </Stack>
                </div>
                <div class="column">
                    <Text size="lg" override={{ marginBottom: '10px' }}>About iFarmo</Text>
                    <Stack>
                        <Anchor underline={false} href="/">Company Info</Anchor>
                        <Anchor underline={false} href="/">News</Anchor>
                        <Anchor underline={false} href="/">Global Impact</Anchor>
                        <Anchor underline={false} href="/">Advertise with us</Anchor>
                    </Stack>
                </div>
                <div class="column">
                    <Text size="lg" override={{ marginBottom: '10px' }}>Help</Text>
                    <Stack>
                        <Anchor underline={false} href="/">Seller Center</Anchor>
                        <Anchor underline={false} href="/">Contact Us</Anchor>
                    </Stack>
                    <Text size="lg" override={{ marginBottom: '10px', marginTop: '20px' }}>Community</Text>
                    <Stack>
                        <Anchor underline={false} href="/">Announcements</Anchor>
                        <Anchor underline={false} href="/">iFarmo Community</Anchor>
                        <Anchor underline={false} href="/">iFarmo for Business</Anchor>
                    </Stack>
                </div>
            </SimpleGrid>
            <Box css={{ bc: $colorScheme === "dark" ? 'f0f0f0' : 'f0f0f0', mt: 10,p: '$mdPX', br: 'md', userSelect: 'none' }}>
                <Text align="center">Copyright @ 2023-2023 iFarmo Inc. All Rights Reserved. Accessibility, User Agreement, Privacy Policy, Terms of Use, and Cookies</Text>
            </Box>

        </Container>
    </footer>
</div>

<style lang="scss">
  .content {
    display: flex;
    flex-direction: column;
  }

  .footer {
    align-items: center;
    background-color: #f0f0f0;
    border-top: 1px solid #ccc;
    padding: 20px;
  }

  .column {
    background-color: #f0f0f0;
    padding-top: 10px;
  }
</style>
