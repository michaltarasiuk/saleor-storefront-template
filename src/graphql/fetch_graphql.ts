import { isObject } from "@/shared/tools/object_class_label";
import * as GraphQLWeb from "@0no-co/graphql.web";
import type { SetRequired } from "type-fest";
import { array, object, optional, parse, string, unknown } from "valibot";
import type { TypedDocumentString } from "./generated/graphql";

const applicationMediaTypes = {
	json: "application/json",
	graphqlJson: "application/graphql-response+json",
};
const mediaTypes = [
	["Content-Type", applicationMediaTypes.json],
	["Accept", applicationMediaTypes.json],
	["Accept", applicationMediaTypes.graphqlJson],
] satisfies HeadersInit;

const JSON_SCHEMA = object({
	data: unknown(),
	errors: optional(
		array(
			object({
				message: string(),
			}),
		),
	),
});

type FetchGraphQLOptions = Omit<RequestInit, "method" | "body">;

export async function fetchGraphQL<Data, Variables>(
	query: TypedDocumentString<Data, Variables>,
	variables: Variables,
	{ headers: headers_, ...fetchOptions }: FetchGraphQLOptions = {},
) {
	const url = new URL("/graphql/", process.env.NEXT_PUBLIC_GRAPHQL_ORIGIN);
	const headers = new Headers([
		...mediaTypes,
		...Object.entries(
			isObject(headers_) ? headers_ : Object.fromEntries(headers_ ?? []),
		),
	]);

	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify({
			query,
			variables,
		}),
		headers,
		...fetchOptions,
	});
	validateResponse(response);

	const json = await response.json();
	const { data, errors } = parse(JSON_SCHEMA, json);

	return {
		data: data as Data,
		...(errors && { error: new GraphQLError(errors) }),
	};
}

function validateResponse(response: Response) {
	const contentType = response.headers.get("Content-Type");
	const isSuccessResponse =
		(contentType === applicationMediaTypes.json && response.status === 200) ||
		(contentType === applicationMediaTypes.graphqlJson && response.ok);

	if (!isSuccessResponse) {
		throw new Error("Invalid response");
	}
}

type GraphQLWebError = SetRequired<Partial<GraphQLWeb.GraphQLError>, "message">;

class GraphQLError extends Error {
	override name: string;
	override message: string;
	public graphQLErrors: GraphQLWeb.GraphQLError[];

	constructor(graphQLWebErrors: GraphQLWebError[]) {
		const normalizedGraphQLErrors = graphQLWebErrors.map(
			rehydrateGraphQLWebError,
		);
		const message = generateErrorMessage(normalizedGraphQLErrors);

		super(message);

		this.name = "GraphQLError";
		this.message = message;
		this.graphQLErrors = normalizedGraphQLErrors;
	}

	override toString() {
		return this.message;
	}
}

function rehydrateGraphQLWebError({
	message,
	nodes,
	source,
	positions,
	path,
	originalError,
	extensions,
}: GraphQLWebError) {
	return new GraphQLWeb.GraphQLError(
		message,
		nodes,
		source,
		positions,
		path,
		originalError,
		extensions,
	);
}

function generateErrorMessage(errors: GraphQLWeb.GraphQLError[]) {
	let errorMessage = "";
	for (const error of errors) {
		if (error) errorMessage += "\n";
		errorMessage += `[GraphQL] ${error.message}`;
	}
	return errorMessage;
}
