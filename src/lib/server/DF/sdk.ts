import { error } from '@sveltejs/kit';
import { DiligenceFabricClient } from '@ubti/diligence-fabric-sdk';

export const client = new DiligenceFabricClient();

export const renderLayout = async (locals: any, url: any) => {
	client.setAuthUser(locals.user);

	let authzResponse = await client.getApplicationRoleService().isMenuAuthorized(url.pathname);
	if (!authzResponse.isAuthorized && !authzResponse.empty) {
		throw error(authzResponse.status, 'You are not allowed to access this page!!');
	}

	try {
		const response = await client.getApplicationRoleService().getAllAccessibleMenus();
		let dataReturn = { appMenus: response, user: locals.user };
		if (authzResponse.empty) {
			dataReturn.error = authzResponse.message;
		}
		return dataReturn;
	} catch (error) {
		console.log(error);
		return { appMenus: [], user: locals.user, error: error };
	}
};
