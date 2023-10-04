<script lang="ts">
	import { Alert, Button, Helper, Input, Label, Spinner } from 'flowbite-svelte';
	import { fade } from 'svelte/transition';
	import yourlogo from '$lib/images/your-logo.png';


	export let oldPassword,
		newPassword,
		confirmNewpassword,
		loading: boolean,
		messages,
		changePasswordform;
</script>

<div class="flex flex-col items-center justify-center px-3 py-3 mx-auto md:h-screen lg:py-0">
	<a
		href="https://ubtiinc.com"
		class="flex items-center mb-4 text-2xl font-semibold text-gray-900 dark:text-white"
	>
		<img class="w-90 h-20 mr-2" src={yourlogo} alt="UBTI" />
	</a>
	<div
		class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
	>
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<h1
				class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
			>
				Change your password
			</h1>
			{#if messages.toggle}
				<Alert border color="red" dismissable>
					<span slot="icon" transition:fade
						><svg
							aria-hidden="true"
							class="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
								clip-rule="evenodd"
							/></svg
						>
					</span>
					{messages.message}
				</Alert>
			{/if}
			<div>
				<Label for="oldpassword" class="block mb-2">Old Password</Label>
				<Input
					type="password"
					name="oldpassword"
					id="oldpassword"
					color={$changePasswordform.hasError('oldPassword.required') ? 'red' : 'base'}
					placeholder="••••••••"
					bind:value={$oldPassword.value}
					required
				/>
				{#if $changePasswordform.hasError('oldPassword.required')}
					<Helper class="mt-2 text-primary-200" color="red"
						><span class="font-medium">This field is required</span></Helper
					>
				{/if}
			</div>
			<div>
				<Label for="newpassword" class="block mb-2">New Password</Label>
				<Input
					type="password"
					name="newpassword"
					id="newpassword"
					color={$changePasswordform.hasError('newPassword.required') ? 'red' : 'base'}
					bind:value={$newPassword.value}
					placeholder="••••••••"
					required
				/>
				{#if $changePasswordform.hasError('newPassword.required')}
					<Helper class="mt-2 text-primary-200" color="red"
						><span class="font-medium">This field is required</span></Helper
					>
				{/if}
			</div>
			<div>
				<Label for="confirmNewpassword" class="block mb-2">Confirm New Password</Label>
				<Input
					type="password"
					name="confirmNewpassword"
					id="confirmNewpassword"
					color={$changePasswordform.hasError('confirmNewpassword.required') ||
					$changePasswordform.hasError('confirmNewpassword.isPasswordMatched')
						? 'red'
						: 'base'}
					bind:value={$confirmNewpassword.value}
					placeholder="••••••••"
					required
				/>
				{#if $changePasswordform.hasError('confirmNewpassword.required')}
					<Helper class="mt-2 text-primary-200" color="red"
						><span class="font-medium">This field is required</span></Helper
					>
				{/if}
				{#if $changePasswordform.hasError('confirmNewpassword.isPasswordMatched')}
					<Helper class="mt-2 text-primary-200" color="red"
						><span class="font-medium">Password does not match</span></Helper
					>
				{/if}
			</div>
			<div class="flex flex-row items-center justify-between">
				<Button
					type="submit"
					color="primary"
					size="xs"
					disabled={loading}
				>Submit
					{#if loading}
						<Spinner class="ml-3" size="4" color="white" />
					{/if}</Button>
                    <Button
					type="button"
					color="alternative"
					size="xs"
                    href="/"
				>Go Back
					</Button>
			</div>
		</div>
	</div>
</div>
