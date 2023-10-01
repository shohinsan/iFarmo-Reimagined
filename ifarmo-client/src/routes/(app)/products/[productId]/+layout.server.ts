import type {LayoutServerLoad} from './$types';

const PRODUCTS_API_ENDPOINT = "https://localhost:8443/api/product";

export const load: LayoutServerLoad = async ({fetch, params}) => {
    const productId = params.productId;
    const products_response = await fetch(`${PRODUCTS_API_ENDPOINT}/${productId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    const single_product = products_response.ok && await products_response.json();
    return {
        single_product,
    };
};
