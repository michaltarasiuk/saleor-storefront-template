export function toPathname(...segments: string[]) {
	return `/${segments.join("/")}`;
}

export function splitPathname(pathname: string): string[] {
	return pathname.match(/[^/]+/g) ?? [];
}
