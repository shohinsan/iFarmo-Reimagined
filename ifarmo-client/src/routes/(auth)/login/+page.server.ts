import { fail, type Actions, redirect } from '@sveltejs/kit';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TOKEN_SECRET } from "$env/static/private";
import {SignJWT} from "jose";
const API_ENDPOINT = "http://137.184.224.144:8000/api/auth";

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get("username") as string;
        const password = data.get("password") as string;
        const confirm_password = data.get("confirm_password") as string;

        if (!username || !password) {
            return fail(400, { usernamePasswordRequired: "Username and password are required." });
        }

        const response = await fetch(`${API_ENDPOINT}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ username, password }),
        });
        
        const res = await response.json();

        const tokenSecret = new TextEncoder().encode(process.env.TOKEN_SECRET);

        const token = await new SignJWT({
            userId: res.user.userId,
            username: res.user.username,
            role: res.user.role,
        })
            .setProtectedHeader({ alg: 'HS256', typ: 'JWE'})
            .setIssuedAt()
            .setExpirationTime('1w')
            .setJti('1a2b-3c4d-5e6f-7g8h')
            .setSubject('auth')
            .sign(tokenSecret);

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