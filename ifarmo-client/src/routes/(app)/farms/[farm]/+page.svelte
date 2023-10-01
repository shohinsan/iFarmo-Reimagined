<script>
    import {
        Tabs,
        Container,
        Button,
        Badge,
        Group,
        Anchor,
        Text,
        Card,
        Image,
        Stack,
        Center,
        SimpleGrid
    } from "@svelteuidev/core";
    import {page} from "$app/stores";
    import Farm from "$lib/icons/Farm.svelte";

    export let data;

    let farm = $page.data.farm


</script>
<svelte:head>
    <title>iFarmo</title>
</svelte:head>

<Container override={{
        paddingTop: '50px',
    }}>

    <div class="farm-card">
        <Group override={{
                paddingBottom: '30px',
            }}>
            <Farm width={121} height={121}/>
            <div>
                <Group override={{
                    margin: '10px',
                }}>
                    <Badge color="lime">Brand</Badge>
                    <Text>{farm.title}</Text>
                </Group>
                <Group override={{
                    margin: '10px',
                }}>
                    <Badge color="lime">Location</Badge>
                    <Text>{farm.location}</Text>
                </Group>
                <Group override={{
                    margin: '10px',
                }}>
                    <Badge color="lime">Hours</Badge>
                    <Text>{farm.workingHours}</Text>
                </Group>
            </div>
            {#if data.user}
                <div class="button-section">
                    <Anchor underline={false} href="/settings">
                        <Button ripple variant='gradient' gradient={{from: 'orange', to: 'red', deg: 45}}>
                            Edit User Information
                        </Button>
                    </Anchor>
                </div>
            {/if}
        </Group>
        <div class="farm-info">
            <Text>{farm.description}</Text>
        </div>

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
                    weight="bold" size="xl">Why choose us?
            </Text>
        </Stack>

        <SimpleGrid
                breakpoints={[
                { minWidth: 'xs', cols: 1 },
                { minWidth: 'sm', cols: 2 },
                { minWidth: 1200, cols: 3 }
            ]}>
            <!--{#each farm as farmObj}-->
                <Center>
                    <div style="width: 340px;
                    padding-bottom: 100px;
                    margin: auto">
                            <Card override={{
                            borderRadius: '$lg',
                        }}
                                  shadow="sm" padding="lg">
                                <Card.Section first padding="lg">
                                    <Group position="apart" override={{
                                        margin: '$lgPX'}}>
                                    </Group>
                                </Card.Section>
                                <Group position="apart" override={{
                                    justifyContent: 'center',
                                    marginBottom: '15px', marginTop: '$smPX' }}>
                                    <Text
                                            variant="gradient"
                                            gradient={{ from: 'teal', to: 'lime', deg: 45 }}
                                            size="xl" weight="bold">{farm.title}</Text>
                                </Group>
                                <Group override={{ lineHeight: 1.5 }}>
                                    <Stack>
                                        <Text override={{
                                            color: '$gray500',
                                            marginTop: '$lg',
                                            height: '85px',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                        }}>
                                            {farm.description.length > 128
                                                ? `${farm.description.slice(0, 128)}`
                                                : farm.description}...
                                        </Text>
                                    </Stack>
                                   </Group>
                            </Card>
                    </div>
                </Center>

            <!--{/each}-->
        </SimpleGrid>

        <Tabs>
            <Tabs.Tab label='Products'>Products Tab content</Tabs.Tab>
            <Tabs.Tab label='Jobs'>Jobs tab content</Tabs.Tab>
            <Tabs.Tab label='Equipment'>Equipment tab content</Tabs.Tab>
        </Tabs>
    </div>
</Container>
<style lang="scss">

  .farm-card {
    padding: 50px 50px 1500px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .farm-info {
    padding-bottom: 50px;
  }

</style>
