import type { LayoutServerLoad } from './$types';
import { redirect } from "@sveltejs/kit";

const FARM_API_ENDPOINT = "https://localhost:8443/api/farm";

export const load: LayoutServerLoad = async ({ fetch, parent }) => {
    await parent()
    const farm_response = await fetch(`${FARM_API_ENDPOINT}/farms`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    const farm = farm_response.ok && await farm_response.json();
    return {
        farm,
    };
};
