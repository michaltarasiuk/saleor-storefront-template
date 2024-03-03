import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";
import type { Handler } from "../middleware";

const DEFAULT_LOCALE = "en";
const AVAILABLE_LOCALES = [DEFAULT_LOCALE];

export const localeHandler: Handler = (request) => {
	const negotiator = new Negotiator({
		headers: Object.fromEntries(request.headers),
	});
	const segments: string[] = request.nextUrl.pathname.match(/[^/]+/g) ?? [];

	const requestedLocale = segments.at(0);
	const requestedLocaleBaseName = requestedLocale
		? getLocalBaseName(requestedLocale)
		: null;

	const languages = Array.from(negotiator.languages());
	if (requestedLocaleBaseName) languages.unshift(requestedLocaleBaseName);

	let locale: string;
	try {
		locale = match(languages, AVAILABLE_LOCALES, DEFAULT_LOCALE);
	} catch {
		locale = DEFAULT_LOCALE;
	}

	if (locale !== requestedLocale) {
		const pathname = [locale, ...segments.slice(1)].join("/");
		const url = new URL(pathname, request.url);

		if (locale !== requestedLocaleBaseName) return NextResponse.redirect(url);
		return NextResponse.rewrite(url);
	}
};

function getLocalBaseName(tag: string) {
	try {
		return new Intl.Locale(tag).baseName;
	} catch {
		return null;
	}
}
