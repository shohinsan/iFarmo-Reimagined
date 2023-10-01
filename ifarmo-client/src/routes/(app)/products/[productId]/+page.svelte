<script lang="ts">

    import {page} from "$app/stores";
    import productLogo from "$assets/product.svg";
    import {enhance} from "$app/forms";
    import {ActionIcon, Badge, Button, Card, Container, Group, Image, Tabs, Text, TextInput} from "@svelteuidev/core";
    import Delete from "$components/Delete.svelte";
    import {PlusCircled} from "radix-icons-svelte";


    let showModal = false;

    export let data;

    const defaultImage = productLogo;

    let userDataEditMode = false;

    function editUserData() {
        userDataEditMode = true;
    }

    function cancelEdit() {
        userDataEditMode = false;
    }

    const role = data.credentials.role;

    let fetched = $page.data.single_product;

</script>

<svelte:head>
    <title>{fetched ? `iFarmo Products List | ${fetched.title}` : "Product Page"}</title>
    <meta name="description" content={fetched ? fetched.description : "Product descriptions"}/>
</svelte:head>


<Container>
    <div class="content">
        {#if !userDataEditMode}
            {#if fetched}
                <div class="top-product-container">
                    <Group position="apart">
                        <Image src="{defaultImage}"
                               height={400}
                               alt={fetched.title}/>
                        <ActionIcon override={{
                                    justifyContent: "end",
                                    alignItems: "end",
                                    marginTop: "372px"}}>
                            <PlusCircled size={32}/>
                        </ActionIcon>
                    </Group>
                </div>
                <div class="title">
                    <Group position="apart">
                        <Text component='span'
                              size="xxl"
                              variant='gradient'
                              gradient={{ from: 'teal', to: 'green', deg: 45 }}
                              weight='bold'>
                            {fetched.title}
                        </Text>
                        <Text component='span'
                              size="xxl"
                              variant='gradient'
                              gradient={{ from: 'red', to: 'orange', deg: 45 }}
                              weight='bold'>
                            {fetched.price}
                        </Text>
                    </Group>
                </div>

                <Tabs color='teal'>
                    <Tabs.Tab label='Description'>
                        <Text override={{
                            margin: "20px",
                        }}>
                            {fetched.description}
                        </Text>
                    </Tabs.Tab>
                    <Tabs.Tab label='Info'>
                        <Group override={{
                            margin: "20px",
                        }}>
                            <Badge>
                                Type
                            </Badge>
                            <Text>{fetched.type}</Text>
                        </Group>
                        <Group override={{
                            margin: "20px",
                        }}>
                            <Badge>
                                Unit Type
                            </Badge>
                            <Text>{fetched.unitType}</Text>
                        </Group>
                        <Group override={{
                            margin: "20px",
                        }}>
                            <Badge>
                                City
                            </Badge>
                            <Text>{fetched.city}</Text>
                        </Group>
                        <Group override={{
                            margin: "20px",
                        }}>
                            <Badge>
                                Owner
                            </Badge>
                            <Text>{fetched.username}</Text>
                        </Group>
                        <Group override={{
                            margin: "20px",
                        }}>
                            <Badge>
                                Date posted
                            </Badge>
                            <Text>
                                {new Date(fetched.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </Text>
                        </Group>
                        <Group override={{
                            margin: "20px",
                        }}>
                            <Badge>
                                Quantity
                            </Badge>
                            <Text>{fetched.quantity}</Text>
                        </Group>
                    </Tabs.Tab>
                    <Tabs.Tab label='Shipping' >
                        <Text override={{
                            margin: "20px",
                        }}>
                            Contact me to discuss shipping for additional cost
                        </Text>
                    </Tabs.Tab>
                </Tabs>
            {/if}
            {#if data.user !== null && data.user.userId === fetched.userId}
                <Group override={{
                            margin: "20px",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                    <Button override={{
                                width: "49%",
                            }}
                            element="button"
                            variant="outline"
                            color="red"
                            on:click={editUserData}>
                        Edit product information
                    </Button>
                    <Delete centered overlayOpacity={0.55} overlayBlur={3}/>
                </Group>
            {/if}
        {:else}
            <form action="?/update" method="POST"
                  use:enhance={() => ({ update }) => {
                  update({ reset: false });
                  userDataEditMode = false
                      }}>
                <TextInput bind:value={fetched.title} label="Title" placeholder="Your product title" name="title"/>
                <TextInput bind:value={fetched.type} label="Type" placeholder="Your product type" name="type"/>
                <TextInput bind:value={fetched.description} label="Description"
                            placeholder="Your product description"
                            name="description"/>
                <TextInput bind:value={fetched.quantity} label="Quantity" placeholder="Your product quantity"
                            name="quantity"/>
                <TextInput bind:value={fetched.unitType} label="Unit Type" placeholder="Your product unit type"
                            name="unitType"/>
                <TextInput bind:value={fetched.price} label="Price" placeholder="Your product price" name="price"/>
                <TextInput bind:value={fetched.city} label="City" placeholder="Your product city" name="city"/>

                <Button element="button" on:click={cancelEdit} variant="outline" color="red">
                    Cancel
                </Button>
                <Button element="button" variant="outline" color="red">
                    Update your product
                </Button>
            </form>
        {/if}
        <!-------------------------------------------->

        {#if role === "user" && data.user !== null && data.user.userId !== fetched.userId}
            <!--={handleRegisterPush}-->
            <form action="?/send_notification" method="POST" use:enhance>
                <Button type="submit">
                    Interested
                </Button>
            </form>
        {/if}
    </div>
</Container>


<style lang="scss">

  .content {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    height: 2000px;
  }


  .top-product-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px auto;

    @include breakpoint.down('md') {

    }
  }

  .title {
    font-size: 50px;
    margin: 50px;
  }

</style>
