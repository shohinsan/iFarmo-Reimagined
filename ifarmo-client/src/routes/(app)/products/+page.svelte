<script>
    import {
        Container,
        Card,
        SimpleGrid,
        Center,
        Group,
        Badge,
        Text,
        Accordion,
        Image,
        Menu,
        Button,
        Box,
        Title, Anchor, Stack, Divider, ActionIcon, NumberInput, Chip, TextInput
    } from "@svelteuidev/core";
    import {ChatBubble, Gear, MagnifyingGlass} from "radix-icons-svelte";
    import {navigating, page} from "$app/stores";
    import Products from "$components/Products.svelte";

    export let data;
    const notLoggedIn = !data.user;
    const loggedIn = data.user;
    let products = $page.data.products;
    let searchAndFilter = products;

    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                console.log('calling')
                func.apply(this, args);
            }, delay);
        };
    }

    const search = e => {
        const query = e.target.value.toLowerCase();
        searchAndFilter = products.filter(product =>
            product.title.toLowerCase().includes(query)
        );
    };
    const debounceSearch = debounce(search, 1000)

    const filter = e => {
        const query = e.target.value.toLowerCase();
        searchAndFilter = products.filter(product =>
            product.type.toLowerCase().includes(query) ||
            product.city.toLowerCase().includes(query) ||
            product.price <= parseFloat(query)
        );
    }

    const debounceFilter = debounce(filter, 1000);

    let input;

    let selectedTypes = [];

    const types = [
        "Fruit", "Vegetable", "Grains", "Nuts",
        "Meat", "Dairy", "Baked goods", "Plants", "Other"
    ];
    let checked = Array(types.length).fill(false);
    function toggleChecked(index) {
        checked[index] = !checked[index];
        debounceTags();
        console.log(selectedTypes);
    }
    function updateSelectedTypes() {
        selectedTypes = checked
            .map((isChecked, index) => (isChecked ? types[index] : null))
            .filter(type => type !== null);
        searchAndFilter = products.filter(product =>
            selectedTypes.includes(product.type)
        );
        console.log(selectedTypes)
    }
    const debounceTags = debounce(updateSelectedTypes, 1000);

</script>

