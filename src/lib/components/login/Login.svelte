<script lang="ts">
	import logo from '$lib/images/your-logo.png';
	import { PublicClientApplication } from '@azure/msal-browser';
	import { Alert, Button, Helper, Input, Label, Spinner } from 'flowbite-svelte';
	import microsoftIcon from '$lib/images/microsoftIcon.svg';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { applyAction, enhance } from '$app/forms';
	import { field, form } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';
	import { Toast } from '$lib/components/Toast';
	import Cookies from 'js-cookie';
	import { goto } from '$app/navigation';

	export let userCookie, loading: boolean, messages, authenticationTypeList;

	let hidden = Boolean(userCookie);

	let type = 'password';

	let loginForm: any;

	let microsoftForm: any;

	let msalInstance: any;
	let msalConfig: any;
	let userAuthenticatedResponse: any;

	let username = field('username', '', [required()]),
		password = field('password', '', [required()]),
		rememberMe = field('rememeberme', '');

	loginForm = form(username, password);

	let microsoftUsername = field('microsoftUsername', ''),
		microsoftToken = field('microsoftToken', '');

	microsoftForm = form(microsoftUsername);

	const loginRequest = {
		scopes: ['openid', 'profile', 'User.Read']
	};

	const tokenRequest = {
		scopes: ['Mail.Read']
	};

	function toggleShowPassword() {
		type = type === 'text' ? 'password' : 'text';
	}

	function onInput(event) {
		if (userCookie != event.target.value) {
			hidden = false;
		} else {
			hidden = true;
		}
	}

	const resetForm = () => {
		password.clear();
	};

	async function microsoftSignIn() {
		try {
			const loginResponse = await msalInstance.loginPopup(loginRequest);
			return loginResponse;
		} catch (error) {
			console.log(error);
			loading = false
		}

		// .then((response: any) => {
		// 	console.log('printing resp ', response.account);
		// 	// addMsalLoggedUser(response);

		// 	// msalInstance.setActiveAccount(response.account);

		// 	// formData["microsoftUsername"] = response.account.username

		// 	formData.append('microsoftUsername', response.account.username);

		// 	console.log('username', microsoftUsername);
		// 	// username = loginResponse.account
		// 	// if (msalInstance.getAccount()) {
		// 	// 	showWelcomeMessage(msalInstance.getAccount());
		// 	// }
		// })
		// .catch((error: any) => {
		// 	console.log('error is ', error);
		// });

		// const accounts = msalInstance.getAllAccounts();
		// if (accounts.length === 0) {
		// 	msalInstance.loginRedirect();
		// }

		// await msalInstance.loginRedirect(loginRequest)
	}

	function addMsalLoggedUser(msalResponse: any) {
		console.log('msal', msalResponse);
		username = msalResponse.account.username;
		console.log('username ', username);
	}

	function microsoftLogout(username: string) {
		const logoutRequest = {
			account: msalInstance.getAccountByUsername(username),
			postLogoutRedirectUri: msalConfig.auth.redirectUri,
			mainWindowRedirectUri: msalConfig.auth.redirectUri
		};

		msalInstance.logoutPopup(logoutRequest);
	}

	onMount(async () => {
		msalConfig = {
			auth: {
				clientId: authenticationTypeList.ClientOrAppIDConfig,
				authority: `https://login.microsoftonline.com/${authenticationTypeList.ProviderTenantIDConfig}`,
				redirectUri: window.location.origin + '/login'
			},
			cache: {
				cacheLocation: 'sessionStorage',
				storeAuthStateInCookie: false
			}
		};

		msalInstance = new PublicClientApplication(msalConfig);

		await msalInstance.initialize();

		msalInstance
			.handleRedirectPromise()
			.then((tokenResponse: any) => {
				if (!tokenResponse) {
					const accounts = msalInstance.getAllAccounts();
					// if (accounts.length === 0) {
					// 	msalInstance.loginRedirect();
					// }
				}
				else {
					// Do something with the tokenResponse
				}
			})
			.catch((err: any) => {
				// Handle error
				console.error(err);
			});
	});
</script>

