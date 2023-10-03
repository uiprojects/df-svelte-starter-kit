import { client } from '$lib/server/DF/sdk';
import { error } from '@sveltejs/kit';


export async function load({ url, fetch, params, locals }) {

    client.setAuthUser(locals.user)

    // client.getApplicationRoleService().setUserToken(locals.user.Token)
    let response = await client.getApplicationRoleService().isMenuAuthorized(url.pathname)
    if (!response.isAuthorized) {
        throw error(response.status, 'You are not allowed to access this page!!');
    }

    try {
        const response = await client.getApplicationRoleService().getAllAppMenus()
        if (typeof response == 'object') {
            const appMenus = response.map(x => ({
                AppMenuID: x.AppMenuID,
                AppMenuLabel: x.AppMenuLabel,
                ParenAppMenuID: x.ParentAppMenuID,
                AppMenuActionURL: x.AppMenuActionURL
            })
            )

            const childMenus = appMenus.filter(res => res.ParenAppMenuID != 0).map(x => ({
                AppMenuID: x.AppMenuID,
                AppMenuLabel: x.AppMenuLabel,
                ParentAppMenuID: x.ParenAppMenuID,
                AppMenuActionURL: x.AppMenuActionURL,
            }))

            // checking parent menu and adding child menu as object to it
            for (let i = 0; i < appMenus.length; i++) {
                let tempData = childMenus.filter(x => x.ParentAppMenuID == appMenus[i].AppMenuID)
                appMenus[i].childMenus = tempData
            }

            return { appMenus, user: locals.user }
        }
        return { appMenus: [], user: locals.user, error: response }
    }
    catch (error) {
        console.log(error)
        return { appMenus: [], user: locals.user, error: error }
    }
}