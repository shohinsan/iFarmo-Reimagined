import jwt from "jsonwebtoken";
import {redirect, type HandleServerError} from '@sveltejs/kit';
import { prepareStylesSSR } from '@svelteuidev/core';
import type {JwtPayload} from "jsonwebtoken";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TOKEN_SECRET } from "$env/static/private";
import { sequence } from '@sveltejs/kit/hooks';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export async function handleCommunication({event, resolve}) {
    const authToken = event.cookies.get('access-token');
    // console.log('auth token in hooks', authToken)
    let data = null;
    if (authToken) {
        const decoded = jwt.verify(authToken, TOKEN_SECRET) as JwtPayload;
        // console.log('decoded in hooks', decoded)
        data = {
            userId: decoded.userId,
            role: decoded.role,
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