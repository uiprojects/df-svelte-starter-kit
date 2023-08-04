import type { UserInfo } from "@ubti/diligence-fabric-sdk/build/main/types/user/user-info.js";

export const load = async ({ url, params, request, route, fetch, locals }) => {

    const userCookie = locals.token

    if (userCookie) {
        const user: UserInfo = locals.user
        return { user }
    }
}