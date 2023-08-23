import { client } from '$lib/server/DF/sdk'
import { error } from '@sveltejs/kit'
export const load = async ({ url, params, request, route, fetch, locals }) => {
    client.setAuthUser(locals.user)
    let response = await client.getApplicationRoleService().isMenuAuthorized(url.pathname)
    if (response.isAuthorized) {
        return { message: 'starter kit' }
    }
    else {
        throw error(response.status, 'You are not allowed to access this page!!');
    }
}