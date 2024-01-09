<script lang="ts">
	import logo from '$lib/images/your-logo.png';
	import { Alert, Button, Helper, Input, Label, Spinner } from 'flowbite-svelte';
	import { fade } from 'svelte/transition';

	export let email, loading: boolean, messages, forgotPasswordform;
</script>

<div
	class="flex flex-col items-center justify-center px-3 py-3 mx-auto md:h-screen lg:py-0 fade-in-from-top"
>
	<a
		href="https://ubtiinc.com"
		class="flex items-center mb-4 text-2xl font-semibold text-gray-900 dark:text-white"
	>
		<img class="w-90 h-20 mr-2" src={logo} alt="UBTI" />
	</a>
	<div
		class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 fade-in-from-top-delay-1"
	>
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<h1
				class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
			>
				Forgot Password?
			</h1>
			{#if messages.toggle}
				<Alert border color={messages.color} dismissable>
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
				<p class="text-sm">
					<i>
						If you forgot your password, enter the email address associated with your account below
						and press Submit. You will receive an email at that address to restore access.
					</i>
				</p>
			</div>
			<div>
				<Label for="email" class="block mb-2"
					>Email
					{#if $forgotPasswordform.hasError('email.required')}
						<span style=" padding-top: 2px; font-size: 10px; color: #d00;">
							<strong>&nbsp;This field is required.</strong>
						</span>
					{/if}
				</Label>
				<Input
					type="email"
					name="email"
					id="email"
					color={$forgotPasswordform.hasError('email.required') ? 'red' : 'base'}
					placeholder="name@example.com"
					bind:value={$email.value}
					required
				>
					<svg
						slot="left"
						aria-hidden="true"
						class="w-5 h-5 text-gray-500 dark:text-gray-400"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
						/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg
					>
				</Input>

				{#if $forgotPasswordform.hasError('email.required')}
					<Helper class="mt-2 text-primary-200" color="red"
						><span class="font-medium">This field is required</span></Helper
					>
				{/if}
			</div>
			<div class="flex flex-row items-center justify-between">
				<Button type="submit" color="primary" size="xs" disabled={loading}>
					Submit
					{#if loading}
						<Spinner class="ml-3" size="4" color="white" />
					{/if}</Button
				>
				<Button type="button" color="alternative" size="xs" href="/login">Wanna Login?</Button>
			</div>
		</div>
	</div>
</div>
