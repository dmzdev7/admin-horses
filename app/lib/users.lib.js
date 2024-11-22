import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const public_url = process.env.NEXT_PUBLIC_API_URL;

export const verifySession = async () => {
	const session = await getServerSession(authOptions);

	return session;
};

export async function getUsers(page, limit, searchTerm = "", sort) {
	try {
		const token = await verifySession();
		// console.log(token, "token")

		const resp = await fetch(
			`${public_url}/users/byPage/${page}/${limit}?searchTerm=${encodeURIComponent(
				searchTerm
			)}&sort=${encodeURIComponent(sort)}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token.token}`,
				},
				cache: "no-store",
			}
		);
		// console.log(resp, "okk");

		const res = await resp.json();

		if (resp.ok && resp.status === 200) {
			return { res };
		} else {
			return {};
		}
	} catch (error) {
		console.log("error get usuarios");
		return { error: "errooooor" };
	}
}

export async function getHorses(page, limit, searchTerm = "", sort) {
	try {
		const token = await verifySession();
		// console.log(token, "token")

		const resp = await fetch(
			`${public_url}/horses/byPage/${page}/${limit}?searchTerm=${encodeURIComponent(
				searchTerm
			)}&sort=${encodeURIComponent(sort)}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token.token}`,
				},
				cache: "no-store",
			}
		);
		// console.log(resp, "okk");

		const res = await resp.json();

		if (resp.ok && resp.status === 200) {
			return { res };
		} else {
			return {};
		}
	} catch (error) {
		console.log("error get horses");
		return { error: "errooooor" };
	}
}

export async function editHorseById(data, token) {
	// console.log(data, "data");
	// console.log(token, "token");
	try {
		const resp = await fetch(`${public_url}/horses/updateById`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		});
		// console.log(resp, "okk");

		const res = await resp.json();
		// console.log(res, "res");

		if (resp.ok && resp.status === 200) {
			return { status: 200, res };
		} else {
			return { status: 404, res };
		}
	} catch (error) {
		console.log("error edit horses by id");
		return { error: "errooooor" };
	}
}

export async function setRelevantes(data, token) {
	try {
		const resp = await fetch(`${public_url}/horses/updateRelevanteById`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		});
		console.log(resp, "okk");

		const res = await resp.json();
		console.log(res, "res");

		if (resp.ok && resp.status === 200) {
			return { status: 200, res };
		} else {
			return { status: 404, res };
		}
	} catch (error) {
		console.log("error get usuarios");
		return { error: "errooooor" };
	}
}
