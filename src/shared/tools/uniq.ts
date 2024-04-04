export function uniq<Item>(arr: readonly Item[]) {
	return Array.from(new Set(arr));
}
