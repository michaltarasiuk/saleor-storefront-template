"use client";

import { Label } from "@radix-ui/react-label";
import {
	Button,
	Flex,
	SelectContent,
	SelectItem,
	SelectRoot,
	SelectTrigger,
	Text,
} from "@radix-ui/themes";

export function ProductCardQuickBuy() {
	return (
		<Flex gap="2" align="end">
			<Flex direction="column" grow="1">
				<Label asChild>
					<Text size="1" color="gray" mb="1">
						Color
					</Text>
				</Label>
				<SelectRoot defaultValue="Pastel" size="2">
					<SelectTrigger tabIndex={-1} variant="soft" />
					<SelectContent variant="soft" position="popper">
						<SelectItem value="Pastel">Pastel</SelectItem>
						<SelectItem value="Bright">Bright</SelectItem>
					</SelectContent>
				</SelectRoot>
			</Flex>
			<Flex direction="column" style={{ minWidth: 80 }}>
				<Label asChild>
					<Text size="1" color="gray" mb="1">
						Size
					</Text>
				</Label>
				<SelectRoot defaultValue="8" size="2">
					<SelectTrigger tabIndex={-1} variant="soft" />
					<SelectContent variant="soft" position="popper">
						{Array.from({ length: 12 }, (_, i) => i).map((value) => (
							<SelectItem key={value} value={String(value * 0.5 + 5)}>
								{value * 0.5 + 5}
							</SelectItem>
						))}
					</SelectContent>
				</SelectRoot>
			</Flex>
			<Button tabIndex={-1} size="2" variant="solid" color="gray" highContrast>
				Buy
			</Button>
		</Flex>
	);
}
