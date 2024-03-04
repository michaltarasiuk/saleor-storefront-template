import { object, parse } from "valibot";
import type { Output } from "valibot";

const PROCESS_ENV_SCHEMA = object({});

parse(PROCESS_ENV_SCHEMA, process.env);

declare global {
	namespace NodeJS {
		interface ProcessEnv extends Output<typeof PROCESS_ENV_SCHEMA> {}
	}
}
