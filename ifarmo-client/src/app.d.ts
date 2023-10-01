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

	declare  interface Document {
		startViewTransition(callback: () => void): void;
	}


}

type Data = {
	token: string;
	userId: number;
	farmId: string;
	name: string;
	username: string;
	email: string;
	role: string;
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
	title: string;
	type: string;
	username: string;
	image: string;
	price: number;
	role: string;
	createdAt: string;
	quantity: number;
	unitType: string;
	description: string;
	city: string;
}

export {
	Data, Product, Farm, Window, Document
};

declare interface Window {
	refreshPromise: Promise<Response> | null;
}

