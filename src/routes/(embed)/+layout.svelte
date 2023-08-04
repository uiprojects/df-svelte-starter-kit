<script lang="ts">
	import Footer from '$lib/components/footer/Footer.svelte';
	import logo from '$lib/images/logo.png';
	import yourlogo from '$lib/images/your-logo.png';
	import '$lib/css/style.scss';
	import '../../app.postcss';
	import Key from 'svelte-heros-v2/Key.svelte';
	import { page } from '$app/stores';
	import { navigating } from '$app/stores';
	import User from 'svelte-heros-v2/User.svelte';
	import {
		Sidebar,
		SidebarWrapper,
		SidebarBrand,
		SidebarItem,
		SidebarGroup,
		DarkMode,
		Drawer,
		Navbar,
		NavUl,
		NavLi,
		NavHamburger,
		NavBrand,
		CloseButton,
		Avatar,
		Dropdown,
		DropdownItem,
		Spinner,
		Button
	} from 'flowbite-svelte';
	import { Toast } from '$lib/components/Toast';
	import { sineIn } from 'svelte/easing';
	import { onMount } from 'svelte';


	let spanClass = 'flex-1 ml-3 whitespace-nowrap';

	let site = {
		name: '',
		href: '/',
		img: yourlogo
	};

	export let data;
    
	const user = data.user 

	const error = data.error;

	$: activeUrl = $page.url.pathname;
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};

	let backdrop: boolean = false;

	$: hoverDropdown = false;

	let activateClickOutside = true;

	let drawerHidden: boolean = false;

	let breakPoint: number = 1024;

	let width: number;

	$: if (width >= breakPoint) {
		drawerHidden = false;
		activateClickOutside = false;
	} else {
		drawerHidden = true;
		activateClickOutside = true;
	}

	let menuNav = [ { appMenuLabel : 'Home'  , appMenuActionURL : '/' } ,
	 {appMenuLabel : 'About'  , appMenuActionURL : '/'} , 
	 { appMenuLabel : 'Admin'  , appMenuActionURL : 'admin'} ]

	onMount(() => {
		if (width >= breakPoint) {
			drawerHidden = false;
			activateClickOutside = false;
		} else {
			drawerHidden = true;
			activateClickOutside = true;
		}
		console.log(activeUrl === '/menu');

		var toTopButton: any = document.getElementById('to-top-button');

		// When the user scrolls down 200px from the top of the document, show the button
		window.onscroll = function () {
			if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
				toTopButton.classList.remove('hidden');
			} else {
				toTopButton.classList.add('hidden');
			}
		};
	});

	const toggleSide = () => {
		if (width < breakPoint) {
			drawerHidden = !drawerHidden;
		}
	};

	const toggleDrawer = () => {
		drawerHidden = false;
	};

	let darkmodebtn =
		'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-lg p-2.5 fixed right-2 top-12  md:top-3 md:right-2 z-50';
	let ulClass =
		'bg-blue-100 flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-medium';
	// When the user clicks on the button, smoothy scroll to the top of the document

	function goToTop() {
		scrollTo({ top: 0, behavior: 'smooth' });
	}

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
		<Avatar class="acs" >

		</Avatar>
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
	{#each Object.entries(menuNav) as [key, value] }

		<NavLi
			id="nav-menu"
			active={activeUrl === '/menu'}
			activeClass="bg-white !text-primary-100 hover:bg-white"
			class="group cursor-pointer !p-1 text-white hover:!text-primary-100"
			href={value.appMenuActionURL}
		>
			{value.appMenuLabel}     
	   </NavLi>

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

<div class="flex px-2 mx-auto w-full">
	<main class="lg:ml-72 w-full mx-auto">
		<!-- Back to top button -->
		<Button
			id="to-top-button"
			on:click={goToTop}
			pill={true}
			color="primary"
			title="Go To Top"
			class="!p-2 hidden fixed focus:shadow-lg focus:outline-none active:shadow-lg transition duration-150 ease-in-out bottom-5 right-5 z-10"
			><svg
				aria-hidden="true"
				focusable="false"
				data-prefix="fas"
				class="w-4 h-4"
				role="img"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 448 512"
				><path
					fill="currentColor"
					d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
				/></svg
			></Button
		>
		{#if $navigating}
			<!-- LOOK HERE -->
			<div class="text-center mt-10">
				<Spinner size="12" color="primary" />
			</div>
		{:else}
			<slot {error} />
		{/if}

		<Footer />
	</main>
</div>
