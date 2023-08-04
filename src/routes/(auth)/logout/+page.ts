import { goto } from "$app/navigation"
import Cookies from "js-cookie"
import type { PageLoadEvent } from "./$types"

export const prerender = false
export const ssr = false
export const csr = true

export const load = async (event: PageLoadEvent) => {
    Cookies.remove('df_user')
    Cookies.remove('token')
    goto('/login')
}