import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { expect, test, vi } from "vitest";

import { middleware } from "./middleware";

// NextFetchEvent is not exported (https://github.com/vercel/next.js/blob/canary/packages/next/server.js)
declare const event: NextFetchEvent;

test("should invoke handlers until return", async () => {
	// Arrange
	const handlerWithResponse = vi.fn().mockReturnValue(new NextResponse());
	const handlers = [vi.fn(), handlerWithResponse, vi.fn()];

	const route = middleware()
		.use(...handlers)
		.return();

	// Act
	const requestInput = new URL("/", "http://n").toString();
	const request = new NextRequest(requestInput);

	await route(request, event);

	// Assert
	for (const [index, handler] of handlers.entries()) {
		// If handler is after `handlerWithResponse`
		if (index > handlers.indexOf(handlerWithResponse)) {
			expect(handler).not.toHaveBeenCalled();
		} else expect(handler).toHaveBeenCalled();
	}
});
