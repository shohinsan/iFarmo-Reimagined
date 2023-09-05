import {type Actions, redirect} from "@sveltejs/kit";

export const actions = {
    logout: async ({cookies}) => {
        cookies.delete('access-token', {path: '/'});
        throw redirect(303, '/');
    },
} satisfies Actions;

