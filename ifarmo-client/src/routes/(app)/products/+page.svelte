<script lang="ts">
    import {
        Container,
        Card,
        SimpleGrid,
        Center,
        Group,
        Badge,
        Text,
        Image,
        Menu,
        Button,
        Box,
        Title,
        Anchor,
        Stack,
        Divider,
        ActionIcon,
        NumberInput,
        Chip,
        TextInput,
    } from "@svelteuidev/core";
    import {ChatBubble, Gear, MagnifyingGlass} from "radix-icons-svelte";
    import {page} from "$app/stores";
    import Products from "$components/Products.svelte";
    import type {Product} from "$customTypes";

    interface UserData {
        user: string;
    }

    interface CredentialData {
        role?: string;
    }


    export let data: { user: UserData; credentials: CredentialData; products: Product[] };

    const loggedIn: UserData = data.user;
    const rolePrivileges: string | null = $page.data.credentials.role ?? null;
    let products: Product[] = $page.data.products;

    let searchAndFilter: Product[] = products.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
        let timeoutId: NodeJS.Timeout;
        return ((...args: Parameters<T>) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                console.log('calling');
                func.apply(null, args);
            }, delay);
        }) as T;
    }

    const search = (e: Event) => {
        const query = (e.target as HTMLInputElement).value.toLowerCase();
        searchAndFilter = products.filter((product) =>
            product.title.toLowerCase().includes(query)
        );
    };
    const debounceSearch = debounce(search, 1000);

    const filter = (e: Event) => {
        const query = (e.target as HTMLInputElement).value.toLowerCase();
        searchAndFilter = products.filter((product) =>
            product.type.toLowerCase().includes(query) ||
            product.city.toLowerCase().includes(query) ||
            product.price <= parseFloat(query)
        );
    };

    const debounceFilter = debounce(filter, 1000);

    let input: NumberInputProps;
    let selectedTypes: string[] = [];

    const types: string[] = [
        "Fruit", "Vegetable", "Grains", "Nuts",
        "Meat", "Dairy", "Baked goods", "Plants", "Other"
    ];
    let checked: boolean[] = Array(types.length).fill(false);

    function toggleChecked(index: number) {
        checked[index] = !checked[index];
        debounceTags();
        console.log(selectedTypes);
    }

    function updateSelectedTypes() {
        selectedTypes = checked
            .map((isChecked, index) => (isChecked ? types[index] : null))
            .filter((type) => type !== null) as string[];
        searchAndFilter = products.filter((product) =>
            selectedTypes.includes(product.type)
        );
        console.log(selectedTypes);
    }

    const debounceTags = debounce(updateSelectedTypes, 1000);


    interface NumberInputProps {
        increment(): void;

        decrement(): void;

        bind: { value: number };
        on: {
            input: (event: Event) => void;
        };
        name?: string;
        id?: string;
        hideControls?: boolean;
        defaultValue?: number | null;
        max?: number;
        min?: number;
        step?: number;
    }

</script>

