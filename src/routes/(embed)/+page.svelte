<script lang="ts">
	import { onMount } from 'svelte';
	import { Alert, P ,Card } from 'flowbite-svelte';
	import { goto } from '$app/navigation';

	// Create a config object with type of the object, Embed details and Token Type
	export let data;

	let selected: string;

	// Use the token expiry to regenerate Embed token for seamless end user experience
	// Refer https://aka.ms/RefreshEmbedToken

	onMount(() => {
		// embedReport();
	});
</script>

<div class="mt-10">
	<!-- <Label for="reports">Select an report</Label> -->
	<!-- <Select
		id="reports"
		class="mt-2"
		bind:value={selected}
		on:change={handleReportChange}
		placeholder=""
	>
		<option selected value="all">All</option>

		{#each reports as { value, name }}
			<option {value}>{name}</option>
		{/each}

	</Select> -->
	<!-- <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">DF Svelte Starter Kit demonstration</h5> -->

	<P class="text-2xl lg:text-2xl font-extrabold sm:px-16 xl:px-40 dark:text-gray-400"
		>Welcome to DF Svelte Starter Kit demonstration</P
	>

</div>
