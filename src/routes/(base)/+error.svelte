<script>
	import { page } from '$app/stores';
	import { Card } from 'flowbite-svelte';
	import error403 from '$lib/images/403.svg';
	import othererr from '$lib/images/error.jpg';
</script>

{#if $page?.error}
	<div class="w-full">
		<Card class="mt-2" size="xl">
			<img
				class="p-2 m-auto rounded-t-lg text-center"
				width="30%"
				src={$page?.status === 403 ? error403 : othererr}
				alt="error"
			/>
			<a href="/">
				<h5
					class="text-center mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
				>
					It seems there has been an error, sorry about that.
				</h5>
			</a>
			<h4 class="mb-3 text-2xl font-extrabold text-center">
				{#if $page?.error?.message}
					<p>{$page?.error?.message}</p>
				{/if}
			</h4>
			<a href="/" class="inline-flex items-center text-primary-600 hover:underline"> Go to home </a>
		</Card>
	</div>
{/if}
