<script lang="ts">
	import logo from '$lib/images/your-logo.png';
	import { Alert, Button, Input, Label, Spinner } from 'flowbite-svelte';
	import { fade } from 'svelte/transition';

	export let oldPassword,
		newPassword,
		confirmNewpassword,
		loading: boolean,
		messages,
		changePasswordform;

	let showPasswordTypes = {
		oldPassword: 'password',
		newPassword: 'password',
		confirmNewPassword: 'password'
	};

	function togglePassword(key: string) {
		showPasswordTypes[key] = showPasswordTypes[key] === 'text' ? 'password' : 'text';
	}
</script>

<div
	class="flex flex-col items-center justify-center px-3 py-3 mx-auto md:h-screen lg:py-0 fade-in-from-top"
>
	<a
		href="https://ubtiinc.com"
		class="flex items-center mb-4 text-2xl font-semibold text-gray-900 dark:text-white"
	>
		<img class="w-90 h-20 mr-2" src={logo} alt="Logo" />
	</a>
	<div
		class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 fade-in-from-top-delay-1"
	>
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<h1
				class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
			>
				Change Password
			</h1>
			{#if messages?.toggle}
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
				<Label for="oldpassword" class="block mb-2"
					>Old Password
					{#if $changePasswordform.hasError('oldPassword.required')}
						<span style=" padding-top: 2px; font-size: 10px; color: #b00;">
							<strong>&nbsp;This field is required.</strong>
						</span>
					{/if}
				</Label>
				<Input
					type={showPasswordTypes.oldPassword}
					name="oldpassword"
					id="oldpassword"
					color={$changePasswordform.hasError('oldPassword.required') ? 'red' : 'base'}
					placeholder="Old Password"
					bind:value={$oldPassword.value}
					required
				>
					<svg
						slot="left"
						aria-hidden="true"
						class="w-5 h-5 text-gray-500 dark:text-gray-400"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g transform="translate(3.5 1) scale(0.032)">
							<path
								d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"
							/>
						</g>
					</svg>
					<svg
						slot="right"
						aria-hidden="true"
						class="w-8 h-8 text-gray-500 dark:text-gray-400"
						fill="currentColor"
						viewBox="0 0 33 33"
						xmlns="http://www.w3.org/2000/svg"
						on:click={() => togglePassword('oldPassword')}
					>
						{#if showPasswordTypes.oldPassword === 'text'}
							<g transform="translate(6 7) scale(0.035)">
								<path
									d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
								/>
							</g>
						{:else}
							<g transform="translate(5 7) scale(0.035)">
								<path
									d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"
								/>
							</g>
						{/if}
					</svg>
				</Input>
			</div>
			<div>
				<Label for="newpassword" class="block mb-2"
					>New Password
					{#if $changePasswordform.hasError('newPassword.required')}
						<span style=" padding-top: 2px; font-size: 10px; color: #b00;">
							<strong>&nbsp;This field is required.</strong>
						</span>
					{/if}
				</Label>
				<Input
					type={showPasswordTypes.newPassword}
					name="newpassword"
					id="newpassword"
					color={$changePasswordform.hasError('newPassword.required') ? 'red' : 'base'}
					bind:value={$newPassword.value}
					placeholder="New Password"
					required
				>
					<svg
						slot="left"
						aria-hidden="true"
						class="w-5 h-5 text-gray-500 dark:text-gray-400"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g transform="translate(3.5 1) scale(0.032)">
							<path
								d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"
							/>
						</g>
					</svg>
					<svg
						slot="right"
						aria-hidden="true"
						class="w-8 h-8 text-gray-500 dark:text-gray-400"
						fill="currentColor"
						viewBox="0 0 33 33"
						xmlns="http://www.w3.org/2000/svg"
						on:click={() => togglePassword('newPassword')}
					>
						{#if showPasswordTypes.newPassword === 'text'}
							<g transform="translate(6 7) scale(0.035)">
								<path
									d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
								/>
							</g>
						{:else}
							<g transform="translate(5 7) scale(0.035)">
								<path
									d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"
								/>
							</g>
						{/if}
					</svg>
				</Input>
			</div>
			<div>
				<Label for="confirmNewpassword" class="block mb-2"
					>Confirm New Password
					{#if $changePasswordform.hasError('confirmNewpassword.required')}
						<span style=" padding-top: 2px; font-size: 10px; color: #b00;">
							<strong>&nbsp;This field is required.</strong>
						</span>
					{:else if $changePasswordform.hasError('confirmNewpassword.isPasswordMatched')}
						<span style=" padding-top: 2px; font-size: 10px; color: #b00;">
							<strong>&nbsp;Passwords do not match.</strong>
						</span>
					{/if}
				</Label>
				<Input
					type={showPasswordTypes.confirmNewPassword}
					name="confirmNewpassword"
					id="confirmNewpassword"
					color={$changePasswordform.hasError('confirmNewpassword.required') ||
					$changePasswordform.hasError('confirmNewpassword.isPasswordMatched')
						? 'red'
						: 'base'}
					bind:value={$confirmNewpassword.value}
					placeholder="Confirm New Password"
					required
				>
					<svg
						slot="left"
						aria-hidden="true"
						class="w-5 h-5 text-gray-500 dark:text-gray-400"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g transform="translate(3.5 1) scale(0.032)">
							<path
								d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"
							/>
						</g>
					</svg>
					<svg
						slot="right"
						aria-hidden="true"
						class="w-8 h-8 text-gray-500 dark:text-gray-400"
						fill="currentColor"
						viewBox="0 0 33 33"
						xmlns="http://www.w3.org/2000/svg"
						on:click={() => togglePassword('confirmNewPassword')}
					>
						{#if showPasswordTypes.confirmNewPassword === 'text'}
							<g transform="translate(6 7) scale(0.035)">
								<path
									d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
								/>
							</g>
						{:else}
							<g transform="translate(5 7) scale(0.035)">
								<path
									d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"
								/>
							</g>
						{/if}
					</svg>
				</Input>
			</div>
			<div class="flex flex-row items-center justify-between">
				<Button type="submit" color="primary" size="xs" disabled={loading}
					>Submit
					{#if loading}
						<Spinner class="ml-3" size="4" color="white" />
					{/if}</Button
				>
				<Button type="button" color="alternative" size="xs" href="/">Go Back</Button>
			</div>
		</div>
	</div>
</div>
