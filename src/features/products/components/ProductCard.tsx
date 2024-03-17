import { type FragmentType, getFragment, graphql } from "@/graphql/generated";
import {
	Box,
	Card,
	Flex,
	Heading,
	Link,
	Separator,
	Text,
} from "@radix-ui/themes";
import Image from "next/image";
import { ProductCardBookmark } from "./ProductCardBookmark";
import { ProductCardQuickBuy } from "./ProductCardQuickBuy";

const ProductCard_ProductFragment = graphql(/* GraphQL */ `
  fragment ProductCard_ProductFragment on Product {
    name
    description
    ...ProductCardThumbnail_ProductFragment
    ...ProductCardDescription_ProductFragment
  }
`);

type ProductCardProps = {
	product: FragmentType<typeof ProductCard_ProductFragment>;
};

export function ProductCard({ product }: ProductCardProps) {
	const { name, ...fragmentRefs } = getFragment(
		ProductCard_ProductFragment,
		product,
	);

	return (
		<Card size="1">
			<Flex mb="2" position="relative">
				<ProductCardThumbnail product={fragmentRefs} />
				<ProductCardBookmark />
			</Flex>
			<Flex align="end" justify="between" mb="2">
				<Box>
					<Flex mb="1">
						<Link size="2" color="gray" highContrast>
							Footwear
						</Link>
					</Flex>
					<Heading as="h3" size="3">
						{name}
					</Heading>
				</Box>
				<Text size="6" weight="bold">
					$149
				</Text>
			</Flex>
			<ProductCardDescription product={fragmentRefs} />
			<Box style={{ marginTop: -1 }}>
				<Separator size="4" my="4" />
			</Box>
			<ProductCardQuickBuy />
		</Card>
	);
}

const ProductCardThumbnail_ProductFragment = graphql(/* GraphQL */ `
  fragment ProductCardThumbnail_ProductFragment on Product {
    name
    thumbnail {
      url
      alt
    }
  }
`);

type ProductCardThumbnailProps = {
	product: FragmentType<typeof ProductCardThumbnail_ProductFragment>;
};

function ProductCardThumbnail({ product }: ProductCardThumbnailProps) {
	const { thumbnail, name } = getFragment(
		ProductCardThumbnail_ProductFragment,
		product,
	);
	if (!thumbnail) return null;

	return (
		<Image
			src={thumbnail.url}
			alt={thumbnail.alt ?? name}
			quality={100}
			width={400}
			height={400}
		/>
	);
}

const ProductCardDescription_ProductFragment = graphql(/* GraphQL */ `
  fragment ProductCardDescription_ProductFragment on Product {
    description
  }
`);

type ProductCardDescriptionProps = {
	product: FragmentType<typeof ProductCardDescription_ProductFragment>;
};

function ProductCardDescription({ product }: ProductCardDescriptionProps) {
	getFragment(ProductCardDescription_ProductFragment, product);

	return (
		<Text as="p" size="2" color="gray" mb="4">
			here
		</Text>
	);
}
