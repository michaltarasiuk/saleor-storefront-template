import { DEFAULT_CHANNEL } from "@/shared/consts/channel";
import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from "@/shared/consts/intl";
import { getIntlLocale } from "@/shared/tools/get_intl_locale";
import { splitPathname, toPathname } from "@/shared/tools/pathname";
import staticConfig from "@config/static_config.json";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import { A, pipe } from "@mobily/ts-belt";
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

function optionalGetIntlLocale(optionalTag: string | undefined) {
	if (!optionalTag) return null;
	return getIntlLocale(optionalTag);
}

function getLocale(languages: string[], requestedLocale?: string) {
	const finalLanguages = pipe(
		languages,
		(value) => {
			const localeBaseName = optionalGetIntlLocale(requestedLocale)?.baseName;

			if (localeBaseName) return A.prepend(value, localeBaseName);
			return value;
		},
		A.uniq,
	);

	let locale: string;
	try {
		locale = matchLocale(finalLanguages, AVAILABLE_LOCALES, DEFAULT_LOCALE);
	} catch {
		locale = DEFAULT_LOCALE;
	}
	return locale;
}

function findChannelBySlug(slug: string) {
	return staticConfig.channels.find((channel) => channel.slug === slug);
}

function findChannelByRegion(region: string) {
	return staticConfig.channels.find(
		({ defaultCountry }) => defaultCountry.code === region,
	);
}

function getChannel(locale: string, requestedChannel?: string) {
	if (requestedChannel) {
		const channel = findChannelBySlug(requestedChannel);
		if (channel) return channel.slug;
	}

	const region = getIntlLocale(locale)?.region;
	if (!region) return DEFAULT_CHANNEL;

	const channel = findChannelByRegion(region);
	return channel?.slug ?? DEFAULT_CHANNEL;
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

	return match<Record<keyof BaseSegments, string | null | undefined>>({
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
				locale: optionalGetIntlLocale(requestedLocale)?.baseName,
				channel: requestedChannel,
			},
			() => NextResponse.rewrite(url),
		)
		.otherwise(() => NextResponse.redirect(url));
}
