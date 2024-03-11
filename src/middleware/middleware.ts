import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

export type Handler = (
	request: NextRequest,
	event: NextFetchEvent,
) => NextResponse | void | Promise<void>;

export function middleware() {
	const handlers: Handler[] = [];

	const returnFn =
		() => async (request: NextRequest, event: NextFetchEvent) => {
			for (const handler of handlers) {
				const result = await handler(request, event);

				if (result) {
					return result;
				}
			}
		};

	const use = (handler: Handler) => {
		handlers.push(handler);

		return commonReturn;
	};

	const commonReturn = {
		return: returnFn,
		use,
	};
	return commonReturn;
}
