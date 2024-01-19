import { env } from '$env/dynamic/private';
import { client } from '$lib/server/DF/sdk';
import { DiligenceFabricClient } from '@ubti/diligence-fabric-sdk';



export const load = async ({ cookies }) => {
	const client = new DiligenceFabricClient();

	const AuthenticationTypeList = {
		TenantID: undefined,
		AuthenticationTypeCode: 'MS',
		CalledBy: undefined
	}

	let authenticationTypeResponse = await client.getAuthenticationTypeService().getAuthenticationType(AuthenticationTypeList)

	return {
		userNameCookie: cookies.get('df_ds_rem_user'),
		authenticationTypeResult: authenticationTypeResponse.Result
	};
};


async function login(authenticationRequest: any) {

	let response = null;

	try {
		response = await client.getAuthService().login(authenticationRequest);

		if (env.DF_TENANT_ID == response.Result.TenantID) {

			if (response.StatusCode === 200) {

				if (authenticationRequest.rememberMe == 'on') {

					cookies.set('df_ds_rem_user', authenticationRequest.username, {
						maxAge: 605800 // 60 * 60 * 24 * 7 - approx 1 week
					});
				}
				return { status: 'SUCCESS', response: response, message: 'Login Successfull!' };
			}
			else {
				return { status: 'ERROR', message: response.Result?.Status };
			}
		}
		else {
			return {
				status: 'ERROR',
				message: `${authenticationRequest.username} is associated with different Tenant/Application.`
			};
		}
	}
	catch (ex: any) {
		return { status: 'ERROR', message: ex.body.Result?.ErrorMessage };
	}
}

export const actions = {
	submit: async ({ request, cookies }) => {
		const data = await request.formData();
		const { username, password, rememberMe } = Object.fromEntries(data);

		let authenticationRequest = {
			username: username,
			password: password,
			rememberMe: rememberMe,
			authenticationTypeCode: 'FORM'
		}

		const authenticationResponse = await login(authenticationRequest)

		return authenticationResponse

	},
	microsoftLoginSubmit: async ({ request, cookies }) => {
		const data = await request.formData();

		const { microsoftUsername, microsoftToken, authenticationTypeCode } = Object.fromEntries(data);

		let authenticationRequest = {
			username: microsoftUsername,
			accessToken: microsoftToken,
			authenticationTypeCode: authenticationTypeCode
		}

		const authenticationResponse = await login(authenticationRequest)

		return authenticationResponse

	}

}




