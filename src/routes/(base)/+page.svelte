<script lang="ts">
	import { onMount } from 'svelte';
	import { P } from 'flowbite-svelte';

	// Create a config object with type of the object, Embed details and Token Type
	// export let data;

	// Use the token expiry to regenerate Embed token for seamless end user experience
	// Refer https://aka.ms/RefreshEmbedToken

	onMount(() => {
		// OnMount Logic
	});
</script>

<div class="mt-10">
	<h2
		class="text-2xl lg:text-2xl text-center font-bold font-display sm:px-16 xl:px-40 dark:text-gray-400"
	>
		Diligence Fabric Svelte Starter Kit
	</h2>
	<div class="mt-2 flex justify-center">
		<p class="font-display font-bold">Minimal starter template for developing web applications</p>
	</div>
</div>
