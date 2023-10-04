import {  renderLayout } from '$lib/server/DF/sdk';


export async function load({ url, fetch, params, locals }) {
    return await renderLayout(locals, url)
}