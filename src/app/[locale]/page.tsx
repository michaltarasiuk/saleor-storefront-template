import { fetchGraphQL } from "@/graphql/fetch_graphql";
import { graphql } from "@/graphql/generated";

const Pagination_ProductsQuery = graphql(`
  query Pagination_ProductsQuery(
    $first: Int
  ) {
    products(
      first: $first,
      channel: "default-channel"
    ) {
      edges {
        node {
          name
        }
      }
    }
  }
`);

export default async function RootPage() {
	await fetchGraphQL(Pagination_ProductsQuery, {
		first: 1,
	});

	return null;
}
