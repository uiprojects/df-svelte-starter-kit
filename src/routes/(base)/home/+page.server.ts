import { env } from '$env/dynamic/private'
import { client } from '$lib/server/DF/sdk'
import { error } from '@sveltejs/kit'
export const load = async ({ url, params, request, route, fetch, locals }) => {
    client.setAuthUser(locals.user)
    let appMenus = await client.getApplicationRoleService().getAllAppMenus()
    let activeMenu = appMenus.find(x => x.AppMenuActionURL.includes(url.pathname))
    if (activeMenu) {
        return { message: 'starter kit' }
    }
    else {
        throw error(403, 'You are not allowed to access this page!!');
    }

}