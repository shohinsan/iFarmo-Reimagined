import {type Actions, redirect} from "@sveltejs/kit";


const USER_API_ENDPOINT = "http://localhost:8000/api/user";

export const actions = {
    change_password: async ({request, cookies, fetch}) => {
        const authToken = cookies.get('access-token');
        const data = await request.formData();
        const updatePasswordData = {
            password: data.get('password'),
            new_password: data.get('new_password'),
            confirm_new_password: data.get('confirm_new_password')
        };
        if (authToken) {
            await fetch(`${USER_API_ENDPOINT}/change_password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(updatePasswordData),
            });
            console.log("Password changed");
        }
        throw redirect(303, '/settings/password');
    },
} satisfies Actions;

