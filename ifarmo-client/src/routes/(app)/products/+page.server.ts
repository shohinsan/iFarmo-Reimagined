import {type Actions, redirect} from "@sveltejs/kit";

const API_ENDPOINT = "http://localhost:8000/api/product";
export const actions = {
    create: async ({request, cookies, fetch}) => {
        const authToken = cookies.get('access-token');
        const data = await request.formData();
        const createProductData = {
            title: data.get('title'),
            type: data.get('type'),
            description: data.get('description'),
            quantity: data.get('quantity'),
            unitType: data.get('unitType'),
            price: data.get('price'),
            city: data.get('city'),
        };
        if (authToken) {
            await fetch(`${API_ENDPOINT}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(createProductData),
            });
        }
        console.log(createProductData);
        throw redirect(303, '/products');
    }
} satisfies Actions;