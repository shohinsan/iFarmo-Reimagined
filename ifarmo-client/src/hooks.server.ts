import jwt from "jsonwebtoken";
import {redirect, type HandleServerError} from '@sveltejs/kit';
import { prepareStylesSSR } from '@svelteuidev/core';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TOKEN_SECRET } from "$env/static/private";
import { sequence } from '@sveltejs/kit/hooks';
import {jwtVerify} from "jose";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export async function handleCommunication({event, resolve}) {
    const authToken = event.cookies.get('access-token');
    // console.log('auth token in hooks', authToken)
    let data = null;
    if (authToken) {
        const tokenSecret = new TextEncoder().encode(process.env.TOKEN_SECRET);

        const decoded = await jwtVerify(
            authToken, tokenSecret
        );
        const userId = decoded.payload.userId
        const role = decoded.payload.role
        data = {
            userId: userId,
            role: role,
        };
        // console.log('data in hooks', data)
        if (!['/', '/login', '/register'].includes(event.path) && !data) {
            return redirect(302, '/');
        }
    }
    event.locals.user = data;
    return await resolve(event);
}

export const handle = sequence(handleCommunication, prepareStylesSSR);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const handleError: HandleServerError = ({ error, event }) => {
    console.log('This is coming from server handleError.');
    console.log(error, event);
    return {
        message: 'An unexpected server error has occurred.',
        code: 'UNEXPECTED'
    };
};