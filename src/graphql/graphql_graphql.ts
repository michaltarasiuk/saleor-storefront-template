import { isRecord } from "@/shared/tools/object_class_label";
import { array, is, object, optional, string, unknown } from "valibot";
import type { TypedDocumentString } from "./generated/graphql";
import { GraphQLError } from "./graphql_error";

type FetchOptions = Omit<RequestInit, "method" | "body">;

const url = new URL("/graphql/", process.env.NEXT_PUBLIC_GRAPHQL_ORIGIN);
const mediaTypes = [
	["Content-Type", "application/json"],
	["Accept", "application/graphql-response+json"],
	["Accept", "application/json"],
] satisfies HeadersInit;

const RESULT_SCHEMA = object({
	data: unknown(),
	errors: optional(
		array(
			object({
				message: string(),
			}),
		),
	),
});

export async function fetchGraphQL<Data, Variables>(
	query: TypedDocumentString<Data, Variables>,
	variables: Variables,
	{ headers, ...fetchOptions }: FetchOptions = {},
) {
	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify({
			query,
			variables,
		}),
		headers: new Headers([
			...mediaTypes,
			...Object.entries(
				isRecord(headers) ? headers : Object.fromEntries(headers ?? []),
			),
		]),
		...fetchOptions,
	});
	const contentType = response.headers.get("Content-Type");

	if (
		(contentType === "application/json" && response.status === 200) ||
		(contentType === "application/graphql-response+json" && response.ok)
	) {
		const json = await response.json();

		if (is(RESULT_SCHEMA, json)) {
			const { data, errors } = json;

			return {
				data: data as Data,
				...(errors && { error: new GraphQLError(errors) }),
			};
		}
		throw new Error("Invalid content");
	}
	throw new Error("Invalid response");
}
