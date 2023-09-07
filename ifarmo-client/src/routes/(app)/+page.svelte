<script>
    import {
        Accordion,
        Badge, Box, Button,
        Card,
        Center,
        Container,
        Grid,
        Group,
        Image,
        SimpleGrid,
        Stack,
        Text, Textarea, TextInput
    } from "@svelteuidev/core";

    export let data;
</script>

<svelte:head>
    <title>iFarmo</title>
</svelte:head>

<div class="content">
    <Container
            override={{
        padding: '50px',
        bc: 'AliceBlue',
        '@media (min-width: 992px)': {
            width: '900px !important',
        },
        '@media (min-width: 768px) and (max-width: 991px)': {
            width: '700px !important',
        },
        '@media (max-width: 767px)': {
            width: '400px !important',
        },
        'padding-bottom': '100px', // Add some bottom padding
    }}>
        <Image src={"src/assets/hero_header.svg"}/>
        <Stack override={{
            paddingTop: '50px',
        }}>
            <Text weight={600} size="xl">Key features</Text>
        </Stack>
        <SimpleGrid
                override={{
                    paddingTop: '50px',
                }}
                breakpoints={[
                { minWidth: 'xs', cols: 1 },
                { minWidth: 'sm', cols: 2 },
                { minWidth: 1200, cols: 3 }
            ]}>

            <div style="width: 280px; margin: auto">
                <Card shadow="sm" padding="xl">
                    <Card.Section first padding="lg">
                        <Image
                                src="###"
                                height={100}
                                alt="###"/>
                    </Card.Section>
                    <Stack>
                        <Text weight={500}>Quality</Text>
                        <Text>We've established partnerships with the finest farms and stores to guarantee that the
                            produce and products you find here are nothing short of the very best.
                        </Text>
                    </Stack>
                </Card>
            </div>
            <div style="width: 280px; margin: auto">
                <Card shadow="sm" padding="xl">
                    <Card.Section first padding="lg">
                        <Image
                                src="###"
                                height={100}
                                alt="###"/>
                    </Card.Section>
                    <Stack>
                        <Text weight={500}>Easy</Text>
                        <Text>Selling, lending, hiring, or buying on our platform is a breeze. We've streamlined the
                            process to save you time and effort.
                        </Text>
                    </Stack>
                </Card>
            </div>
            <div style="width: 280px; margin: auto">
                <Card shadow="sm" padding="xl">
                    <Card.Section first padding="lg">
                        <Image
                                src="###"
                                height={100}
                                alt="###"/>
                    </Card.Section>
                    <Stack>
                        <Text weight={500}>Reliable</Text>
                        <Text>We prioritize reliability in every aspect of our platform. You can trust us to connect you
                            with reputable farmers and dependable services.
                        </Text>
                    </Stack>
                </Card>
            </div>
            <div style="width: 280px; margin: auto">
                <Card shadow="sm" padding="xl">
                    <Card.Section first padding="lg">
                        <Image
                                src="###"
                                height={100}
                                alt="###"/>
                    </Card.Section>
                    <Stack>
                        <Text weight={500}>Convenience</Text>
                        <Text>Find for fresh produce and agricultural products from the comfort of your home.</Text>
                    </Stack>
                </Card>
            </div>
            <div style="width: 280px; margin: auto">
                <Card shadow="sm" padding="xl">
                    <Card.Section first padding="lg">
                        <Image
                                src="###"
                                height={100}
                                alt="###"/>
                    </Card.Section>
                    <Stack>
                        <Text weight={500}>Variety</Text>
                        <Text>Discover a wide range of agricultural products from different sellers.</Text>
                    </Stack>
                </Card>
            </div>
            <div style="width: 280px; margin: auto">
                <Card shadow="sm" padding="xl">
                    <Card.Section first padding="lg">
                        <Image
                                src="###"
                                height={100}
                                alt="###"/>
                    </Card.Section>
                    <Stack>
                        <Text weight={500}>Support</Text>
                        <Text>We provide excellent customer support to assist you throughout your journey.</Text>
                    </Stack>
                </Card>

            </div>
        </SimpleGrid>

        <Stack override={{
            paddingTop: '50px',
        }}>
            <Text weight={600} size="xl">Featured Products & Sellers</Text>
        </Stack>

        <SimpleGrid
                override={{
                    paddingTop: '50px',
                }}
                breakpoints={[
                { minWidth: 'xs', cols: 1 },
                { minWidth: 'sm', cols: 2 },
                { minWidth: 1200, cols: 3 }
            ]}>

            <div style="width: 280px; margin: auto">
                <Card shadow="sm" padding="xl">
                    <Card.Section first padding="lg">
                        <Image
                                src="###"
                                height={100}
                                alt="###"/>
                    </Card.Section>
                    <Stack>
                        <Text weight={500}>Featured Product 1</Text>
                        <Text>Discover this amazing product from one of our top sellers.</Text>
                    </Stack>
                </Card>
            </div>
            <div style="width: 280px; margin: auto">
                <Card shadow="sm" padding="xl">
                    <Card.Section first padding="lg">
                        <Image
                                src="###"
                                height={100}
                                alt="###"/>
                    </Card.Section>
                    <Stack>
                        <Text weight={500}>Featured Product 2</Text>
                        <Text>Don't miss out on this popular item from our sellers.</Text>
                    </Stack>
                </Card>
            </div>
            <div style="width: 280px; margin: auto">
                <Card shadow="sm" padding="xl">
                    <Card.Section first padding="lg">
                        <Image
                                src="###"
                                height={100}
                                alt="###"/>
                    </Card.Section>
                    <Stack>
                        <Text weight={500}>Featured Sellers 1</Text>
                        <Text>Get to know our top-rated seller who offers quality products.</Text>
                    </Stack>
                </Card>
            </div>
        </SimpleGrid>

        <Stack override={{
            paddingTop: '50px',
            paddingBottom: '50px',
        }}>
            <Text weight={600} size="xl">Join Our Community</Text>
        </Stack>

        <Box
                css={{
        backgroundColor: '$gray50',
        textAlign: 'center',
        padding: '$20',
        borderRadius: '$md',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '$gray100',
        },
    }}
        >
            Connect with other users, share experiences, and get involved in discussions.
        </Box>

        <Stack override={{
            paddingTop: '50px',
        }}>
            <Text weight={600} size="xl">Contact Us</Text>
            <Text>If you have any questions, need assistance, or willing to become a farmer please reach out to us using the form below:
            </Text>
        </Stack>

        <form action="?/support" method="POST">
                <TextInput
                        label="Name"
                        name="name"
                        placeholder="Enter your name"
                />
                <TextInput
                        label="Username"
                        name="username"
                        placeholder="Enter your username"
                />
            <Textarea placeholder="Message" label="Message"
                      name="message"
                      resize="vertical"
                      rows={6}
                      aria-label="Comment"/>
            <Button override={{
                marginTop: '$10',
            }}
                    type="submit">
                Send Message
            </Button>
        </form>

        <Stack override={{
            paddingTop: '50px',
        }}>
            <Text weight={600} size="xl">Frequently asked questions</Text>
        </Stack>

        <Accordion override={{
            marginBottom: '$10',
            marginTop: '$10',
        }}>
            <Accordion.Item value="typescript">
                <div slot="control">Consider for FAQ use</div>
                Build type safe applications...
            </Accordion.Item>
            <Accordion.Item value="packed">
                <div slot="control">bla bla bla</div>
                SvelteUI contains more than just components...
            </Accordion.Item>
            <Accordion.Item value="accessible">
                <div slot="control">lmao lmao</div>
                All components are accessible according to WAI-ARIA standards....
            </Accordion.Item>
        </Accordion>


    </Container>
</div>

<style lang="scss">
  .content {
    padding-top: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>