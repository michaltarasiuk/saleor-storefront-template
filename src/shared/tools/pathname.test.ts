import { describe, expect, test } from "vitest";
import { splitPathname, toPathname } from "./pathname";

describe("pathname", () => {
	test("to pathname", () => {
		expect(toPathname()).toBe("/");
		expect(toPathname("shop", "category")).toBe("/shop/category");
	});

	test("split pathname", () => {
		expect(splitPathname("/")).toEqual([]);
		expect(splitPathname("/shop/category")).toEqual(["shop", "category"]);
	});
});
