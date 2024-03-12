export function getIntlLocale(tag: string) {
	try {
		return new Intl.Locale(tag);
	} catch {
		return null;
	}
}
