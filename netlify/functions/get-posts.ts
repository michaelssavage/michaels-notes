import type { Handler } from "@netlify/functions";
import { getPostContent } from "../../src/lib/getPosts";

export const handler: Handler = async (event) => {
	try {
		if (event.httpMethod !== "GET") {
			return {
				statusCode: 405,
				body: JSON.stringify({ error: "Method not allowed" }),
			};
		}

		const category = event.queryStringParameters?.category;
		const slug = event.queryStringParameters?.slug;

		if (!category || !slug) {
			return {
				statusCode: 400,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					error: "Missing required parameters",
					required: ["category", "slug"],
				}),
			};
		}

		const post = await getPostContent(category, slug);

		return {
			statusCode: 200,
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(post),
		};
	} catch (error) {
		return {
			statusCode: 404,
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				error: error?.message ?? "Post not found",
				category: event.queryStringParameters?.category,
				slug: event.queryStringParameters?.slug,
			}),
		};
	}
};
