import type { NextURL } from "next/dist/server/web/next-url";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { type Mock, afterEach, describe, expect, test, vi } from "vitest";
import { baseHandler } from "./base_handler";

vi.mock("@config/static_config.json", () => ({
	default: {
		channels: [
			{
				slug: "channel-pln",
				defaultCountry: {
					code: "PL",
				},
			},
			{
				slug: "default-channel",
				defaultCountry: {
					code: "US",
				},
			},
		],
	},
}));

vi.mock("next/server", async (importOriginal) => {
	const module = await importOriginal<typeof import("next/server")>();
	return {
		...module,
		NextResponse: {
			...module.NextResponse,
			rewrite: vi.fn(
				(_url: string | URL | NextURL) => new module.NextResponse(),
			),
			redirect: vi.fn(
				(_url: string | URL | NextURL) => new module.NextResponse(),
			),
		},
	};
});

// NextFetchEvent is not exported (https://github.com/vercel/next.js/blob/canary/packages/next/server.js)
declare const event: NextFetchEvent;

function createNextRequest(pathname = "/") {
	return new NextRequest(new URL(pathname, "https://example.com"), {
		headers: {
			"Accept-Language": "en-US,en;q=0.9",
		},
	});
}

describe("base handler", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	test("redirect to default base path", async () => {
		const request = createNextRequest();
		await baseHandler(request, event);

		expect(NextResponse.redirect).toHaveBeenCalledWith(
			new URL("https://example.com/en/default-channel"),
		);
	});

	test("no redirect when base path is correct", async () => {
		const request = createNextRequest("/en/default-channel");
		await baseHandler(request, event);

		expect(NextResponse.redirect).not.toHaveBeenCalledOnce();
	});

	test(`redirect to "en" when locale is not supported`, async () => {
		const request = createNextRequest("/en-AU");
		await baseHandler(request, event);

		expect(NextResponse.redirect as Mock).toHaveBeenCalledWith(
			new URL("https://example.com/en/default-channel"),
		);
	});

	test(`redirect to "default-channel" when channel is not defined`, async () => {
		const request = createNextRequest("/en");
		await baseHandler(request, event);

		expect(NextResponse.redirect as Mock).toHaveBeenCalledWith(
			new URL("https://example.com/en/default-channel"),
		);
	});

	test(`redirect to "default-channel" when channel is not supported`, async () => {
		const request = createNextRequest("/en/channel-euro");
		await baseHandler(request, event);

		expect(NextResponse.redirect as Mock).toHaveBeenCalledWith(
			new URL("https://example.com/en/default-channel"),
		);
	});

	test("redirect to channel by locale region", async () => {
		const request = createNextRequest("/pl-PL");
		await baseHandler(request, event);

		expect(NextResponse.redirect as Mock).toHaveBeenCalledWith(
			new URL("https://example.com/pl-PL/channel-pln"),
		);
	});

	test("rewrite when locale has wrong format", async () => {
		const request = createNextRequest("/EN/default-channel");
		await baseHandler(request, event);

		expect(NextResponse.rewrite as Mock).toHaveBeenCalledWith(
			new URL("https://example.com/en/default-channel"),
		);
	});
});
