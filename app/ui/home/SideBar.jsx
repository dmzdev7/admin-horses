"use client";

import Image from "next/image";
import Link from "next/link";
import { PiSignOutBold } from "react-icons/pi";
import { LuUsers } from "react-icons/lu";
import { FaHorse } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import { useAppContext } from "@/app/context/AppContext";

export const SideBar = () => {
	const pathname = usePathname();
	const { handleSignOut } = useAppContext();

	return (
		<aside className="w-64 bg-white flex flex-col shadow-md border-r">
			<div className="flex items-center justify-center p-4 border-b">
				<Link href={"/"}>
					<Image
						src={"/imgs/logos/ACCDEC-logo.png"}
						alt="ACCDEC Logo"
						width={130}
						height={50}
						priority={true}
					/>
				</Link>
			</div>
			<nav className="mt-4 flex-grow">
				<div className="space-y-2 p-2">
					<Link
						href={"/dashboard"}
						className={`flex items-center gap-2 px-4 py-2 rounded-md ${
							pathname === "/dashboard"
								? "text-orange-500 bg-gray-100"
								: "text-gray-700 hover:bg-gray-100"
						}`}
					>
						<MdDashboard className="w-6 h-6" />
						Dashboard
					</Link>
					<Link
						href={"/usuarios"}
						className={`flex items-center gap-2 px-4 py-2 rounded-md ${
							pathname === "/usuarios"
								? "text-orange-500 bg-gray-100"
								: "text-gray-700 hover:bg-gray-100"
						}`}
					>
						<LuUsers className="w-6 h-6" />
						Usuarios
					</Link>
					<Link
						href={"/caballos"}
						className={`flex items-center gap-2 px-4 py-2 rounded-md ${
							pathname === "/caballos"
								? "text-orange-500 bg-gray-100"
								: "text-gray-700 hover:bg-gray-100"
						}`}
					>
						<FaHorse className="w-6 h-6" />
						Caballos
					</Link>
				</div>
			</nav>
			<div className="mt-auto p-4 border-t">
				<button
					className="w-full px-4 py-2 text-md text-white bg-[--primary-600] rounded-md hover:bg-[--primary-700] inline-flex items-center justify-center"
					onClick={async () => {
						await handleSignOut();
					}}
				>
					Cerrar sesión
					<PiSignOutBold className="w-5 h-5 ml-2" />
				</button>
			</div>
		</aside>
	);
};