<div class="content">
    <Container fixed size="md" override={{ px: 'md' }}>
        <Box css={{
                backgroundColor: '$gray50',
                textAlign: 'end',
                padding: '$5',
                marginBottom: '$18',
                borderRadius: '$md',
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: '$gray100'
                    },
                }}>
            <div>
                <Menu placement="end"
                      delay={500}>
                    <Menu.Label>Sort by: Not implemented yet</Menu.Label>
                    <Menu.Item icon={Gear}>Relevance</Menu.Item>
                    <Menu.Item icon={ChatBubble}>Date</Menu.Item>
                </Menu>
            </div>
        </Box>

        <form data-sveltekit-keepfocus data-sveltekit-replacestate method="GET">
            <Container size={320}>
                <Card>

                    <TextInput icon={MagnifyingGlass}
                               on:input={debounceSearch} id="search-input" name="search" type="search"
                               placeholder='Search by title'
                               rightSectionWidth={70}
                               styles={{ rightSection: { pointerEvents: 'none' } }}>
                    </TextInput>
                    <Divider label="Max Price" labelPosition="center"/>
                    <Group position="center">
                        <ActionIcon variant='default' on:click={() => {input.decrement()}}>-</ActionIcon>
                        <NumberInput bind:this={input}
                                     on:input={debounceFilter} name="maxPrice" id="filter-type-input"
                                     hideControls defaultValue={null} max={100000} min={0} step={5}/>
                        <ActionIcon variant='default' on:click={() => input.increment()}>+</ActionIcon>
                    </Group>
                    <Divider label="Filter by Type" labelPosition="center"/>

                    <Group>
                        {#each types as type, index}
                            <Chip bind:checked={checked[index]}
                                  on:change={() => toggleChecked(index)}
                                  variant="filled">
                                {type}
                            </Chip>
                        {/each}
                    </Group>


                    <Divider label="Filter by City" labelPosition="center"/>
                    <TextInput
                            on:input={debounceFilter} id="filter-type-input" name="city" type="text"
                            placeholder='Filter by city'/>
                    <Button ripple fullSize variant='gradient' gradient={{from: 'teal', to: 'green', deg: 105}}
                            override={{
                    marginTop: 10,
                    marginBottom: 10,
                }}>Show Results
                    </Button>
                </Card>
                {#if $navigating}
                    <div aria-live="polite" style="display: inline-block">Loading...</div>
                {/if}
                <ul>
                    {#each searchAndFilter as product}
                        <li>{product.title}</li>
                    {:else}
                        <li>(none)</li>
                    {/each}
                </ul>
            </Container>
        </form>

        <SimpleGrid
                breakpoints={[
                { minWidth: 'xs', cols: 1 },
                { minWidth: 'sm', cols: 2 },
                { minWidth: 1200, cols: 3 }
            ]}
        >
            {#each searchAndFilter as product}
                <Center>
                    <div style="width: 340px; margin: auto">
                        <Card shadow="sm" padding="lg">
                            <Card.Section first padding="lg">
                                <Image
                                        src="src/{product.image}"
                                        height={160}
                                        alt={product.title}/>
                            </Card.Section>
                            <Group position="apart" override={{ marginBottom: '5px', marginTop: '$smPX' }}>
                                <Text weight={500}>{product.title}</Text>
                                <Badge color="pink" variant="light">On Sale</Badge>
                            </Group>
                            <Group override={{ lineHeight: 1.5 }}>
                                <Stack>
                                    <Text>Description: {product.description}</Text>
                                    <Text>Type: {product.type}</Text>
                                    <Text>Quantity: {product.quantity}</Text>
                                    <Text>Unit Type: {product.unitType}</Text>
                                    <Text>Price {product.price}</Text>
                                    <Text>City: {product.city}</Text>
                                    <Text>Created By: {product.username}</Text>
                                    <Text>Date Posted: {new Date(product.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</Text>
                                    <Text>Dev mode 1: {product.cropYear}</Text>
                                    <Text>Dev mode 2:  {product.sulfurized ? 'Sulfurized' : 'Unsulfurized'}</Text>
                                </Stack>
                            </Group>
                            <Button fullSize href="/products/{product.productId}" ripple variant='gradient'
                                    gradient={{from: 'teal', to: 'green', deg: 105,}}
                                    override={{ marginTop: '$smPX'}}>
                                Read more
                            </Button>
                        </Card>
                    </div>
                </Center>
            {/each}
        </SimpleGrid>

        <Box css={{
            backgroundColor: '$gray50',
            textAlign: 'center',
            padding: '$15',
            marginTop: '$10',
            marginBottom: '$10',
            borderRadius: '$md',
            cursor: 'pointer', '&:hover': {
                backgroundColor: '$gray100'
            }}}>
            <Text size="xl"
                  component='span'
                  align='center'
                  weight='bold'
                  variant='gradient'
                  gradient={{ from: 'blue', to: 'green', deg: 45 }}>
                Boost your productivity. Start using our website today
            </Text>

            <Container padding="md" align="center"
                       style="display: flex; flex-direction: column; justify-content: flex-end; align-items: center;">
                <Title
                        override={{
                            marginTop: '$10',
                            marginBottom: '$10',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            cursor: 'pointer',
                        }}
                        order={3}>Whether you're a
                    <Text color="blue" inherit component="span">
                        farmer
                    </Text>
                    looking to list products, hire help, or lend equipment,
                    or a
                    <Text color="blue" inherit component="span">
                        client
                    </Text>
                    looking to buy products, find a job, or rent equipment, we've got you covered.
                </Title>
                <Anchor underline={false} href="/register" style="margin-top: auto;">
                    <Button ripple variant='gradient' gradient={{from: 'teal', to: 'green', deg: 105}}>
                        Get Started
                    </Button>
                </Anchor>
            </Container>
        </Box>

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


    <!--{#if opened}-->
    <!--    {#await import('./Modal.svelte') then module}-->
    <!--        <svelte:component this={module.default}/>-->
    <!--    {/await}-->
    <!--{/if}-->

    <Products centered overlayOpacity={0.55} overlayBlur={3}/>


</div>


<style lang="scss">
  .content {
    padding-top: 200px;
  }
</style>