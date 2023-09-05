declare global {
	namespace App {
		interface Locals {
			user: Data | null;
			product: Product | null;
		}

		interface Error {
			code: string;
			id: string;
		}

		// interface PageData {}
		// interface Platform {}
	}
}

type Data = {
	token: string;
	userId: number;
	farmId: string;
	name: string;
	username: string;
	email: string;
	password: string;
	confirm_password: string;
	image?: string;
	bio?: string;
};

type Farm = {
	farmId: number;
	name: string;
	location: string;
	description: string;
	userId: number;
}

type Product = {
	productId: number;
	name: string;
	price: number;
	quantity: number;
	unitType: string;
	description: string;
	city: string;
}

export {
	Data
};

declare interface Window {
	refreshPromise: Promise<Response> | null;
}
