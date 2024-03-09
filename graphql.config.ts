import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import type { IGraphQLConfig } from "graphql-config";

dotenvExpand.expand(dotenv.config({ path: "./.env.local" }));

const url = new URL("/graphql/", process.env.NEXT_PUBLIC_GRAPHQL_ORIGIN);

export default (<IGraphQLConfig>{
	schema: url.toString(),
	documents: "src/**/*.{ts,tsx}",
});
