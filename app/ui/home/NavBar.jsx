"use client";
import { PiUserBold } from "react-icons/pi";
import { usePathname } from "next/navigation";

export const NavBar = () => {
	const pathname = usePathname();

	// Define un mapeo para los textos según el pathname
	const pageTitles = {
		"/": "Tu Inventario",
		"/usuarios": "Lista de Usuarios",
		"/productos": "Lista de Productos",
		// Agrega más rutas según sea necesario
	};

	// Obtiene el título según el pathname o usa un valor por defecto
	const currentTitle = pageTitles[pathname] || "Tu Inventario";

	return (
		<header className="sticky flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b">
			<h2 className="text-lg font-semibold">{currentTitle}</h2>

			<div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full flex items-center justify-center">
				<PiUserBold className="w-6 h-6" />
			</div>
		</header>
	);
};
