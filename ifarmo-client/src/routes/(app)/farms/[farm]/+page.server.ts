import type { PageServerLoad } from './$types';
import { error } from "@sveltejs/kit";

const SINGLE_FARM_API_ENDPOINT = "http://localhost:8000/api/farm";
export const load: PageServerLoad = async ({ fetch, params }) => {
    // -----------------------------------------------
    // Move the declaration of farmOwnerId here
    const farmOwnerId = params.farm;
    const farm_response = await fetch(`${SINGLE_FARM_API_ENDPOINT}/${farmOwnerId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    const farm = farm_response.ok && await farm_response.json();
    if (!farm) {
        throw error(404)
    }
    return {
        farm,
    };
};
