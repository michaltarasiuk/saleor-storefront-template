import * as GraphQLWeb from "@0no-co/graphql.web";
import type { SetRequired } from "type-fest";

type ErrorLike = SetRequired<Partial<GraphQLWeb.GraphQLError>, "message">;

export class GraphQLError extends Error {
	override name: string;
	override message: string;
	public graphQLErrors: GraphQLWeb.GraphQLError[];

	constructor(graphQLErrors: ErrorLike[]) {
		const normalizedGraphQLErrors = graphQLErrors.map(rehydrateGraphQLError);
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

function rehydrateGraphQLError({
	message,
	nodes,
	source,
	positions,
	path,
	originalError,
	extensions,
}: ErrorLike) {
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
