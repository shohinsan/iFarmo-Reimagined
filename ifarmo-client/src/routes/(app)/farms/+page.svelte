<script>
    import {
        Anchor,
        Badge,
        Card,
        Center,
        Container,
        Group,
        Image,
        SimpleGrid,
        Stack,
        Text
    } from "@svelteuidev/core";
    import { page } from "$app/stores";

    let farm = $page.data.farm;


</script>

<Container override={{ padding: '50px' }}>
    <SimpleGrid
            breakpoints={[
                { minWidth: 'xs', cols: 1 },
                { minWidth: 'sm', cols: 2 },
                { minWidth: 1200, cols: 3 }
            ]}>
        {#each farm as farmObj}
            <Center>
                <div style="width: 340px;
                    padding-bottom: 100px;
                    margin: auto">
                    <Anchor underline={false} href="/farms/{farmObj.ownerId}">
                        <Card override={{
                            borderRadius: '$lg',
                        }}
                              shadow="sm" padding="lg">
                            <Card.Section first padding="lg">
                                <Group position="apart" override={{
                                        margin: '$lgPX'}}>
                                </Group>
                                <Image
                                        override={{
                                        margin: '$lgPX',
                                        }}
                                        height="150px"
                                />
                            </Card.Section>
                            <Group position="apart" override={{ marginBottom: '15px', marginTop: '$smPX' }}>
                                <Text
                                        variant="gradient"
                                        gradient={{ from: 'teal', to: 'lime', deg: 45 }}
                                        size="xl" weight="bold">{farmObj.title}</Text>
                                <Badge color="pink" variant="light">On Sale</Badge>
                            </Group>
                            <Group override={{ lineHeight: 1.5 }}>
                                <Stack>
                                    <Text override={{
                                            color: '$gray500',
                                            marginTop: '$lg',
                                            height: '55px',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                        }}>
                                        {farmObj.description.length > 96
                                            ? `${farmObj.description.slice(0, 96)}`
                                            : farmObj.description}...
                                    </Text>
                                </Stack>
                                <Group>
                                    <Group position="apart">
                                        <Badge variant="light" size="lg" radius="sm">
                                            Hours
                                        </Badge>
                                        <Text>{farmObj.workingHours}</Text>
                                    </Group>

                                    <Group position="apart">
                                        <Badge variant="light" size="lg" radius="sm">
                                            Location
                                        </Badge>
                                        <Text>{farmObj.location}</Text>
                                    </Group>
                                </Group>
                            </Group>
                        </Card>
                    </Anchor>

                </div>
            </Center>
        {/each}
    </SimpleGrid>
</Container>

<style lang="scss">
</style>