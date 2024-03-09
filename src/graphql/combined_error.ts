import { GraphQLError } from "@0no-co/graphql.web";
import type { SetRequired } from "type-fest";

type ErrorLike = SetRequired<Partial<GraphQLError>, "message">;

export class CombinedError extends Error {
	public name: string;
	public message: string;

	public graphQLErrors: GraphQLError[];

	constructor(graphQLErrors: ErrorLike[]) {
		const normalizedGraphQLErrors = graphQLErrors.map(rehydrateGraphQlError);
		const message = generateErrorMessage(normalizedGraphQLErrors);

		super(message);

		this.name = "CombinedError";
		this.message = message;
		this.graphQLErrors = normalizedGraphQLErrors;
	}

	toString() {
		return this.message;
	}
}

function rehydrateGraphQlError({
	message,
	nodes,
	source,
	positions,
	path,
	originalError,
	extensions,
}: ErrorLike) {
	return new GraphQLError(
		message,
		nodes,
		source,
		positions,
		path,
		originalError,
		extensions,
	);
}

function generateErrorMessage(graphQlErrs: GraphQLError[]) {
	let error = "";
	for (const err of graphQlErrs) {
		if (error) error += "\n";
		error += `[GraphQL] ${err.message}`;
	}
	return error;
}
