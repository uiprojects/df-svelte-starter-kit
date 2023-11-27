import { env } from '$env/dynamic/private';
import { client } from '$lib/server/DF/sdk';

export const load = async ({ cookies }) => {
	return { userNameCookie: cookies.get('df_ds_rem_user') };
};

export const actions = {
	submit: async ({ request, cookies }) => {
		const data = await request.formData();
		const { username, password, rememberMe } = Object.fromEntries(data);
		let response = null;
		try {
			response = await client.getAuthService().login({ username: username, password: password });
			if (env.DF_TENANT_ID == response.Result.TenantID) {
				if (response.StatusCode === 200) {
					if (rememberMe == 'on') {
						cookies.set('df_ds_rem_user', username.toString(), {
							maxAge: 605800 // 60 * 60 * 24 * 7 - approx 1 week
						});
					}
					return { status: 'SUCCESS', response: response, message: 'Login Successfull!' };
				} else {
					return { status: 'ERROR', message: response.Result?.Status };
				}
			} else {
				return {
					status: 'ERROR',
					message: `${username} is associated with different Tenant/Application.`
				};
			}
		} catch (ex) {
			return { status: 'ERROR', message: ex.body.Result?.ErrorMessage };
		}
	}
};
