<script>
    import { Anchor, Box, Container, Image, SimpleGrid, Stack, Text } from "@svelteuidev/core";
    import { page } from "$app/stores";

    let farm = $page.data.farm;


</script>

<div class="content">
    This is all the farms page
</div>

<Container override={{ bc: 'AliceBlue', padding: '50px' }}>
    <Stack override={{ paddingTop: '50px' }}>
        <Text weight="600" size="xl">Farms</Text>
    </Stack>
    <SimpleGrid
            override={{ paddingTop: '50px' }}
            breakpoints={[
            { minWidth: 'xs', cols: 1 },
            { minWidth: 'sm', cols: 2 },
            { minWidth: 1200, cols: 3 }
        ]}>
        {#each farm as farmObj}
            <div style="width: 280px; margin: auto">
                <Anchor underline={false} href="/farms/{farmObj.ownerId}">
                    <Box css={{
                        backgroundColor: '$gray50',
                        textAlign: 'center',
                        padding: '$10',
                        borderRadius: '$md',
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: '$gray100',
                        },
                        '&:active': {
                            backgroundColor: '$gray200',
                        },
                    }}>
                        <Image src="###" height="50" alt="###"/>
                        <Stack>
                            <Text>{farmObj.title}</Text>
                            <Text>{farmObj.location}</Text>
                            <Text>{farmObj.workingHours}</Text>
                            <Text>{farmObj.description}</Text>
                        </Stack>
                    </Box>
                </Anchor>
            </div>
        {/each}
    </SimpleGrid>
</Container>

<style lang="scss">
  .content {
    padding-top: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>