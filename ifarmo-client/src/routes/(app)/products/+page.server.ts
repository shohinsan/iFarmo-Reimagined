import { type Actions, redirect } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "$env/static/private";
import type { JwtPayload } from "jsonwebtoken";

const API_ENDPOINT = "http://localhost:8000/api/product";

export const actions: Actions = {
    create: async ({ request, cookies, fetch }) => {
        const authToken = cookies.get("access-token");

        const data = await request.json(); // Changed from formData to json
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const decoded = jwt.verify(authToken, TOKEN_SECRET) as JwtPayload; // Moved this line up
        const userId = decoded.userId;
        const createProductData = {
            title: data.title,
            type: data.type,
            description: data.description,
            quantity: data.quantity,
            unitType: data.unitType,
            price: data.price,
            city: data.city,
            userId: userId, // Moved userId assignment up
        };

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
};
