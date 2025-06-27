import { env } from '$env/dynamic/private';
import { client, logger } from '$lib/server/DF/sdk';
import { DiligenceFabricClient } from '@ubti/diligence-fabric-sdk';



export const load = async ({ cookies }) => {
	let authenticationTypeResponse
	try {
		const client = new DiligenceFabricClient();

		const AuthenticationTypeList = {
			AppID: Number(env.DF_APP_ID),
			TenantID: Number(env.DF_TENANT_ID),
			AppEnvironmentCODE: env.DF_AppEnvironmentCODE
		}

		authenticationTypeResponse = await client.getAuthenticationTypeService().getAuthenticationDownStreamType(AuthenticationTypeList);
	}
	catch (error) {
		logger.log('Error', 'Load', 'Error Retrieiving auht type' + JSON.stringify(error))
	}

	return {
		userNameCookie: cookies.get('df_ds_rem_user'),
		authenticationTypeResult: authenticationTypeResponse?.Result
	};
};

async function login(authenticationRequest: any) {

	let response = null;

	try {
		response = await client.getAuthService().login(authenticationRequest);

		if (env.DF_TENANT_ID == response.Result.TenantID) {

			if (response.StatusCode === 200) {

			
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

		logger.log('Error', 'Login', 'Login Response Error : ' + JSON.stringify(ex))

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

		if (authenticationRequest.rememberMe == 'on' && authenticationResponse.response?.StatusCode == 200) {

			cookies.set('df_ds_rem_user', username.toString(), {
				maxAge: 605800 // 60 * 60 * 24 * 7 - approx 1 week
			});
		}

		return authenticationResponse

	},
	microsoftLoginSubmit: async ({ request, cookies }) => {
		let authenticationResponse
		try {
			const data = await request.formData();

			const { microsoftUsername, microsoftToken, authenticationTypeCode } = Object.fromEntries(data);

			let authenticationRequest = {
				username: microsoftUsername,
				accessToken: microsoftToken,
				authenticationTypeCode: authenticationTypeCode
			}

			authenticationResponse = await login(authenticationRequest)
		}
		catch (error: any) {
			console.log('Error MSAL : ', error)
			logger.log('Error', 'MSAL Login Submit', 'MSAL Login Error Response : ' + JSON.stringify(error.body.Result?.ErrorMessage))
		}

		return authenticationResponse

	}

}




