/** @type {import('next').NextConfig} */
const nextConfig = {
	distDir: "dist",
	images: {
		remotePatterns: [
			{
				hostname: new URL(process.env.NEXT_PUBLIC_GRAPHQL_ORIGIN).hostname,
			},
		],
	},
};

export default nextConfig;
