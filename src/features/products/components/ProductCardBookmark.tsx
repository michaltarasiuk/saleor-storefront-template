"use client";

import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import { Flex, IconButton } from "@radix-ui/themes";
import { useState } from "react";

export function ProductCardBookmark() {
	const [state, setState] = useState({
		sneakersBookmarked: false,
	});

	return (
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
	);
}
