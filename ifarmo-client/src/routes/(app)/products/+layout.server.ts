import type {LayoutServerLoad} from './$types';

const PRODUCTS_API_ENDPOINT = "https://localhost:8443/api/product";

interface Product {
    productId: number;
    title: string;
    type: string;
    role: string;
    description: string;
    city: string;
    maxPrice: number;
    username: number;
    quantity: number;
    unitType: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    userId: number;
    user: {
        userId: number;
    }
}

export const load: LayoutServerLoad = async ({fetch, url}) => {
    const controller = new AbortController();
    const signal = controller.signal;
    const products_response = await fetch(`${PRODUCTS_API_ENDPOINT}/products`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        signal,
    });
    const products = products_response.ok && await products_response.json();
    controller.abort();
    const promise = products.map(async (product: Product) => {
        const productId = product.productId;
        const single_product_response = await fetch(`${PRODUCTS_API_ENDPOINT}/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        return single_product_response.json();
    });
    const details = await Promise.all(promise);

    let searchResults: Product[] = [];
    const searchQueryParam = url.searchParams.get('search');
    if (searchQueryParam !== null) {
        const query = searchQueryParam.toLowerCase();
        searchResults = products.filter((product: { title: string; }) =>
            product.title.toLowerCase().includes(query)
        );
    }

    let filterResults: Product[] = [];
    const filterQueryParam = url.searchParams.get('filter');
    if (filterQueryParam !== null) {
        const query = filterQueryParam.toLowerCase();

        const tags = filterQueryParam.split(',').map(tag => tag.trim());

        const typeFilteredProducts = products.filter((product: {
            type: string;
        }) => tags.includes(product.type.toLowerCase()));

        const cityFilteredProducts = products.filter((product: {
            city: string;
        }) => product.city.toLowerCase().includes(query));

        const maxPriceFilteredProducts = products.filter((product: {
            maxPrice: number;
        }) => product.maxPrice !== undefined && product.maxPrice <= parseFloat(query));

        filterResults = [...typeFilteredProducts, ...cityFilteredProducts, ...maxPriceFilteredProducts];

        // console.log("filter result", JSON.stringify(filterResults, null, 2));
        // for (const product of filterResults) {
        //     console.log("Product Type:", product.type);
        //     console.log("Product City:", product.city);
        //     console.log("Product Max Price:", product.maxPrice);
        // }
    }

    return {
        products: details,
        search: searchResults,
        filter: filterResults,
    };
};