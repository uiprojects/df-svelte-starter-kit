import { client } from '$lib/server/DF/sdk';
export const actions = {
	submit: async ({ request, locals }) => {
		const data = await request.formData();
		const { oldpassword, newpassword } = Object.fromEntries(data);
		client.setAuthUser(locals.user);
		let response = null;
		try {
			response = await client
				.getAuthService()
				.changePassword({ oldPassword: oldpassword, isResetPassword: 1, dfUPassword: newpassword });
			if (response.StatusCode === 200) {
				return { status: 'SUCCESS', message: response.Result.Status };
			} else {
				return { status: 'ERROR', message: response.Result.Status };
			}
		} catch (ex) {
			return { status: 'ERROR', message: ex.body.Result?.ErrorMessage };
		}
	}
};
