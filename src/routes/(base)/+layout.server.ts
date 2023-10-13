import { renderLayout } from '$lib/server/DF/sdk';
import { error } from '@sveltejs/kit';


export async function load({ url, fetch, params, locals }) {
    let response = await renderLayout(locals, url)
    if (response.error.status != 200) {
        throw error(400, response.error)
    }
    return response
}