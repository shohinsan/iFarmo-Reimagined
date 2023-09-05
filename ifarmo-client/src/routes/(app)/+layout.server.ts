import type {LayoutServerLoad} from './$types';
import {redirect} from "@sveltejs/kit";
const API_ENDPOINT = "http://localhost:8000/api/user";
const FARM_API_ENDPOINT = "http://localhost:8000/api/farm";
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
    const farmOwnerId = credentials.userId;
    const farm_response = await fetch(`${FARM_API_ENDPOINT}/${farmOwnerId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    const farm = farm_response.ok && await farm_response.json();
    // -----------------------------------------------
    redirect(302, '/');
    return {
        user,
        credentials,
        farm,
    };
};

