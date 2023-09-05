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
                        <Text size="lg">iFarmo</Text>
                </div>
                <div class="column">
                        <Text size="lg">Description B</Text>
                        <Text size="sm" override={{ marginBottom: '10px' }}>
                        </Text>
                        <Stack>
                            <Anchor underline={false} href="/">Link</Anchor>
                            <Anchor underline={false} href="/">Link</Anchor>
                            <Anchor underline={false} href="/">Link</Anchor>
                            <Anchor underline={false} href="/">Link</Anchor>
                        </Stack>
                </div>
                <div class="column">
                        <Text size="lg">Description C</Text>
                        <Text size="sm" override={{ marginBottom: '10px' }}>
                        </Text>
                        <Stack>
                            <Anchor underline={false} href="/">Link</Anchor>
                            <Anchor underline={false} href="/">Link</Anchor>
                            <Anchor underline={false} href="/">Link</Anchor>
                            <Anchor underline={false} href="/">Link</Anchor>
                        </Stack>
                </div>
                <div class="column">
                        <Text size="lg">Description D</Text>
                        <Text size="sm" override={{ marginBottom: '10px' }}>
                        </Text>
                        <Stack>
                            <Anchor underline={false} href="/">Link</Anchor>
                            <Anchor underline={false} href="/">Link</Anchor>
                            <Anchor underline={false} href="/">Link</Anchor>
                            <Anchor underline={false} href="/">Link</Anchor>
                        </Stack>
                </div>
            </SimpleGrid>
            <Box css={{ bc: $colorScheme === "dark" ? 'f0f0f0' : 'f0f0f0', mt: 10,p: '$mdPX', br: 'md', userSelect: 'none' }}>
                <Text align="center">All Rights Reserved</Text>
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
