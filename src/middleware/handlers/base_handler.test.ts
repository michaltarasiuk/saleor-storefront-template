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
	const mod = await importOriginal<typeof import("next/server")>();
	return {
		...mod,
		NextResponse: {
			rewrite: vi.fn((url: string | URL | NextURL) => url.toString()),
			redirect: vi.fn((url: string | URL | NextURL) => url.toString()),
		},
	};
});

declare const event: NextFetchEvent;

function createNextRequest(pathname = "/") {
	return new NextRequest(new URL(pathname, "http://localhost:3000"), {
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

		expect(NextResponse.redirect as Mock).toHaveBeenCalledOnce();
		expect(NextResponse.redirect as Mock).toReturnWith(
			"http://localhost:3000/en/default-channel",
		);
	});

	test("no redirect when base path is correct", async () => {
		const request = createNextRequest("/en/default-channel");
		await baseHandler(request, event);

		expect(NextResponse.redirect as Mock).not.toHaveBeenCalledOnce();
	});

	test(`redirect to "en" when locale is not supported`, async () => {
		const request = createNextRequest("/en-AU");
		await baseHandler(request, event);

		expect(NextResponse.redirect as Mock).toHaveBeenCalledOnce();
		expect(NextResponse.redirect as Mock).toReturnWith(
			"http://localhost:3000/en/default-channel",
		);
	});

	test(`redirect to "default-channel" when channel is not defined`, async () => {
		const request = createNextRequest("/en");
		await baseHandler(request, event);

		expect(NextResponse.redirect as Mock).toHaveBeenCalledOnce();
		expect(NextResponse.redirect as Mock).toReturnWith(
			"http://localhost:3000/en/default-channel",
		);
	});

	test(`redirect to "default-channel" when channel is not supported`, async () => {
		const request = createNextRequest("/en/channel-euro");
		await baseHandler(request, event);

		expect(NextResponse.redirect as Mock).toHaveBeenCalledOnce();
		expect(NextResponse.redirect as Mock).toReturnWith(
			"http://localhost:3000/en/default-channel",
		);
	});

	test("redirect to channel by locale region", async () => {
		const request = createNextRequest("/pl-PL");
		await baseHandler(request, event);

		expect(NextResponse.redirect as Mock).toHaveBeenCalledOnce();
		expect(NextResponse.redirect as Mock).toReturnWith(
			"http://localhost:3000/pl-PL/channel-pln",
		);
	});

	test("rewrite when locale has wrong format", async () => {
		const request = createNextRequest("/EN");
		await baseHandler(request, event);

		expect(NextResponse.redirect as Mock).toHaveBeenCalledOnce();
		expect(NextResponse.redirect as Mock).toReturnWith(
			"http://localhost:3000/en/default-channel",
		);
	});
});
