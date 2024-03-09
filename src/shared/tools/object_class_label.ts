function getObjectClassLabel(value: unknown): string {
	return Object.prototype.toString.call(value);
}

export function isObject(
	value: unknown,
): value is Record<PropertyKey, unknown> {
	return getObjectClassLabel(value) === "[object Object]";
}