<div class="flex flex-col items-center justify-center px-3 py-3 mx-auto md:h-screen lg:py-0">
	<a
		href="https://ubtiinc.com"
		class="flex items-center mb-4 text-2xl font-semibold text-gray-900 dark:text-white"
	>
		<img class="w-90 h-20 mr-2" src={logo} alt="UBTI" />
	</a>
	<div
		class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 fade-in-from-top-delay-1"
	>
		<form
			novalidate
			method="post"
			action="?/submit"
			use:enhance={async ({ cancel }) => {
				await loginForm.validate();
				if (!$loginForm.valid) {
					cancel();
					loading = false;
				} else {
					loading = true;
					messages.hideAlerts();
				}
				return async ({ result }) => {
					// `result` is an `ActionResult` object
					loading = false;
					if (result.type == 'success') {
						if (result.data.status === 'SUCCESS') {
							const response = result.data.response;

							Toast.fire({
								icon: 'success',
								iconColor: 'white',
								text: result.data.message,
								color: 'white',
								background: 'green'
							});

							
							Cookies.set('df_user', JSON.stringify(response?.Result), {
								expires: new Date(response.Result.ExpiresUtc)
							});

							Cookies.set('token', response.Result.Token, {
								expires: new Date(response?.Result?.ExpiresUtc)
							});

							resetForm();
							goto('/');
						}
						 else {
							messages.showError(result.data?.message);
						}
					}
					if (result.type === 'error') {
						await applyAction(result);
					}
				};
			}}
		>
			<div class="p-6 mb-2 space-y-4 md:space-y-6 sm:p-8">
				<h1
					class="text-xl text-left font-Sen leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
				>
					Log in
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
					<Label for="username" class="font-Nunito block mb-2"
						>Username or Email
						{#if $loginForm.hasError('username.required')}
							<span style=" padding-top: 2px; margin-bottom: -2px; font-size: 10px; color: #d00;">
								<strong>&nbsp;This field is required.</strong>
							</span>
						{/if}
					</Label>
					<Input
						type="text"
						name="username"
						id="username"
						color={$loginForm.hasError('username.required') ? 'red' : 'base'}
						placeholder="name@example.com"
						class="font-Nunito text-black"
						bind:value={$username.value}
						on:input={onInput}
						required
					>
						<svg
							slot="left"
							aria-hidden="true"
							class="w-5 h-5 text-gray-500 dark:text-gray-400"
							fill="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g transform="translate(1 0) scale(1.2)">
								<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
								<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
							</g>
						</svg>
					</Input>
					
				</div>
				<div>
					<Label for="password" class="font-Nunito block mb-2"
						>Password
						{#if $loginForm.hasError('password.required')}
							<span style=" padding-top: 2px; top: -20px; font-size: 10px; color: #d00;">
								<strong>&nbsp;This field is required.</strong>
							</span>
						{/if}
					</Label>
					<Input
						{type}
						name="password"
						id="password"
						color={$loginForm.hasError('password.required') ? 'red' : 'base'}
						class="font-Nunito text-black"
						placeholder="Password"
						bind:value={$password.value}
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
							on:click={toggleShowPassword}
						>
							<!-- <rect
							class="icon-frame"
							width="32"
							height="32"
							rx="6"
							ry="6"
							fill="white"
							stroke="#ddd"
							stroke-width="1"
						/> -->
							{#if type === 'text'}
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
				<div class="flex items-center justify-between">
					<div class="{!hidden ? 'visible' : 'invisible'} flex items-start">
						<div class="flex items-center">
							<input
								id="remember"
								aria-describedby="remember"
								type="checkbox"
								name="rememberMe"
								class="text-primary-50  w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
							/>
						</div>
						<div class="ml-3 text-xs">
							<label for="remember" class="font-Nunito text-black text-sm  text-gray-500 dark:text-gray-300">Remember me</label>
						</div>
					</div>
					<Button type="button" color="alternative"  class="font-Sen text-base" size="xs" href="/forgot-password">
						Forgot password?
					</Button>
				</div>
				<div class="flex flex-row items-center justify-center">
					<Button
						type="submit"
						color="primary"
						class="w-96 font-Sen text-white rounded-lg text-center dark:bg-primary-600"
						disabled={loading}
						id="btnLogin"
					>
						{#if loading}
							<Spinner class="mr-3" size="4" color="white" />Signing in...
						{:else}
							Log in
						{/if}
					</Button>
				</div>
			</div>
		</form>

		<form
			novalidate
			method="post"
			action="?/microsoftLoginSubmit"
			use:enhance={async ({ cancel, formData }) => {
				loading = true;

				let microsoftSignInResponse = await microsoftSignIn();

				console.log('mic', microsoftSignInResponse);

				formData.append('microsoftUsername', microsoftSignInResponse.account.username);
				formData.append('microsoftToken', microsoftSignInResponse.accessToken);
				formData.append('authenticationTypeCode', 'MS');

				return async ({ result }) => {
					loading = false;
					if (result.type == 'success') {
						if (result.data.status === 'SUCCESS') {
							const response = result.data.response;

							Toast.fire({
								icon: 'success',
								iconColor: 'white',
								text: result.data.message,
								color: 'white',
								background: 'green'
							});

							console.log('resp result', response.Result);

							Cookies.set('df_user', JSON.stringify(response?.Result), {
								expires: new Date(response.Result.ExpiresUtc)
							});

							Cookies.set('token', response.Result.Token, {
								expires: new Date(response?.Result?.ExpiresUtc)
							});
							resetForm();
							goto('/');
						}
					}

					if (result.type === 'error') {
						await applyAction(result);
					}
				};
			}}
		>
			<div class="flex flex-row items-center justify-center mb-2">
				<!-- <Helper class="text-gray-200 bg-none" color="gray"> -->
				<!-- <span class="font-medium"
						>or continue with -->

				<button
					type="submit"
					class="p-1 text-black bg-[#eee] border-solid border-[#eee] rounded text-base text-center hover:bg-gray-300"
				>
					<img class="w-8 h-8 ml-[0.15rem] inline-block" src={microsoftIcon} alt="microsoftIcon" />
					Continue with Microsoft
				</button>
				<!-- </span> -->
				<!-- </Helper> -->
			</div>
		</form>
	</div>
</div>
