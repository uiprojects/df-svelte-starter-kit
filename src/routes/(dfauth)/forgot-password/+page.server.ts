import { client, logger } from '$lib/server/DF/sdk';
export const actions = {
	submit: async ({ request }) => {
		const data = await request.formData();
		const { email } = Object.fromEntries(data);
		let response = null;
		try {
			response = await client.getAuthService().forgotPassword({ email: email });
			if (response.StatusCode === 200) {
				return {
					status: 'SUCCESS',
					message: 'Password reset request sent successfully. Please check your inbox.'
				};
			} else {
				return { status: 'ERROR', message: response.Result.Status };
			}
		} catch (ex) {
			console.log(ex);
			logger.log('Error','Forgot Password','Forgot Password Error : '+JSON.stringify(ex.body.Result?.ErrorMessage))
			return { status: 'ERROR', message: ex.body.Result?.ErrorMessage };
		}
	}
};
