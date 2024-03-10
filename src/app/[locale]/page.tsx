import { ProductCard } from "@/features/shop/components/ProductCard";
import { Grid } from "@radix-ui/themes";

export default function RootPage() {
	return (
		<Grid columns={{ lg: "4", sm: "3", xs: "2" }} gap="3">
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
		</Grid>
	);
}
