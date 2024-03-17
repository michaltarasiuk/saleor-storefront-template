import { fetchGraphQL } from "@/graphql/fetch_graphql";
import { graphql } from "@/graphql/generated";
import { Grid } from "@radix-ui/themes";
import { ProductCard } from "./components/ProductCard";
import { PAGE_SIZE } from "./consts/page_size";

const Products_Query = graphql(/* GraphQL */ `
  query Products_Query($channel: String!, $first: Int!) {
    products(channel: $channel, first: $first) {
      edges {
        node {
          id
          ...ProductCard_ProductFragment
        }
      }
    }
  }
`);

type ProductsProps = { params: { channel: string } };

export async function Products({ params: { channel } }: ProductsProps) {
	const {
		data: { products },
	} = await fetchGraphQL(Products_Query, {
		channel,
		first: PAGE_SIZE,
	});

	return (
		<Grid columns={{ lg: "4", sm: "3", xs: "2" }} gap="3">
			{products?.edges.map(({ node: { id, ...product } }) => (
				<ProductCard key={id} product={product} />
			))}
		</Grid>
	);
}
