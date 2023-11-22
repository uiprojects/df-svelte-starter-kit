<script lang="ts">
	import Login from '$lib/components/login/Login.svelte';
	import { MessageManager } from '$lib/common/MessageManager';
	import { field, form } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';
	import { applyAction, enhance } from '$app/forms';
	import { Toast } from '$lib/components/Toast';
	import Cookies from 'js-cookie';
	import { goto } from '$app/navigation';

	let username = field('username', '', [required()]),
		password = field('password', '', [required()]);
	let loading = false;
	let messages = new MessageManager();
	let loginForm: any;

	loginForm = form(username, password);

	const resetForm = () => {
		password.clear();
	};
</script>

<form
	novalidate
	method="post"
	action="?/submit"
	use:enhance={async ({ cancel }) => {
		// `form` is the `<form>` element
		// `data` is its `FormData` object
		// `action` is the URL to which the form is posted
		// `cancel()` will prevent the submission
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
				} else {
					messages.showError(result.data?.message);
				}
			}
			if (result.type === 'error') {
				await applyAction(result);
			}
		};
	}}
>
	<Login {password} {username} {loading} {messages} {loginForm} />
</form>
