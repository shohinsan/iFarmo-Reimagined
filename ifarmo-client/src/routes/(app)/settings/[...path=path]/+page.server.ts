import {type Actions, redirect} from "@sveltejs/kit";

const API_ENDPOINT = "http://localhost:8000/api/user";

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
        }
    },
    update: async ({request, cookies, fetch}) => {
        const authToken = cookies.get('access-token');
        const data = await request.formData();
        const updateProfileData = {
            name: data.get('name'),
            username: data.get('username'),
            email: data.get('email'),
            role: data.get('role')
        };
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