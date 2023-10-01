<script lang="ts">
    import {
        Accordion, Anchor,
        Badge, Box, Button,
        Card,
        Container,
        Group,
        Image,
        SimpleGrid,
        Stack,
        Text, Textarea, TextInput
    } from "@svelteuidev/core";
    import Quality from "$lib/icons/Quality.svelte";
    import Easy from "$lib/icons/Easy.svelte";
    import Reliable from "$lib/icons/Reliable.svelte";
    import Convenient from "$lib/icons/Convenient.svelte";
    import Variety from "$lib/icons/Variety.svelte";
    import Support from "$lib/icons/Support.svelte";
    import Farm from "$lib/icons/Farm.svelte";
</script>

<svelte:head>
    <title>iFarmo</title>
</svelte:head>

<div class="content">
    <Container
            override={{
        padding: '50px',
        'padding-bottom': '100px',
    }}>
        <Image src={"src/assets/hero_header.svg"}/>
        <Stack override={{
            paddingTop: '50px',
        }}>
            <Text
                    variant="gradient"
                    gradient={{ from: 'green', to: 'lime', deg: 45 }}
                    override={{
                textAlign: 'center',
            }}
                    weight="bold" size="xl">Key features
            </Text>
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

            <div style="width: 280px; margin: auto;">
                <Card override={{
                    borderRadius: '$lg',
                }} shadow="sm" padding="xl">
                    <Group override={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}>
                        <Quality width={50} height={50}/>
                        <Text weight="bold">Quality</Text>
                        <Text override={{
                            height: '100px',
                        }}>We've established partnerships with the finest farms and stores to guarantee that the
                            produce and products you find here are nothing short of the very best.
                        </Text>
                    </Group>
                </Card>
            </div>
            <div style="width: 280px; margin: auto;">
                <Card override={{
                    borderRadius: '$lg',
                }} shadow="sm" padding="xl">
                    <Group override={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}>
                        <Easy width={50} height={50}/>
                        <Text weight="bold">Easy</Text>
                        <Text override={{
                            height: '100px',
                        }}>Selling, lending, hiring, or buying on our platform is a breeze. We've streamlined the
                            process to save you time and effort.
                        </Text>
                    </Group>
                </Card>
            </div>
            <div style="width: 280px; margin: auto;">
                <Card override={{
                    borderRadius: '$lg',
                }} shadow="sm" padding="xl">
                    <Group override={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}>
                        <Reliable width={50} height={50}/>
                        <Text weight="bold">Reliable</Text>
                        <Text override={{
                            height: '100px',
                        }}>We prioritize reliability in every aspect of our platform. You can trust us to connect you
                            with reputable farmers and dependable services.
                        </Text>
                    </Group>
                </Card>
            </div>
            <div style="width: 280px; margin: auto;">
                <Card override={{
                    borderRadius: '$lg',
                }} shadow="sm" padding="xl">
                    <Group override={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}>
                        <Convenient width={50} height={50}/>
                        <Text weight="bold">Convenience</Text>
                        <Text override={{
                            height: '100px',
                        }}>Find for fresh produce and agricultural products from the comfort of your home or office.
                        </Text>
                    </Group>
                </Card>
            </div>

            <div style="width: 280px; margin: auto;">
                <Card override={{
                    borderRadius: '$lg',
                }} shadow="sm" padding="xl">
                    <Group override={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}>
                        <Variety width={50} height={50}/>
                        <Text weight="bold">Variety</Text>
                        <Text override={{
                            height: '100px',
                        }}>Discover a wide range of agricultural products from different sellers.
                        </Text>
                    </Group>
                </Card>
            </div>

            <div style="width: 280px; margin: auto;">
                <Card override={{
                    borderRadius: '$lg',
                }} shadow="sm" padding="xl">
                    <Group override={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}>
                        <Support width={50} height={50}/>
                        <Text weight="bold">Support</Text>
                        <Text override={{
                            height: '100px',
                        }}>We provide excellent customer support to assist you throughout your journey.
                        </Text>
                    </Group>
                </Card>
            </div>

        </SimpleGrid>

        <Stack override={{
            paddingTop: '50px',
        }}>
            <Text
                    variant="gradient"
                    gradient={{ from: 'green', to: 'lime', deg: 45 }}
                    override={{
                textAlign: 'center',
            }}
                    weight="bold" size="xl">Featured Sellers
            </Text>
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

            <div style="width: 280px; margin: auto;">
                <Card override={{
                    borderRadius: '$lg',
                }} shadow="sm" padding="xl">
                    <Group override={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}>
                        <Farm width={50} height={50}/>
                        <Text weight="bold">Farm Title</Text>
                    </Group>
                    <Text override={{
                                            color: '$gray500',
                                            marginTop: '15px',
                                            height: '55px',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                        }}>
                        <!--                            {product.description.length > 96-->
                        <!--                                ? `${product.description.slice(0, 96)}`-->
                        <!--                                : product.description}...-->
                        Description
                    </Text>
                    <Group override={{
                        paddingTop: '20px',
                    }}>
                        <Badge variant="light" size="lg" radius="sm">
                            City
                        </Badge>
                        <Text>Farm City</Text>
                    </Group>
                    <Group override={{
                        paddingTop: '10px',
                    }}>
                        <Badge variant="light" size="lg" radius="sm">
                            Hours
                        </Badge>
                        <Text>Farm Work Hours</Text>
                    </Group>
                </Card>
            </div>

            <div style="width: 280px; margin: auto;">
                <Card override={{
                    borderRadius: '$lg',
                }} shadow="sm" padding="xl">
                    <Group override={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}>
                        <Farm width={50} height={50}/>
                        <Text weight="bold">Farm Title</Text>
                    </Group>
                    <Text override={{
                                            color: '$gray500',
                                            marginTop: '15px',
                                            height: '55px',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                        }}>
                        <!--                            {product.description.length > 96-->
                        <!--                                ? `${product.description.slice(0, 96)}`-->
                        <!--                                : product.description}...-->
                        Description
                    </Text>
                    <Group override={{
                        paddingTop: '20px',
                    }}>
                        <Badge variant="light" size="lg" radius="sm">
                            City
                        </Badge>
                        <Text>Farm City</Text>
                    </Group>
                    <Group override={{
                        paddingTop: '10px',
                    }}>
                        <Badge variant="light" size="lg" radius="sm">
                            Hours
                        </Badge>
                        <Text>Farm Work Hours</Text>
                    </Group>
                </Card>
            </div>

            <div style="width: 280px; margin: auto;">
                <Card override={{
                    borderRadius: '$lg',
                }} shadow="sm" padding="xl">
                    <Group override={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}>
                        <Farm width={50} height={50}/>
                        <Text weight="bold">Farm Title</Text>
                    </Group>
                    <Text override={{
                                            color: '$gray500',
                                            marginTop: '15px',
                                            height: '55px',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                        }}>
                        <!--                            {product.description.length > 96-->
                        <!--                                ? `${product.description.slice(0, 96)}`-->
                        <!--                                : product.description}...-->
                        Description
                    </Text>
                    <Group override={{
                        paddingTop: '20px',
                    }}>
                        <Badge variant="light" size="lg" radius="sm">
                            City
                        </Badge>
                        <Text>Farm City</Text>
                    </Group>
                    <Group override={{
                        paddingTop: '10px',
                    }}>
                        <Badge variant="light" size="lg" radius="sm">
                            Hours
                        </Badge>
                        <Text>Farm Work Hours</Text>
                    </Group>
                </Card>
            </div>

        </SimpleGrid>

        <Stack override={{
            paddingTop: '50px',
            paddingBottom: '50px',
        }}>
            <Text
                    variant="gradient"
                    gradient={{ from: 'green', to: 'lime', deg: 45 }}
                    override={{
                textAlign: 'center',
            }}
                    weight="bold" size="xl">Joun Our Community
            </Text>
        </Stack>
        <Anchor underline={false} href="https://discord.gg/crChkavyme">
            <Box css={{
                backgroundColor: '$gray50',
                textAlign: 'center',
                padding: '$20',
                borderRadius: '$md',
                cursor: 'pointer',
                '&:hover': {
                backgroundColor: '$gray100',
            }}}>Connect with other users, share experiences, and get involved in discussions.
            </Box>
        </Anchor>
        <Stack override={{
            paddingTop: '50px',
            paddingBottom: '50px',
        }}>
            <Text variant="gradient"
                  gradient={{ from: 'green', to: 'lime', deg: 45 }}
                  override={{
                textAlign: 'center',
            }}
                    weight="bold" size="xl">Contact Us
            </Text>
            <Text color="gray">If you have any questions, need assistance, or willing to become a farmer please reach
                out to us using
                the form below:
            </Text>
        </Stack>


        <form action="?/support" method="POST">
            <Card override={{
            borderRadius: '$lg',
            paddingTop: '50px',
            paddingBottom: '50px',
        }}>
                    <TextInput
                            label="Name"
                            name="name"
                            placeholder="Enter your name"
                            id="name"
                            override={{
                                '.svelteui-Input-input': {
                                    '&:focus': {
                                        borderColor: "limegreen"
                                    }
                                }
                            }}
                    />

                <TextInput
                        label="Username"
                        name="username"
                        placeholder="Enter your username"
                        override={{
                            '.svelteui-Input-input': {
                                '&:focus': {
                                    borderColor: "limegreen"
                                }
                            }
                        }}
                />

                <Textarea placeholder="Message" label="Message"
                          name="message"
                          resize="vertical"
                          rows={6}
                          aria-label="Comment"
                          override={{
                                '.svelteui-Input-input': {
                                    '&:focus': {
                                        borderColor: "limegreen"
                                    }
                                }
                            }}
                />
                <Button override={{
                    marginTop: '$10',
                }} ripple color="limegreen" type="submit">Send Message</Button>
            </Card>

        </form>

        <Stack override={{
            paddingTop: '50px',
        }}>
            <Text
                    variant="gradient"
                    gradient={{ from: 'green', to: 'lime', deg: 45 }}
                    override={{
                textAlign: 'center',
            }}
                    weight="bold" size="xl">Frequency Asked Questions
            </Text>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>