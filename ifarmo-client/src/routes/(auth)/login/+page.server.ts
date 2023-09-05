import { fail, type Actions, redirect } from '@sveltejs/kit';
import jwt from "jsonwebtoken";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TOKEN_SECRET } from "$env/static/private";
const API_ENDPOINT = "http://localhost:8000/api/auth";

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get("username") as string;
        const password = data.get("password") as string;
        const confirm_password = data.get("confirm_password") as string;

        console.log("Form Data:", {
            username,
            password,
            confirm_password,
        });

        if (!username || !password) {
            return fail(400, { usernamePasswordRequired: "Username and password are required." });
        }

        // if (password !== confirm_password) {
        //     return fail(400, { passwordMismatch: "Passwords do not match." });
        // }

        const response = await fetch(`${API_ENDPOINT}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ username, password }),
        });

        const res = await response.json();
        const userId = res.user.userId;
        const role = res.user.role;
        const payload = { userId, role };
        console.log('payload', payload)
        const token = jwt.sign(payload, TOKEN_SECRET);
        cookies.set('access-token', token, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60,
            secure: false,
        });
        throw redirect(303, '/');
    },
} satisfies Actions;