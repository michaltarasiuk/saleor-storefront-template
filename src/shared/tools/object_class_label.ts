import type { UnknownRecord } from "type-fest";

export function getObjectClassLabel(value: unknown): string {
	return Object.prototype.toString
		.call(value)
		.replace(/^\[object (\S+)\]$/, "$1")
		.toLowerCase();
}

export function isRecord(value: unknown): value is UnknownRecord {
	return getObjectClassLabel(value) === "object";
}
