import { describe, expect, test } from "vitest";
import { isDefined } from "./is_defined";

describe("is defined", () => {
	test("returns true when value is defined", () => {
		expect(isDefined({})).toBeTruthy();
		expect(isDefined([])).toBeTruthy();
		expect(isDefined("")).toBeTruthy();
		expect(isDefined(0)).toBeTruthy();
		expect(isDefined(false)).toBeTruthy();
		expect(isDefined(true)).toBeTruthy();
		expect(isDefined(() => undefined)).toBeTruthy(); //
	});

	test("returns false when value is not defined", () => {
		expect(isDefined(null)).toBeFalsy();
		expect(isDefined(undefined)).toBeFalsy();
	});
});
