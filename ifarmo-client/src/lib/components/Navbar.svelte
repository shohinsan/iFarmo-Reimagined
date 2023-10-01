<script lang="ts">
    import {
        ActionIcon,
        Burger, Button, Group, Menu, Divider, Anchor, Input, NativeSelect
    } from '@svelteuidev/core';
    import {
        Gear,
        Bell,
        Person,
        Width,
        SewingPin,

        MagnifyingGlass,
    } from 'radix-icons-svelte';
    import {page} from "$app/stores";
    import {enhance} from "$app/forms";
    import location from "$helpers/location";

    export let data: any;
    $: user = data.user;

    let credentials: any;
    $: {
        credentials = $page.data.credentials;
    }


    let opened = false;

    function toggleOpen() {
        opened = !opened;
    }


    interface NavItem {
        name: string;
        href: string;
    }

    const navItems: NavItem[] = [
        {
            name: 'Home',
            href: '/',
        },
        {
            name: 'Products',
            href: '/products',
        },
        {
            name: 'Jobs',
            href: '/jobs',
        },
        {
            name: 'Equipment',
            href: '/equipment',
        },
        {
            name: 'Farms',
            href: '/farms',
        }
    ];

    interface DropdownItem {
        name: string;
        href: string;
    }

    const dropdownItems: DropdownItem[] = [
        {
            name: 'Profile',
            href: `/${$page.data.credentials.username}`,
        },
        {
            name: 'Settings',
            href: '/settings',
        },
    ];

    let notificationsOpened = true;


    let selectedValue = 'products';

    function logSelectedValue(event:any) {
        selectedValue = event.target.value;
    }


</script>

<nav>
    <div class="upper-nav">
        <div class="nav-group">
            <div class="logo-search">
                <a href="/" class="title">iFarmo</a>

                {#if
                    !($page.url.pathname === '/settings') &&
                    !($page.url.pathname === '/chat') &&
                    !($page.url.pathname === '/settings/password')
                }
                    <Group override={{
                               borderRadius: '5rem',
                               border: '1px solid #ccc',
                               padding: '0 2rem',
                               backgroundColor: '#fff',
                        }}>
                        <div class="input-container">
                            <Input
                                    variant='unstyled'
                                    placeholder='Search'
                            />

                            <NativeSelect bind:value={selectedValue} on:change={logSelectedValue}
                                          rightSectionWidth={0}
                                          variant='unstyled'
                                          data={[
                                        { label: 'For sale', value: 'products' },
                                        { label: 'Jobs', value: 'jobs' },
                                        { label: 'Equipment', value: 'equipment' },
                                        { label: 'Farms', value: 'farms' },
                                        ]}


                            />

                            <Anchor href={`/${selectedValue}`}>
                                <ActionIcon>
                                    <MagnifyingGlass size={16}/>
                                </ActionIcon>
                            </Anchor>

                        </div>
                    </Group>
                {/if}


            </div>
            <div class="location">
                <Anchor underline={false} href="/map">
                    {#if $location}
                        <Button>
                            <SewingPin slot="leftIcon"/>
                            <span class="link-text">{$location.city}</span>
                        </Button>
                    {/if}
                </Anchor>
            </div>
        </div>
    </div>


    <div class="main-level">
        <Group>
            <Burger {opened} on:click={toggleOpen} override={{ d: 'block', '@sm': { d: 'none'  } }}/>
        </Group>
        <ul class="nav-links">
            {#each navItems as item}
                <li>
                    <a href={item.href} class:active={item.href === $page.url.pathname}>
                        {item.name}
                    </a>
                </li>
            {/each}
        </ul>


        {#if user}
            <div class="user-menu">
                <Menu>
                    <Button radius="xl" color="primary" variant="circle" slot="control">{credentials.username}</Button>
                    <Menu.Label>Menu</Menu.Label>
                    <Menu.Item root="a" href="/{$page.data.credentials.username}" icon={Person}>
                        Profile
                    </Menu.Item>
                    <Menu.Item root="a" href="/chat" icon={Person}>
                        Chat
                    </Menu.Item>
                    <Menu.Item root="a" href="/settings" icon={Gear}>
                        Settings
                    </Menu.Item>
                    <Divider/>
                    <form method="POST" action="/?/logout" use:enhance>
                        <Menu.Item type="submit" color="red" icon={Width}>
                            Logout
                        </Menu.Item>
                    </form>
                </Menu>
            </div>
        {:else}
            <div class="login-button">
                <Anchor underline={false} href="/login">
                    <Button variant='gradient' gradient={{ from: 'teal', to: 'green', deg: 105 }}>
                        Login
                    </Button>
                </Anchor>
            </div>
        {/if}
    </div>
    {#if opened}
        <div class="mobile-menu">
            <ul>
                {#each navItems as item}
                    <li>
                        <a href={item.href} class:active={item.href === $page.url.pathname} on:click={toggleOpen}>
                            {item.name}
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</nav>

<style lang="scss">
  nav {
    z-index: 10;
    position: sticky;
    top: 0;
    background-color: white;
    width: 100%;
    font-family: 'MS100', sans-serif;
  }

  .upper-nav {
    background-color: limegreen;
    padding: 10px;

  }

  .nav-group {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 576px) {
      flex-direction: column;
      align-items: flex-start;
    }

  }

  .logo-search {
    display: flex;
    width: 70%;

    @media screen and (max-width: 576px) {
      width: 100%;
      margin-bottom: 10px;
    }
  }

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    text-decoration: none;
    margin-right: 20px;
  }


  .location {
    margin-right: 10px;

    @media screen and (max-width: 576px) {
      order: 2;
      margin-top: 10px;
    }
  }

  .input-container {
    display: flex;
    align-items: center; /* Vertically center the items within the container */
    border-radius: 8px 0 0 8px;
    overflow: hidden;
  }


  // -------------------------------------
  .main-level {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
    padding: 0 1rem;
    background-color: var(--bg-color);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);


    // ----
    .nav-links {
      display: none;
      gap: 2rem;
      margin-right: 1rem;
      @include breakpoint.up('md') {
        margin-right: 2rem;
        display: flex;
      }
      @include breakpoint.up('lg') {
        margin-right: 3rem;
      }
      @include breakpoint.up('xl') {
        margin-right: 4rem;
      }

      li {
        list-style: none;

        a {
          color: var(--text-color);
          text-decoration: none;
          transition: 0.2s;
          padding: 12px;

          &:hover {
            color: var(--text-color);
          }

          &.active {
            font-family: 'MS500', sans-serif;
            color: var(--text-color);
            text-shadow: 0 0 20px var(--text-color);
          }
        }
      }
    }

  }

  // -------------------------------------

  .mobile-menu {
    position: absolute;
    top: 7.4rem;
    left: 0;
    width: 100%;
    display: block;
    background-color: rgba(255, 255, 255, 0.98);
    border-bottom: 0.1px solid grey;

    @include breakpoint.up('md') {
      display: none;
    }

    @media screen and (max-width: 576px) {
        top: 11rem;
    }

    ul {
      margin: 0;
      padding: 0;
      font-size: 30px;
      list-style: none;
      width: 100%;
      max-width: 100%;
      border-radius: 5px;
      background-color: var(--bg-color);
    }

    li {
      transition: 0.1s;
      margin: 0;
    }

    li:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    a {
      display: block;
      padding: 0.5rem 1.5rem;
      color: var(--text-color);
      text-decoration: none;
      transition: 0.2s;
    }

    a.active {
      color: var(--text-color);
      text-shadow: 0 0 20px var(--text-color);
    }

  }


</style>