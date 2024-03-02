import "@/styles/globals.css";
import "@config/env_variables";
import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
