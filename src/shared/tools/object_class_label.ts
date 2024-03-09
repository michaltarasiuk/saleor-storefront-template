import type { UnknownRecord } from "type-fest";

function getObjectClassLabel(value: unknown): string {
	return Object.prototype.toString.call(value);
}

export function isObject(value: unknown): value is UnknownRecord {
	return getObjectClassLabel(value) === "[object Object]";
}
