"use client";

import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import {
	Box,
	Button,
	Card,
	Flex,
	Heading,
	IconButton,
	Link,
	Select,
	Separator,
	Text,
} from "@radix-ui/themes";
import { useState } from "react";

export function ProductCard() {
	const [state, setState] = useState({
		sneakersBookmarked: false,
	});

	return (
		<Card size="1">
			<Flex mb="2" position="relative">
				<img
					width="100%"
					height="270"
					src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=560&h=540&q=80"
					alt="product card alt"
				/>
				<Flex
					align="center"
					justify="center"
					position="absolute"
					bottom="0"
					right="0"
					width="6"
					height="6"
					m="2"
				>
					<IconButton
						size="2"
						tabIndex={-1}
						color="gray"
						variant="ghost"
						highContrast={state.sneakersBookmarked}
						onClick={() =>
							setState((currentState) => ({
								...currentState,
								sneakersBookmarked: !currentState.sneakersBookmarked,
							}))
						}
					>
						{state.sneakersBookmarked ? (
							<BookmarkFilledIcon width="16" height="16" />
						) : (
							<BookmarkIcon width="16" height="16" />
						)}
					</IconButton>
				</Flex>
			</Flex>
			<Flex align="end" justify="between" mb="2">
				<Box>
					<Flex mb="1">
						<Link size="2" color="gray" highContrast>
							Footwear
						</Link>
					</Flex>
					<Heading as="h3" size="3">
						Sneakers #12
					</Heading>
				</Box>
				<Text size="6" weight="bold">
					$149
				</Text>
			</Flex>
			<Text as="p" size="2" color="gray" mb="4">
				Love at the first sight for enthusiasts seeking a fresh and whimsical
				style.
			</Text>
			<Box style={{ marginTop: -1 }}>
				<Separator size="4" my="4" />
			</Box>
			<Flex gap="2" align="end">
				<Flex direction="column" grow="1">
					<Label asChild>
						<Text size="1" color="gray" mb="1">
							Color
						</Text>
					</Label>
					<Select.Root defaultValue="Pastel" size="2">
						<Select.Trigger tabIndex={-1} variant="soft" />
						<Select.Content variant="soft" position="popper">
							<Select.Item value="Pastel">Pastel</Select.Item>
							<Select.Item value="Bright">Bright</Select.Item>
						</Select.Content>
					</Select.Root>
				</Flex>
				<Flex direction="column" style={{ minWidth: 80 }}>
					<Label asChild>
						<Text size="1" color="gray" mb="1">
							Size
						</Text>
					</Label>
					<Select.Root defaultValue="8" size="2">
						<Select.Trigger tabIndex={-1} variant="soft" />
						<Select.Content variant="soft" position="popper">
							{Array.from({ length: 12 }, (_, i) => i).map((value) => (
								<Select.Item key={value} value={String(value * 0.5 + 5)}>
									{value * 0.5 + 5}
								</Select.Item>
							))}
						</Select.Content>
					</Select.Root>
				</Flex>
				<Button
					tabIndex={-1}
					size="2"
					variant="solid"
					color="gray"
					highContrast
				>
					Buy
				</Button>
			</Flex>
		</Card>
	);
}
