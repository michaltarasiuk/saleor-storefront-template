export function getLocalBaseName(tag: string) {
	try {
		return new Intl.Locale(tag).baseName;
	} catch {
		return null;
	}
}
