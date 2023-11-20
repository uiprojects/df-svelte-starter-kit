<script>
	import { Card, Dropdown, DropdownItem } from 'flowbite-svelte';
	import {
		DotsVerticalOutline,
		PapperPlaneSolid,
		PrinterOutline,
		ShareNodesOutline
	} from 'flowbite-svelte-icons';
</script>

<Card size="xl" class="m-4">
	<div class="flex flex-col h-auto">
		<header class="flex justify-between bg-gray-100 p-4 h-15">
			<h3 class="text-black font-bold">DF GPT</h3>
			<div class="flex items-center text-black gap-4">
				<ShareNodesOutline />
				<PrinterOutline />
				<DotsVerticalOutline class="dots-menu" />
				<Dropdown triggeredBy=".dots-menu">
					<DropdownItem>GUI</DropdownItem>
					<DropdownItem>Plain Text</DropdownItem>
					<DropdownItem>Custom</DropdownItem>
				</Dropdown>
			</div>
		</header>

		<div class="flex-1 overflow-y-auto bg-sky-50 p-4">
			<div class="mt-2 mb-4">
				<span class="justify-end my-1 text-black">Response : </span>
				<p class="bg-slate-200 text-black rounded-lg p-2 w-fit">
					Hello, you can always text me if you have any questions. I am looking forward to it.
				</p>
			</div>

			<div class="flex justify-end m-4 w-auto">
				<p class="bg-blue-600 text-white rounded-lg p-2 w-fit">Hi there!</p>
			</div>

			<div class="flex mt-2">
				<input
					type="text"
					placeholder="Type a message"
					class="border border-gray-300 rounded-lg px-4 py-2 w-full"
				/>
				<button class="ml-2 bg-[#005f94] text-white px-4 py-2 rounded-lg">
					<PapperPlaneSolid />
				</button>
			</div>
		</div>
	</div>
</Card>
