import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

export type Handler = (
	request: NextRequest,
	response: NextResponse,
	event: NextFetchEvent,
) => NextResponse | void | Promise<void>;

export function middleware() {
	const handlers: Handler[] = [];

	const returnFn =
		() => async (request: NextRequest, event: NextFetchEvent) => {
			const response = new NextResponse();

			for (const handler of handlers) {
				const result = await handler(request, response, event);

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
