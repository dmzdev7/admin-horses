"use client";

import { createContext, useState, useContext, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { notification } from "antd";
import { getSesionEstatado } from "../lib/auth.lib";
const AppContext = createContext();

// import useSessionExpiration from "../hooks/useSessionEExpiration";
export const AppProvider = ({ children }) => {
	const pathname = usePathname();
	const [searchTerm, setSearchTerm] = useState("");

	const handleSignOut = async () => {
		setLoading(false); // Activar estado de carga al cerrar sesión
		await signOut({ redirect: false });

		notification.warning({
			message: "Sesión Finalizada",
		});

		router.push("/");

		router.refresh();
		localStorage.clear();
	};

	const router = useRouter();

	const [token, setToken] = useState("");
	const [loading, setLoading] = useState(true); // Estado de carga

	const { data: session, status } = useSession();

	const check = async (token) => {
		if (token) {
			const res = await getSesionEstatado(token);
			// console.log(res, "!%%%%%");

			if (res.status === 401 || res.status === 403) {
				notification.warning({
					message: "Sesión Finalizada",
					description: "su sesión ha expirado",
				});
				await handleSignOut();
			}
		}
	};

	useEffect(() => {
		if (status === "loading") {
			setLoading(true); // Los datos de la sesión están cargando
		} else {
			if (session) {
				setToken(session.token);
			} else {
			}
			setLoading(false); // Los datos de la sesión se han cargado
		}
	}, [session, status]);

	useEffect(() => {
		if (session && router) {
			check(session.token);
		}
	}, [session, pathname]);

	return (
		<AppContext.Provider
			value={{
				handleSignOut,
				token,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);
