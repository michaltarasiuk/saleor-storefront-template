import { Grid } from "@radix-ui/themes";
import { ProductCard } from "./components/ProductCard";

export function Products() {
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
