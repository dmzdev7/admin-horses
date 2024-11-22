import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

	const publicPaths = ["/"]; // Define las rutas públicas
	const url = req.nextUrl.pathname;

	// Permitir acceso a rutas públicas incluso si no hay token
	if (
		url.startsWith("/_next") ||
		url.startsWith("/static") ||
		url.startsWith("/api/auth") ||
		publicPaths.includes(url)
	) {
		return NextResponse.next();
	}

	// Si no hay token, redirigir al inicio de sesión
	if (!token) {
		const loginUrl = req.nextUrl.clone();
		loginUrl.pathname = "/"; // Redirigir al login
		return NextResponse.redirect(loginUrl);
	}

	// Si hay token, permitir acceso
	return NextResponse.next();
}

export const config = {
	matcher: ["/:path*"], // Aplica a todas las rutas
};
