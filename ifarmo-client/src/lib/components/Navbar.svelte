<script lang="ts">
    import {
        colorScheme,
        ActionIcon,
        Burger,
        Tooltip,
        ShellSection, Button, Group, Menu, Divider, Anchor
    } from '@svelteuidev/core';
    import {Sun, Moon, Gear, Bell, Person, Width, SewingPin} from 'radix-icons-svelte';
    import {hotkey, useOs} from '@svelteuidev/composables';
    import {page} from "$app/stores";
    import {enhance} from "$app/forms";

    import type {PageData} from './$types';
    import location from "$helpers/location";

    export let data: PageData;
    $: user = data.user;

    let credentials: any;
    $: {
        credentials = $page.data.credentials;
    }

    // console.log($page.data.credentials.username);

    const os = useOs();
    const mod = os === 'macos' ? '⌘' : 'ctrl';
    let opened = false;

    function toggleOpen() {
        opened = !opened;
    }

    function toggle() {
        colorScheme.set($colorScheme === 'dark' ? 'light' : 'dark');
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

</script>

<nav>
    <div class="location">
        <ShellSection grow>
            <Anchor underline={false} href="/map">
                {#if $location}
                    <Button>
                        <SewingPin slot="leftIcon"/>
                        <span class="link-text">{$location.city}</span>
                    </Button>
                {/if}
            </Anchor>
        </ShellSection>
        <Group>
            <Menu>
                <Button slot="control">
                    <Bell size={16} />
                </Button>
                <Menu.Label>Notifications</Menu.Label>
                <Menu.Item override={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'normal',
                    wordBreak: 'break-all',
                    maxWidth: '200px',
                    minHeight: '5em',
                    }}>
                    Settingsasdfioadsjfopadsjfopi[adsjfadsjfop]adsjfop[ads
                </Menu.Item>
            </Menu>

            <Tooltip label={`${mod} + J`}>
                <ActionIcon variant="default" on:click={toggle} size={35} use={[[hotkey, [['mod+J', toggle]]]]}>
                    {#if $colorScheme === "dark"}
                        <Moon/>
                    {:else}
                        <Sun/>
                    {/if}
                </ActionIcon>
            </Tooltip>
        </Group>
    </div>
    <div class="main-level">

        <Group>
            <Burger {opened} on:click={toggleOpen} override={{ d: 'block', '@sm': { d: 'none'  } }}/>
            <a href="/" class="title">iFarmo</a>
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
            <Group>
                {credentials.username}
                <Menu placement="end" delay={500}>
                    <Menu.Label>Menu</Menu.Label>
                    <Menu.Item
                            root="a" href="/{$page.data.credentials.username}"
                            icon={Person}>
                        Profile
                    </Menu.Item>
                    <Menu.Item
                            root="a" href="/chat"
                            icon={Person}>
                        Chat
                    </Menu.Item>
                    <Menu.Item
                            root="a" href="/settings"
                            icon={Gear}>
                        Settings
                    </Menu.Item>
                    <Divider/>
                    <form method="POST" action="/?/logout" use:enhance>
                        <Menu.Item type="submit" color="red" icon={Width}>
                            Logout
                        </Menu.Item>
                    </form>
                </Menu>
            </Group>
        {:else}
            <Anchor underline={false} href="/login">
                <Button variant='gradient' gradient={{from: 'teal', to: 'green', deg: 105}}>
                    Login
                </Button>
            </Anchor>
        {/if}
    </div>
    {#if opened}
        <div class="mobile-menu">
            <ul>
                {#each navItems as item}
                    <li>
                        <a href={item.href} class:active={item.href === $page.url.pathname}>
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





  .location {
    display: flex;
    justify-content: end;
    padding: 10px;
    background-color: limegreen;
    align-items: center;
    text-align: center;
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
    .title {
      font-size: 1.5rem;
      font-weight: bold;
      color: #333;
      text-decoration: none;

      &:hover {
        color: limegreen;
      }

      @include breakpoint.up('md') {
        margin-left: 2rem;
      }
      @include breakpoint.up('lg') {
        margin-left: 3rem;
      }
      @include breakpoint.up('xl') {
        margin-left: 4rem;
      }
    }

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

    // ----
    .nav-links-mobile {
      margin-right: 1rem;
      @include breakpoint.up('md') {
        display: none;
      }
      .menu-button {
        padding: 0.5rem 1rem;
        cursor: pointer;
        transition: 0.15s;
        outline: none;
        color: var(--text-color);
        background-color: transparent;
        border: none;
        border-radius: 5px;
        &:hover,
        &:focus {
          background-color: rgba(255, 255, 255, 0.1);
        }
        &:active {
          background-color: rgba(255, 255, 255, 0.2);
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
    ul {
      margin: 0;
      padding: 0;
      font-size: 30px;
      list-style: none;
      width: 100%;
      max-width: 100%;
      border-radius: 5px;
      background-color: var(--bg-color);
      li {
        width: 100%;
        transition: 0.1s;
        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
        a {
          display: inline-block;
          padding: 0.5rem 1rem;
          height: 100%;
          width: 100%;
          color: var(--text-color);
          text-decoration: none;
          transition: 0.2s;
          &.active {
            color: var(--text-color);
            text-shadow: 0 0 20px var(--text-color);
          }
        }
      }
    }

    .auth-section {
      display: flex;
      gap: 1rem;
      a {
        color: #555;
        text-decoration: none;
        transition: color 0.3s ease;
        &:hover {
          color: limegreen;
        }
      }
    }

  }


</style>