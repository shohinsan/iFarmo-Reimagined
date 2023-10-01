import {type Actions, redirect} from "@sveltejs/kit";

const API_ENDPOINT = "https://localhost:8443/api/user";

export const actions = {
    delete: async ({cookies, fetch}) => {
        const authToken = cookies.get('access-token');
        if (authToken) {
            const response = await fetch(`${API_ENDPOINT}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (response.ok) {
                cookies.delete('access-token', {path: '/'});
                throw redirect(303, '/');
            }
            console.log(response)
        }
    },
    update: async ({request, cookies, fetch}) => {
        const authToken = cookies.get('access-token');
        const data = await request.formData();
        const name = data.get('name') as string;
        const username = data.get('username') as string;
        const email = data.get('email') as string;
        const role = data.get('role') as string;

        const updateProfileData = {
           name, username, email, role
        };
        console.log(updateProfileData)
        if (authToken) {
            await fetch(`${API_ENDPOINT}/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(updateProfileData),
            });
        }
        throw redirect(303, '/settings');
    },
    change_password: async ({request, cookies, fetch}) => {
        const authToken = cookies.get('access-token');
        const data = await request.formData();
        const updatePasswordData = {
            current_password: data.get('current_password'),
            new_password: data.get('new_password'),
            confirm_new_password: data.get('confirm_new_password')
        };
        if (authToken) {
            await fetch(`${API_ENDPOINT}/change_password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(updatePasswordData),
            });
        }
        throw redirect(303, '/settings/password');
    },
} satisfies Actions;