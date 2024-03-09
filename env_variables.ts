import { url, object, parse, string } from "valibot";
import type { Output } from "valibot";

const PROCESS_ENV_SCHEMA = object({
	NEXT_PUBLIC_GRAPHQL_ORIGIN: string([url()]),
});

parse(PROCESS_ENV_SCHEMA, process.env);

declare global {
	namespace NodeJS {
		interface ProcessEnv extends Output<typeof PROCESS_ENV_SCHEMA> {}
	}
}
