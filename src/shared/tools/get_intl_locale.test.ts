import { describe, expect, test } from "vitest";
import { getIntlLocale } from "./get_intl_locale";

describe("get intl locale", () => {
	test("returns Locale object when locale is correct", () => {
		expect(getIntlLocale("en")).instanceof(Intl.Locale);
		expect(getIntlLocale("en-US")).instanceof(Intl.Locale);
		expect(getIntlLocale("en-AU")).instanceof(Intl.Locale);
	});

	test("returns null when locale is incorrect", () => {
		expect(getIntlLocale("en_US")).toBe(null);
		expect(getIntlLocale("en_AU")).toBe(null);
	});
});
