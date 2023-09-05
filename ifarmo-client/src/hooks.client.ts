import type { HandleClientError } from '@sveltejs/kit';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const handleError: HandleClientError = ({ error, event }) => {
    console.log('This is coming from client handleError');
    console.log(error, event);
    return {
        message: 'An unexpected client error has occurred.',
        code: 'UNEXPECTED'
    };
};
