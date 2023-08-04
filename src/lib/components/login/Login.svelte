<script>
	import { goto } from '$app/navigation';
	import logo from '$lib/images/ubti-logo.png';
	import Cookies from 'js-cookie';
	import { Alert, Button, Spinner } from 'flowbite-svelte';
	import { client } from '$lib/common/DF/sdk';
	import { fade } from 'svelte/transition';
	import { env } from '$env/dynamic/public';

	let username = '';
	let password = '';

	export let data;

	let loading = false;

	let errorMessage = null;

	// $: if(errorMessage != ''){
	// 		setTimeout( () => {
	// 			errorMessage = null
	// 		} ,7000  )
	// 	}

	const login = async () => {
		loading = true;

		try {
			const response = await client.getAuthService().login({ username, password });
			if (response.Result.TenantID != env.PUBLIC_DF_TENANTID) {
				errorMessage = `You are not a member of ${response.Result.TenantName} Tenant, Please contact your Tenant Administrator.`;
				loading = false;
			} else if (response.StatusCode == 200) {
				Cookies.set('df_user', JSON.stringify(response?.Result), {
					expires: new Date(response.Result.ExpiresUtc)
				});

				Cookies.set('token', response.Result.Token, {
					expires: new Date(response?.Result?.ExpiresUtc)
				});

				loading = false;
				errorMessage = null;
				goto('/', { invalidateAll: true });
			} else {
				loading = false;
				errorMessage = 'Please check your credentials and try again!!';
			}
		} catch (error) {
			loading = false;
			console.log(error);
			errorMessage = 'Please check your credentials and try again!!';
		}

		password = '';
	};
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
			{#if errorMessage}
				<Alert border color="red" dismissable>
					<span slot="icon" transition:fade|global
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
					{errorMessage}
				</Alert>
			{/if}
			<form class="space-y-4 md:space-y-6" on:submit|preventDefault={login}>
				<div>
					<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>Your email</label
					>
					<input
						type="email"
						name="email"
						id="email"
						class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="name@company.com"
						bind:value={username}
						readonly={loading}
						required
					/>
				</div>
				<div>
					<label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>Password</label
					>
					<input
						type="password"
						name="password"
						id="password"
						bind:value={password}
						placeholder="••••••••"
						required
						readonly={loading}
						class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					/>
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
					>
						{#if loading}
							<Spinner class="mr-3" size="4" color="white" />
						{/if}
						Sign in
					</Button>
				</div>
			</form>
		</div>
	</div>
</div>
