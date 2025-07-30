import type { Handler } from "@netlify/functions";
import jwt from "jsonwebtoken";
import { Pool } from "pg";

interface JwtPayload extends jwt.JwtPayload {
	username: string;
}

const handler: Handler = async (event, _context) => {
	const authResult = isValidAuth(event.headers.authorization);
	if (!authResult.isValid) {
		return {
			statusCode: 401,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "Authorization, Content-Type",
				"Access-Control-Allow-Methods": "POST, OPTIONS",
			},
			body: JSON.stringify({ error: authResult.error }),
		};
	}

	if (!process.env.POSTGRES_CONNECTION_STRING) {
		throw new Error("POSTGRES_CONNECTION_STRING is not defined");
	}

	const pool = new Pool({
		connectionString: process.env.POSTGRES_CONNECTION_STRING,
		ssl: { rejectUnauthorized: false },
	});

	try {
		const client = await pool.connect();
		const result = await client.query(
			`SELECT id, title, year, status, image_url, link_url FROM movies_movie`,
		);
		client.release();

		return {
			statusCode: 200,
			body: JSON.stringify(result.rows),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({
				error: "Failed fetching movies",
				details: error instanceof Error ? error.message : error,
			}),
		};
	} finally {
		await pool.end();
	}
};

const isValidAuth = (authHeader?: string) => {
	if (!authHeader) {
		return { isValid: false, error: "Authorization header required" };
	}

	const tokenParts = authHeader.split(" ");
	if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
		return { isValid: false, error: "Invalid authorization header" };
	}

	const token = tokenParts[1];
	const secret = process.env.LETTERBOXD_JWT_SECRET;
	if (!secret) {
		throw new Error("Missing JWT secret");
	}

	try {
		const decoded = jwt.verify(token, secret) as JwtPayload;
		if (
			typeof decoded !== "object" ||
			!decoded ||
			decoded.username !== process.env.LETTERBOXD_USERNAME
		) {
			throw new Error("Invalid username");
		}
		return { isValid: true };
	} catch (error) {
		return { isValid: false, error };
	}
};

export { handler };
