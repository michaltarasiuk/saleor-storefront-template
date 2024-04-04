import { describe, expect, test } from "vitest";
import { getObjectClassLabel, isObject } from "./object_class_label";

describe("object class label", () => {
	test("primitive types", () => {
		expect(getObjectClassLabel(undefined)).toBe("undefined");
		expect(getObjectClassLabel(null)).toBe("null");
		expect(getObjectClassLabel(false)).toBe("boolean");
		expect(getObjectClassLabel(0)).toBe("number");
		expect(getObjectClassLabel("")).toBe("string");
		expect(getObjectClassLabel(Symbol())).toBe("symbol");
	});

	test("objects", () => {
		expect(getObjectClassLabel({})).toBe("object");
		expect(getObjectClassLabel([])).toBe("array");
		expect(getObjectClassLabel(() => undefined)).toBe("function");
		expect(getObjectClassLabel(new Date())).toBe("date");
		expect(getObjectClassLabel(/(?:)/)).toBe("regexp");
		expect(getObjectClassLabel(new Error())).toBe("error");
		expect(getObjectClassLabel(new Map())).toBe("map");
		expect(getObjectClassLabel(new Set())).toBe("set");
		expect(getObjectClassLabel(Promise.resolve())).toBe("promise");
	});

	test("other types", () => {
		expect(getObjectClassLabel(BigInt(0))).toBe("bigint");
		expect(getObjectClassLabel(Buffer.alloc(0))).toBe("uint8array");
		expect(getObjectClassLabel(new Int8Array())).toBe("int8array");
		expect(getObjectClassLabel(new Uint8Array())).toBe("uint8array");
		expect(getObjectClassLabel(new Uint8ClampedArray())).toBe(
			"uint8clampedarray",
		);
		expect(getObjectClassLabel(new Int16Array())).toBe("int16array");
		expect(getObjectClassLabel(new Uint16Array())).toBe("uint16array");
		expect(getObjectClassLabel(new Int32Array())).toBe("int32array");
		expect(getObjectClassLabel(new Uint32Array())).toBe("uint32array");
		expect(getObjectClassLabel(new Float32Array())).toBe("float32array");
		expect(getObjectClassLabel(new Float64Array())).toBe("float64array");
	});

	test("is object", () => {
		expect(isObject({})).toBeTruthy();
		expect(isObject([])).toBeFalsy();
		expect(isObject(() => undefined)).toBeFalsy();
		expect(isObject(new Date())).toBeFalsy();
		expect(isObject(/(?:)/)).toBeFalsy();
		expect(isObject(new Error())).toBeFalsy();
		expect(isObject(new Map())).toBeFalsy();
		expect(isObject(new Set())).toBeFalsy();
		expect(isObject(Promise.resolve())).toBeFalsy();
	});
});
