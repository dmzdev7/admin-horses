const public_url = process.env.NEXT_PUBLIC_API_URL;

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const isLogin = async () => {
	const session = await getServerSession(authOptions);

	return session;
};

export async function login(dataLogin) {
	try {
		const resp = await fetch(`${public_url}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify(dataLogin),
		});
		// console.log(resp.status, "okk");

		// if (resp.ok && resp.status === 200) {
		const res = await resp.json();
		// console.log(res, "res-login-data");

		return res;
	} catch (error) {
		console.log("error api login");
		return { error: "errooooor" };
	}
}

export async function getSesionEstatado(token) {
	try {
		const resp = await fetch(`${public_url}/auth/estado`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			cache: "no-store",
			body: JSON.stringify({}),
		});

		const dataResp = await resp.json();

		if (resp.ok && resp.status === 200) {
			return { data: dataResp, status: 200 };
		} else {
			return {
				data: dataResp,
				status: resp.status,
			};
		}
	} catch (error) {
		console.log("error sesion-backend");
		return {
			status: 400,
		};
	}
}
