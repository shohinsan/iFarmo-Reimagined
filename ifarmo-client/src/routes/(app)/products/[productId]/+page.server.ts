import {type Actions, redirect} from "@sveltejs/kit";

const API_ENDPOINT = "http://localhost:8000/api/product";

export const actions = {
    delete: async ({cookies, fetch, params}) => {
        const authToken = cookies.get('access-token');
        if (authToken) {
            const productId = params.productId;
            const response = await fetch(`${API_ENDPOINT}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({productId}),
            });
        }
        throw redirect(303, `/products`);
    },
    update: async ({request, cookies, fetch, params}) => {
        const authToken = cookies.get('access-token');
        const data = await request.formData();
        const productId = params.productId;
        const updateProfileData = {
            productId: productId,
            title: data.get('title'),
            type: data.get('type'),
            description: data.get('description'),
            quantity: data.get('quantity'),
            unitType: data.get('unitType'),
            price: data.get('price'),
            city: data.get('city'),
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
        throw redirect(303, `/products/${productId}`);
    },
    // pushNotify: async ({cookies, fetch, params}) => {
    //     const authToken = cookies.get('access-token');
    //     const productId = params.productId;
    //     if (authToken) {
    //         const productId = params.productId;
    //         const response = await fetch(`${API_ENDPOINT}/push-notify`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             credentials: 'include',
    //             body: JSON.stringify({productId}),
    //         });
    //     }
    //     throw redirect(303, `/products/${productId}`);
    // }
} satisfies Actions;