import { DEFAULT_CHANNEL } from "@/shared/consts/channel";
import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from "@/shared/consts/intl";
import { getLocaleOrNull } from "@/shared/tools/get_locale_or_null";
import { splitPathname, toPathname } from "@/shared/tools/pathname";
import { uniq } from "@/shared/tools/uniq";
import staticConfig from "@config/static_config.json";
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

function getLocale([...languages]: string[], requestedLocale?: string) {
	if (requestedLocale) {
		const locale = getLocaleOrNull(requestedLocale);
		if (locale) languages.unshift(locale.baseName);
	}

	let locale: string;
	try {
		locale = matchLocale(uniq(languages), AVAILABLE_LOCALES, DEFAULT_LOCALE);
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

	const region = getLocaleOrNull(locale)?.region;
	if (!region) return DEFAULT_CHANNEL;

	const channel = findChannelByRegion(region);
	return channel?.slug ?? DEFAULT_CHANNEL;
}

function getResponse(
	request: NextRequest,
	{ locale, channel }: { locale: string; channel: string },
) {
	const [requestedLocale, requestedChannel, ...segments] = splitPathname(
		request.nextUrl.pathname,
	);
	const url = new URL(toPathname(locale, channel, ...segments), request.url);

	return match({
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
				locale: (() => {
					if (requestedLocale) {
						return getLocaleOrNull(requestedLocale)?.baseName;
					}
					return undefined;
				})(),
				channel: requestedChannel,
			},
			() => NextResponse.rewrite(url),
		)
		.otherwise(() => NextResponse.redirect(url));
}
