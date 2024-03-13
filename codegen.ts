import type { CodegenConfig } from "@graphql-codegen/cli";

const url = new URL("/graphql/", process.env.NEXT_PUBLIC_GRAPHQL_ORIGIN);

export default (<CodegenConfig>{
	schema: url.toString(),
	documents: "**/*.{ts,tsx}",
	generates: {
		"./src/graphql/generated/": {
			preset: "client",
			presetConfig: {
				fragmentMasking: { unmaskFunctionName: "getFragment" },
			},
			config: {
				useTypeImports: true,
				skipTypename: true,
				defaultScalarType: "unknown",
				documentMode: "string",
			},
		},
	},
});