<div class="content">
    <Group>
        <div class="container">
            <form data-sveltekit-keepfocus data-sveltekit-replacestate method="GET">
                <Container
                        override={{
                        flexDirection: 'column',
                    }}
                        size="90%">
                    <div style="width: 315px; margin: auto">
                        <Card>
                            <TextInput icon={MagnifyingGlass}
                                       on:input={debounceSearch} id="search-input" name="search" type="search"
                                       placeholder='Search by title'
                                       rightSectionWidth={70}
                                       styles={{ rightSection: { pointerEvents: 'none' } }}>
                            </TextInput>
                            <Divider labelPosition="center"/>
                            <div style="overflow: auto; max-height: 70vh;">
                                <Group position="center">
                                    <ActionIcon variant='default' on:click={() => {input.decrement()}}>-</ActionIcon>
                                    <NumberInput bind:this={input}
                                                 on:input={debounceFilter} name="maxPrice" id="filter-type-input"
                                                 hideControls defaultValue={null} max={100000} min={0} step={5}/>
                                    <ActionIcon variant='default' on:click={() => input.increment()}>+</ActionIcon>
                                </Group>
                                <Divider labelPosition="center"/>
                                <Group>
                                    {#each types as type, index}
                                        <Chip bind:checked={checked[index]}
                                              on:change={() => toggleChecked(index)}
                                              variant="filled">
                                            {type}
                                        </Chip>
                                    {/each}
                                </Group>
                                <Divider labelPosition="center"/>
                                <TextInput
                                        on:input={debounceFilter} id="filter-type-input" name="city" type="text"
                                        placeholder='Filter by city'/>
                                <Button ripple fullSize variant='gradient'
                                        gradient={{from: 'teal', to: 'green', deg: 105}}
                                        override={{
                        marginTop: 10,
                        marginBottom: 10,
                    }}>Show Results
                                </Button>
                            </div>
                        </Card>
                    </div>
                </Container>
            </form>
        </div>
        <div class="container">


        </div>


    </Group>




    <div class="container">
        <Container fixed size="md" override={{
        px: 'md' }}>

            <Menu override={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '$lgPX',
        }}
                  delay={500} placement="end">
                <Button variant="outline" radius="xl"
                        slot="control">Sort by:
                </Button>
                <Menu.Label>Sort by: Not implemented yet / UI Only</Menu.Label>
                <Menu.Item icon={Gear}>Recent first (default)</Menu.Item>
                <Menu.Item icon={ChatBubble}>Closest first</Menu.Item>
                <Menu.Item icon={ChatBubble}>Price: Low to High</Menu.Item>
                <Menu.Item icon={ChatBubble}>Price: High to Low</Menu.Item>
            </Menu>

            <SimpleGrid
                    breakpoints={[
                { minWidth: 'xs', cols: 1 },
                { minWidth: 'sm', cols: 2 },
                { minWidth: 1200, cols: 3 }
            ]}
            >
                {#each searchAndFilter as product}
                    <Center>
                        <div style="width: 340px;
                    padding-bottom: 100px;
                    margin: auto">
                            <Anchor underline={false} href="/products/{product.productId}">
                                <Card override={{
                            borderRadius: '$lg',
                        }}
                                      shadow="sm" padding="lg">
                                    <Card.Section first padding="lg">
                                        <Group position="apart" override={{
                                        margin: '$lgPX'}}>
                                            <Text>{product.type} by {product.username}</Text>
                                        </Group>
                                        <Image
                                                override={{
                                        margin: '$lgPX',
                                        }}
                                                src="src/{product.image}"
                                                height="150px"
                                                alt={product.title}/>
                                    </Card.Section>
                                    <Group position="apart">
                                        <Text override={{
                                        marginTop: '15px',
                                        marginBottom: '15px',
                                      }}
                                              variant='gradient'
                                              weight="bold"
                                              gradient={{ from: 'red', to: 'pink', deg: 45 }}
                                        >{product.price} / {product.unitType} </Text>
                                        <Text>{product.quantity}</Text>
                                    </Group>

                                    <Group position="apart" override={{ marginBottom: '15px', marginTop: '$smPX' }}>
                                        <Text
                                                variant="gradient"
                                                gradient={{ from: 'teal', to: 'lime', deg: 45 }}
                                                size="xl" weight="bold">{product.title}</Text>
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
                                                {product.description.length > 96
                                                    ? `${product.description.slice(0, 96)}`
                                                    : product.description}...
                                            </Text>
                                        </Stack>
                                        <Group>
                                            <Group position="apart">
                                                <Badge variant="light" size="lg" radius="sm">
                                                    City
                                                </Badge>
                                                <Text>{product.city}</Text>
                                            </Group>

                                            <Group position="apart">
                                                <Badge variant="light" size="lg" radius="sm">
                                                    Posted
                                                </Badge>
                                                <Text>{new Date(product.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}</Text>
                                            </Group>

                                            <Group position="apart">
                                                <Badge variant="light" size="lg" radius="sm">
                                                    cropYear
                                                </Badge>
                                                <Text>{new Date(product.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                })}</Text>
                                            </Group>
                                        </Group>
                                    </Group>
                                </Card>
                            </Anchor>

                        </div>
                    </Center>
                {/each}
            </SimpleGrid>

            {#if !loggedIn}
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
            {/if}
        </Container>
        {#if rolePrivileges === 'farmer'}
            <Products centered overlayOpacity={0.55} overlayBlur={3}/>
        {/if}
    </div>

</div>

<style lang="scss">
  .content {
    padding-top: 50px;
    padding-left: 15px;
  }

  .container {
    flex: 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

</style>
