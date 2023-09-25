import type { PageServerLoad } from './$types';
import {error} from "@sveltejs/kit";

const PROFILE_API_ENDPOINT = "http://0.0.0.0:8000/api/user";
export const load: PageServerLoad = async ({ fetch, params }) => {
    // -----------------------------------------------
    const username = params.username;
    const profile_response = await fetch(`${PROFILE_API_ENDPOINT}/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    const profile = profile_response.ok && await profile_response.json();
    if (!profile) {
        throw error(404)
    }
    return {
        profile,
    };
};