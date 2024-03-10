import "@/styles/globals.css";
import "@config/env_variables";
import { Container, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en">
			<body>
				<Theme>
					<Container size="4">{children}</Container>
				</Theme>
			</body>
		</html>
	);
}
