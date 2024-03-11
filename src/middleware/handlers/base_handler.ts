import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from "@/intl/consts";
import { getLocalBaseName } from "@/intl/tools/get_local_base_name";
import { splitPathname, toPathname } from "@/shared/tools/pathname";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import { match } from "ts-pattern";
import type { Handler } from "../middleware";

export const baseHandler: Handler = (request) => {
	const negotiator = new Negotiator({
		headers: Object.fromEntries(request.headers),
	});
	const [requestedLocale, requestedChannel] = splitPathname(
		request.nextUrl.pathname,
	);

	const locale = getLocale(negotiator.languages(), requestedLocale);
	const channel = getChannel(locale, requestedChannel);

	return getResponse(request, { locale, channel });
};

function getLocale([...languages]: string[], requestedLocale: string) {
	const requestedLocaleBaseName = getLocalBaseName(requestedLocale);
	if (requestedLocaleBaseName) languages.unshift(requestedLocaleBaseName);

	let locale: string;
	try {
		locale = matchLocale(languages, AVAILABLE_LOCALES, DEFAULT_LOCALE);
	} catch {
		locale = DEFAULT_LOCALE;
	}
	return locale;
}

function getChannel(_locale: string, _requestedChannel: string) {
	return "channel-pln";
}

type BaseSegments = { locale: string; channel: string };

function getResponse(
	request: NextRequest,
	{ locale, channel }: { locale: string; channel: string },
) {
	const [requestedLocale, requestedChannel, ...segments] = splitPathname(
		request.nextUrl.pathname,
	);

	const pathname = toPathname(locale, channel, ...segments);
	const url = new URL(pathname, request.url);

	return match<BaseSegments | Record<keyof BaseSegments, null>>({
		locale,
		channel,
	})
		.with(
			{
				locale: requestedLocale,
				channel: requestedChannel,
			},
			() => undefined,
		)
		.with(
			{
				locale: getLocalBaseName(requestedLocale),
				channel: requestedChannel,
			},
			() => NextResponse.rewrite(url),
		)
		.otherwise(() => NextResponse.redirect(url));
}
