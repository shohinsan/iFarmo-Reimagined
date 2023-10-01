import {fail, type Actions, redirect} from '@sveltejs/kit';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TOKEN_SECRET } from "$env/static/private";
const API_ENDPOINT = "https://localhost:8443/api/auth";

export const actions = {
    default: async ({ request,cookies }) => {
        const data = await request.formData();
        const name = data.get("name") as string;
        const username = data.get("username") as string;
        const email = data.get("email") as string;
        const password = data.get("password") as string;
        const confirm_password = data.get("confirm_password") as string;

        if (confirm_password !== password) {
            return fail(400, {passwordMismatch: true});
        }
        if (!email) {
            return fail(400, {emailMissing: true});
        }
        const response = await fetch(`${API_ENDPOINT}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                name, username, email, password, confirm_password,
            }),
        });
        await response.json();
        throw redirect(303, '/login');
    }
} satisfies Actions;