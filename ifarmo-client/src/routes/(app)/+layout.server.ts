import type {LayoutServerLoad} from './$types';
import {redirect} from "@sveltejs/kit";
const API_ENDPOINT = "http://localhost:8000/api/user";
export const load: LayoutServerLoad = async ({locals, fetch, parent}) => {
    await parent();
    const user = locals.user;
    // -----------------------------------------------
    const user_response = await fetch(`${API_ENDPOINT}/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    const credentials = user_response.ok && await user_response.json();
    // -----------------------------------------------
    // -----------------------------------------------
    redirect(302, '/');
    return {
        user,
        credentials,
    };
};

