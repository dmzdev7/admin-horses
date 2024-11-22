import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import SessionWrapper from "./hooks/useSessionExpiration";
import { AppProvider } from "./context/AppContext";

export const metadata = {
	title: "ADMIN - ACCDEC",
	description: "",
};

const plusJakartaSans = Plus_Jakarta_Sans({
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({ children }) {
	return (
		<SessionWrapper>
			<html lang="en">
				<body className={`${plusJakartaSans.className} antialiased`}>
					<AntdRegistry>
						<AppProvider>{children}</AppProvider>
					</AntdRegistry>
				</body>
			</html>
		</SessionWrapper>
	);
}
