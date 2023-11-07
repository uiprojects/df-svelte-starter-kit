<script lang="ts">
	import logo from '$lib/images/your-logo.png';
	import { Alert, Button, Helper, Input, Label, Spinner } from 'flowbite-svelte';
	import { fade } from 'svelte/transition';

	export let password, username, loading: boolean, messages, loginForm;
</script>

<div class="flex flex-col items-center justify-center px-3 py-3 mx-auto md:h-screen lg:py-0">
	<a
		href="https://ubtiinc.com"
		class="flex items-center mb-4 text-2xl font-semibold text-gray-900 dark:text-white"
	>
		<img class="w-90 h-20 mr-2" src={logo} alt="UBTI" />
	</a>
	<div
		class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
	>
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<h1
				class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
			>
				Sign in to your account
			</h1>
			{#if messages.toggle}
				<Alert border color="red" dismissable>
					<span slot="icon" transition:fade|global>
						<svg
							aria-hidden="true"
							class="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
								clip-rule="evenodd"
							/>
						</svg>
					</span>
					{messages.message}
				</Alert>
			{/if}
			<div>
				<Label for="username" class="block mb-2">Your Username</Label>
				<Input
					type="text"
					name="username"
					id="username"
					color={$loginForm.hasError('username.required') ? 'red' : 'base'}
					placeholder="support@ubtiinc.com"
					bind:value={$username.value}
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
						<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
						<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
					</svg>
				</Input>
			</div>
			<div>
				<Label for="password" class="block mb-2">Password</Label>
				<Input
					type="password"
					name="password"
					id="password"
					color={$loginForm.hasError('password.required') ? 'red' : 'base'}
					placeholder="••••••••"
					bind:value={$password.value}
					required
				/>
				{#if $loginForm.hasError('password.required')}
					<Helper class="mt-2 text-primary-200" color="red"
						><span class="font-medium">This field is required</span></Helper
					>
				{/if}
			</div>
			<div class="flex items-center justify-between">
				<div class="flex items-start">
					<div class="flex items-center h-5">
						<input
							id="remember"
							aria-describedby="remember"
							type="checkbox"
							class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
						/>
					</div>
					<div class="ml-3 text-sm">
						<label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
					</div>
				</div>
				<a
					href="/forgot-password"
					class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
					>Forgot password?</a
				>
			</div>
			<div class="flex flex-row items-center justify-center">
				<Button
					type="submit"
					color="primary"
					class="text-whitecus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
					disabled={loading}
				>
					{#if loading}
						<Spinner class="mr-3" size="4" color="white" />
					{/if}
					Sign in
				</Button>
			</div>
		</div>
	</div>
</div>
