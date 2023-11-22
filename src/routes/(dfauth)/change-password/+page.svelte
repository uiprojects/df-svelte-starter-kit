<script lang="ts">
	import ChangePassword from '$lib/components/changepassword/ChangePassword.svelte';
	import { applyAction, enhance } from '$app/forms';
	import { form, field } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';
	import { isPasswordMatched } from '$lib/validators/confirmNewPass';
	import Cookies from 'js-cookie';
	import { goto } from '$app/navigation';
	import { Toast } from '$lib/components/Toast';
	import { MessageManager } from '$lib/common/MessageManager';

	let oldPassword = field('oldPassword', '', [required()]),
		newPassword = field('newPassword', '', [required()]),
		confirmNewpassword = field('confirmNewpassword', '', [
			required(),
			isPasswordMatched(newPassword)
		]);
	let loading = false;
	let messages = new MessageManager();
	let changePasswordform;

	changePasswordform = form(oldPassword, newPassword, confirmNewpassword);

	const resetForm = () => {
		oldPassword.clear();
		newPassword.clear();
		confirmNewpassword.clear();
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
		await changePasswordform.validate();
		if (!$changePasswordform.valid) {
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
					Toast.fire({
						icon: 'success',
						iconColor: 'white',
						text: result.data.message,
						color: 'white',
						background: 'green'
					});
					Cookies.remove('df_user');
					Cookies.remove('token');
					resetForm();
					goto('/login');
				} else {
					messages.showError(result.data.message);
				}
			}
			if (result.type === 'error') {
				await applyAction(result);
			}
		};
	}}
>
	<ChangePassword
		{oldPassword}
		{newPassword}
		{loading}
		{messages}
		{confirmNewpassword}
		{changePasswordform}
	/>
</form>
