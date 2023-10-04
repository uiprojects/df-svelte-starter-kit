import { error } from '@sveltejs/kit';
import { DiligenceFabricClient } from '@ubti/diligence-fabric-sdk';


export const client = new DiligenceFabricClient();

export const renderLayout = async (locals: any, url: any)=>{
    client.setAuthUser(locals.user)

    let response = await client.getApplicationRoleService().isMenuAuthorized(url.pathname)
    if (!response.isAuthorized) {
        throw error(response.status, 'You are not allowed to access this page!!');
    }

    try {
        const response = await client.getApplicationRoleService().getAllAccessibleMenus()
        return { appMenus: response, user: locals.user, error: response }
    }
    catch (error) {
        console.log(error)
        return { appMenus: [], user: locals.user, error: error }
    }
}
