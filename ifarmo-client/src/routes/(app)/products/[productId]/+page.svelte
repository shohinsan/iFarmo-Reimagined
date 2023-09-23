<script lang="ts">

    import {page} from "$app/stores";
    import productLogo from "$assets/product.svg";
    import InputField from "$components/InputField.svelte";
    import {enhance} from "$app/forms";
    import {Button, Card, Container, Image} from "@svelteuidev/core";
    import Delete from "$components/Delete.svelte";

    let showModal = false;

    export let data;
    let fetched;
    let productId;

    $: {
        fetched = $page.data.products;
        productId = parseInt($page.params.productId);
    }

    let product;
    $: {
        product = fetched.find(product => product.productId === productId);
    }

    const defaultImage = productLogo;

    let userDataEditMode = false;

    function editUserData() {
        userDataEditMode = true;
    }

    function cancelEdit() {
        userDataEditMode = false;
    }

    $: data = data.user

    const role = data.credentials.role;

</script>

<svelte:head>
    <title>{product ? `iFarmo Products List | ${product.title}` : "Product Page"}</title>
    <meta name="description" content={product ? product.description : "Product descriptions"}/>
</svelte:head>

<div class="content">
    <Container fixed size="md" override={{ px: 'md' }}>
        <Card shadow="sm" padding="xl">
            {#if !userDataEditMode}
                <div class="product-container">
                    <!--                <Image-->
                    <!--                        src="src/{product.image}"-->
                    <!--                        height={160}-->
                    <!--                        alt={product.title}/>    -->
                    <Image
                            src="{defaultImage}"
                            height={160}
                            alt={product.title}/>
                    <!--                    <img class="image-container" src={defaultImage} alt={product.title}/>-->
                    <h3 class="title">{product.title}</h3>
                    <p class="description">{product.description}</p>
                    <div class="details">
                        <p>Type: {product.type}</p>
                        <p>Quantity: {product.quantity}</p>
                        <p>Unit Type: {product.unitType}</p>
                        <p>Price: ${product.price}</p>
                        <p>City: {product.city}</p>
                        <p>Posted by: {product.username}</p>
                        <p>Posted on: {new Date(product.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}</p>
                    </div>
                </div>
                {#if data.userId === product.userId}
                    <Button
                            element="button"
                            variant="outline"
                            color="red"
                            on:click={editUserData}>
                        Edit product information
                    </Button>
                {/if}
            {:else}
                <form action="?/update" method="POST"
                      use:enhance={() => ({ update }) => {
                  update({ reset: false });
                  userDataEditMode = false
                      }}>
                    <InputField bind:value={product.title} label="Title" placeholder="Your product title" name="title"/>
                    <InputField bind:value={product.type} label="Type" placeholder="Your product type" name="type"/>
                    <InputField bind:value={product.description} label="Description"
                                placeholder="Your product description"
                                name="description"/>
                    <InputField bind:value={product.quantity} label="Quantity" placeholder="Your product quantity"
                                name="quantity"/>
                    <InputField bind:value={product.unitType} label="Unit Type" placeholder="Your product unit type"
                                name="unitType"/>
                    <InputField bind:value={product.price} label="Price" placeholder="Your product price" name="price"/>
                    <InputField bind:value={product.city} label="City" placeholder="Your product city" name="city"/>

                    <Button element="button" on:click={cancelEdit} variant="outline" color="red">
                        Cancel
                    </Button>
                    <Button element="button" variant="outline" color="red">
                        Update your product
                    </Button>
                </form>
            {/if}
            <!----------------------------------------------->
            {#if data.userId === product.userId}
                <Delete centered overlayOpacity={0.55} overlayBlur={3}/>
            {/if}
            <!-------------------------------------------->

            {#if role === "user" && data.userId !== product.userId}
                <!--={handleRegisterPush}-->
                <form action="?/send_notification" method="POST" use:enhance>
                    <Button type="submit">
                        Interested
                    </Button>
                </form>
            {/if}
        </Card>


    </Container>

</div>
<style>

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .delete-button-field {
        margin-top: 100px;
        margin-bottom: 20px;
    }


    .product-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 50px auto;
    }

    .image-container {
        max-width: 100%;
        height: auto;
    }

    .title,
    .description {
        text-align: center;
    }

    .details {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-top: 20px;
    }
</style>
