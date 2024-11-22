// app/api/auth/[...nextauth]/route.js
import { login } from "@/app/lib/auth.lib";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				usuario: { label: "usuario", type: "email" },
				password: { label: "password", type: "password" },
			},
			authorize: async (credentials) => {
				// console.log(credentials,"credd")
				const dataSend = {
					usuario: credentials.usuario,
					password: credentials.password,
				};

				const result = await login(dataSend);
				// console.log(result, "res-login-route");

				if (result?.status === 201) {
					return result;
				} else {
					throw new Error(result.message || "Autenticación fallida");
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 60 * 60 * 24 * 30, // 30 dias en seg
	},
	jwt: {
		maxAge: 60 * 60 * 24 * 30, // 30 dias en seg
	},
	callbacks: {
		async jwt({ token, user }) {
			// console.log(user)

			if (user) {
				token.token = user.token;
				token.id = user.data.id;
				token.nombre = user.data.nombre;
				token.email = user.data.email;
				token.tipo = user.data.tipo;
				token.acepto = user.data.acepto;
				token.estado = user.data.estado;
				token.role = user.data.role;
			}
			return token;
		},
		async session({ session, token }) {
			session.token = token.token;
			session.id = token.id;
			session.nombre = token.nombre;
			session.email = token.email;
			session.tipo = token.tipo;
			session.acepto = token.acepto;
			session.estado = token.estado;
			session.role = token.role;

			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
