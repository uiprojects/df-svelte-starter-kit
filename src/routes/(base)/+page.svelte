<script lang="ts">
	import { onMount } from 'svelte';
	import { P, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';

	// Create a config object with type of the object, Embed details and Token Type
	// export let data;

	// Use the token expiry to regenerate Embed token for seamless end user experience
	// Refer https://aka.ms/RefreshEmbedToken

	onMount(() => {
		// OnMount Logic
	});
</script>

<div class="mt-10">
	<P class="text-2xl lg:text-2xl text-center font-extrabold sm:px-16 xl:px-40 dark:text-gray-400"
		>Welcome to DF Svelte Starter Kit demonstration</P
	>
	<Table>
		<TableHead>
		  <TableHeadCell>Product name</TableHeadCell>
		  <TableHeadCell>Color</TableHeadCell>
		  <TableHeadCell>Category</TableHeadCell>
		  <TableHeadCell>Price</TableHeadCell>
		</TableHead>
		<TableBody class="divide-y">
		  <TableBodyRow>
			<TableBodyCell>Apple MacBook Pro 17"</TableBodyCell>
			<TableBodyCell>Sliver</TableBodyCell>
			<TableBodyCell>Laptop</TableBodyCell>
			<TableBodyCell>$2999</TableBodyCell>
		  </TableBodyRow>
		  <TableBodyRow>
			<TableBodyCell>Microsoft Surface Pro</TableBodyCell>
			<TableBodyCell>White</TableBodyCell>
			<TableBodyCell>Laptop PC</TableBodyCell>
			<TableBodyCell>$1999</TableBodyCell>
		  </TableBodyRow>
		  <TableBodyRow>
			<TableBodyCell>Magic Mouse 2</TableBodyCell>
			<TableBodyCell>Black</TableBodyCell>
			<TableBodyCell>Accessories</TableBodyCell>
			<TableBodyCell>$99</TableBodyCell>
		  </TableBodyRow>
		</TableBody>
	  </Table>
</div>
