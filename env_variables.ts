import { raise } from "@/shared/tools/raise";
import { url, object, parse, string, undefined_, union } from "valibot";
import type { Output } from "valibot";

const PROCESS_ENV_SCHEMA = object({
	// Public
	NEXT_PUBLIC_GRAPHQL_ORIGIN: string([url()]),
	// Private
	APP_TOKEN: union([string(), undefined_()]),
});

parse(PROCESS_ENV_SCHEMA, process.env);

declare global {
	namespace NodeJS {
		interface ProcessEnv extends Output<typeof PROCESS_ENV_SCHEMA> {}
	}
}

export const $env = {
	get appToken() {
		return process.env.APP_TOKEN ?? raise("app token is not defined");
	},
};
