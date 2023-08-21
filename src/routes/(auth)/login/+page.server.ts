import { env } from '$env/dynamic/private'
import { client } from '$lib/server/DF/sdk'
import Cookies from 'js-cookie';
export const actions = {
    submit: async ({ request, url, locals }) => {
        const data = await request.formData();
        const { username, password } = Object.fromEntries(data)
        let response = null
        try {
            response = await client.getAuthService().login({ username: username, password: password })
            if (response.StatusCode === 200) {
                
                return { 'status': 'SUCCESS', "response": response, message: "Login Successfull!" }
            }
            else {
                return { 'status': 'ERROR', message: response.Result?.Status }
            }
        } catch (ex) {
            return { 'status': 'ERROR', message: ex.body.Result?.ErrorMessage }
        }
    }
};