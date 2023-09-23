import { type Actions, redirect } from "@sveltejs/kit";
import { TOKEN_SECRET } from "$env/static/private";
import { jwtVerify } from "jose";
const API_ENDPOINT = "http://172.30.0.2:8000/api/product";
export const actions: Actions = {
    create: async ({ request, cookies, fetch }) => {
        const authToken = cookies.get("access-token");
        if (!authToken) {
            throw redirect(303, "/login");
        }
        // @ts-ignore
        const tokenSecret = new TextEncoder().encode(process.env.TOKEN_SECRET);
        const decoded = await jwtVerify(authToken, tokenSecret);
        const data = await request.formData();
        const title = data.get("title") as string;
        const type = data.get("type") as string;
        const description = data.get("description") as string;
        const quantity = data.get("quantity") as string;
        const unitType = data.get("unitType") as string;
        const price = data.get("price") as string;
        const city = data.get("city") as string;
        const userId = decoded.payload.userId;
        const createProductData = {
            title, type, description, quantity, unitType, price, city, userId
        }
        if (authToken) {
            await fetch(`${API_ENDPOINT}/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(createProductData),
            });
        }
        throw redirect(303, "/products");
    },
} satisfies Actions;
