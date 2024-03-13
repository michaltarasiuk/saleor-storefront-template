import { fetchGraphQL } from "@/graphql/fetch_graphql";
import { graphql } from "@/graphql/generated";
import { $env } from "./env_variables";

const StaticConfig_Query = graphql(/* GraphQL */ `
  query StaticConfig_Query {
    channels {
      slug
      isActive
      defaultCountry {
        code
      }
    }
  }
`);

const { data, error } = await fetchGraphQL(
	StaticConfig_Query,
	{},
	{
		headers: {
			Authorization: `Bearer ${$env.appToken}`,
		},
	},
);

if (error) {
	console.error(error);
} else {
	const channels =
		data.channels?.flatMap(({ isActive, ...channel }) =>
			isActive ? [channel] : [],
		) ?? [];

	Bun.write("./static_config.json", JSON.stringify({ channels }, undefined, 2));
}
