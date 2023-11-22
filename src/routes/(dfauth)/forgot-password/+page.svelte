<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { form, field } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';
	import ForgotPassword from '$lib/components/forgotpassword/ForgotPassword.svelte';
	import { MessageManager } from '$lib/common/MessageManager';

	let email = field('email', '', [required()]);
	let loading = false;
	let messages = new MessageManager();

	let forgotPasswordform;

	forgotPasswordform = form(email);

	const resetForm = () => {
		email.clear();
	};
</script>

<form
	novalidate
	method="post"
	action="?/submit"
	use:enhance={async ({ form, data, action, cancel }) => {
		// `form` is the `<form>` element
		// `data` is its `FormData` object
		// `action` is the URL to which the form is posted
		// `cancel()` will prevent the submission
		await forgotPasswordform.validate();
		if (!$forgotPasswordform.valid) {
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
					messages.showSuccessMessage(result.data.message);
					resetForm();
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
	<ForgotPassword {email} {loading} {messages} {forgotPasswordform} />
</form>
