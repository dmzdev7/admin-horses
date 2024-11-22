import { NavBar } from "../ui/home/NavBar";
import { SideBar } from "../ui/home/SideBar";
import { PiUserBold } from "react-icons/pi";

export default function Layout({ children }) {
	return (
		<div className="flex h-screen">
			<SideBar />
			<div className="flex-1 flex flex-col">
				<NavBar />
				<main className="p-6 bg-gray-50 flex-1 overflow-y-auto">
					{children}
				</main>
			</div>
		</div>
	);
}
