<script type="module" lang="ts">
	import { page } from '$app/stores';
	import { sineIn } from 'svelte/easing';
	import {
		Navbar,
		NavHamburger,
		NavBrand,
		Avatar,
		Dropdown,
		DropdownItem,
		NavUl,
		NavLi,
		Chevron,
		Drawer,
		CloseButton,
		Sidebar,
		SidebarWrapper,
		SidebarGroup,
		SidebarBrand,
		SidebarItem
	} from 'flowbite-svelte';
	import yourlogo from '$lib/images/your-logo.png';
	import Key from 'svelte-heros-v2/Key.svelte';
	import User from 'svelte-heros-v2/User.svelte';
	import './style.scss';
	import { onMount } from 'svelte';
	export let user, menus, error;
	let drawerHidden: boolean = false;
	let hoverDropdown: boolean = false;
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};
	let backdrop: boolean = false;
	let site = {
		name: '',
		href: '/',
		img: yourlogo
	};
	let breakPoint: number = 1024;
	let width: number;
	let activateClickOutside = true;

	$: if (width >= breakPoint) {
		drawerHidden = false;
		activateClickOutside = false;
	} else {
		drawerHidden = true;
		activateClickOutside = true;
	}

	const handleClickOutside = (event: any) => {
		hoverDropdown = false;
	};

	const toggleSide = () => {
		if (width < breakPoint) {
			drawerHidden = !drawerHidden;
		}
	};
	const toggleDrawer = () => {
		drawerHidden = false;
	};

	onMount(() => {
		if (width >= breakPoint) {
			drawerHidden = false;
			activateClickOutside = false;
		} else {
			drawerHidden = true;
			activateClickOutside = true;
		}
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<svelte:window bind:innerWidth={width} />

<Navbar let:hidden let:toggle color="primary" navDivClass="mr-auto flex flex-wrap items-center">
	<NavHamburger on:click={toggleDrawer} />
	<NavBrand href="/" class="lg:ml-64" />

	<div class="flex ml-auto items-center md:order-2">
		<!-- <Button pill color="light" id="avatar-menu" class="!p-1">
				<Avatar src={logo} class="mr-2" />
				Welcome, User
			</Button>
			<NavHamburger on:click={toggle} class="w-full md:flex md:w-auto md:order-1" /> -->
		<Avatar class="acs" />
		<Dropdown triggeredBy=".acs">
			<div slot="header" class="px-4 py-2">
				<span class="block text-sm text-gray-900 dark:text-white">{user.UserName}</span>
				<span class="block truncate text-sm font-medium">{user.EmailAddress}</span>
			</div>
			<DropdownItem>Profile</DropdownItem>
			<DropdownItem slot="footer">Log out</DropdownItem>
		</Dropdown>
	</div>

	<!-- <Dropdown placement="bottom" triggeredBy="#avatar-menu">
			<DropdownHeader>
				<span class="block text-sm" />
				<span class="block truncate text-sm font-medium" />
			</DropdownHeader>
		</Dropdown> -->

	<NavUl {hidden} divClass="w-full md:flex md:w-auto">
		{#each Object.entries(menus) as [key, value]}
			{#if menus[key].childMenus.length == 0 && menus[key].ParenAppMenuID == 0}
				<NavLi
					id="nav-menu{value.AppMenuID}"
					activeClass="bg-white !text-primary-100 hover:bg-white"
					class="group cursor-pointer !p-1 text-white hover:!text-white"
					href={value.AppMenuActionURL}
				>
					{value.AppMenuLabel}
				</NavLi>
			{:else if menus[key].ParenAppMenuID == 0}
				<NavLi
					id="nav-menu{value.AppMenuID}"
					activeClass="bg-white !text-primary-100 hover:bg-white"
					class="cursor-pointer !p-1 text-white hover:!text-white"
					href={value.AppMenuActionURL}
					on:mouseover={() => (hoverDropdown = true)}
				>
					<Chevron aligned>
						{value.AppMenuLabel}
					</Chevron>
				</NavLi>
				<Dropdown
					bind:open={hoverDropdown}
					id="dropdownHover"
					triggeredBy="#nav-menu{value.AppMenuID}"
					class="w-44 z-20"
				>
					{#each Object.entries(menus[key].childMenus) as [key, value]}
						<DropdownItem href={value.AppMenuActionURL}>
							{value.AppMenuLabel}
						</DropdownItem>
					{/each}
				</Dropdown>
			{/if}
		{/each}
	</NavUl>
</Navbar>

<Drawer
	transitionType="fly"
	{backdrop}
	{transitionParams}
	bind:hidden={drawerHidden}
	bind:activateClickOutside
	bgColor=""
	width="w-64"
	divClass="overflow-y-auto z-50 p-4 bg-primary-100"
	class="overflow-auto pb-32"
	id="sidebar"
>
	<div class="flex items-center">
		<CloseButton
			on:click={() => (drawerHidden = true)}
			class="mb-4 text-white dark:text-white lg:hidden"
		/>
	</div>
	<Sidebar asideClass="w-54">
		<SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded  dark:bg-gray-800">
			<SidebarGroup>
				<SidebarBrand {site} imgClass="w-80 h-15" />
				<SidebarItem label="Home" href="/" class="text-white hover:text-primary-100">
					<svelte:fragment slot="icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
							/><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
							/></svg
						>
					</svelte:fragment>
				</SidebarItem>
				<!-- <SidebarItem label="Admin" href="/admin">
						<svelte:fragment slot="icon">
							<ShieldExclamation />
						</svelte:fragment>
					</SidebarItem> -->
				<SidebarItem
					label="Log out"
					class="text-white hover:text-primary-100"
					data-sveltekit-preload-data="off"
					href="/logout"
				>
					<svelte:fragment slot="icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
							/></svg
						>
					</svelte:fragment>
				</SidebarItem>
				<SidebarItem
					label="Change Password"
					class="text-white hover:text-primary-100"
					data-sveltekit-preload-data="off"
					href="/change-password"
				>
					<svelte:fragment slot="icon">
						<Key />
					</svelte:fragment>
				</SidebarItem>
			</SidebarGroup>
		</SidebarWrapper>
	</Sidebar>
</Drawer>
