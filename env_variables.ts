import { Output, object, string } from "valibot";

const PROCESS_ENV_SCHEMA = object({
	a: string(),
});

PROCESS_ENV_SCHEMA._parse(process.env);

declare global {
	namespace NodeJS {
		interface ProcessEnv extends Output<typeof PROCESS_ENV_SCHEMA> {}
	}
}
