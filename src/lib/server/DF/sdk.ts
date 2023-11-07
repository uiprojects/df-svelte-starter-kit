import { DiligenceFabricClient } from '@ubti/diligence-fabric-sdk';

export const client = new DiligenceFabricClient();

export const renderLayout = async (locals: any, url: any) => {
	client.setAuthUser(locals.user);

	try {
		const response = await client.getApplicationRoleService().getAllAccessibleMenus();
		if (typeof response == 'object') {
			const authzResponse = await client.getApplicationRoleService().isMenuAuthorized(url.pathname);
			if (!authzResponse.isAuthorized) {
				return {
					appMenus: response,
					user: locals.user,
					error: {
						status: 403,
						message: "You are not allowed to access this page or the menu doesn't exist!!"
					}
				};
			}
			return { appMenus: response, user: locals.user, error: { status: 200 } };
		} else {
			return { appMenus: response, user: locals.user, error: { status: 403, message: response } };
		}
	} catch (error) {
		console.log(error);
		return { appMenus: [], user: locals.user, error: error };
	}
};
