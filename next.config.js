// @ts-check

const graphqlOrigin = process.env.NEXT_PUBLIC_GRAPHQL_ORIGIN;
if (!graphqlOrigin) throw new Error("graphql origin is not defined");

/** @type {import('next').NextConfig} */
const nextConfig = {
	distDir: "dist",
	images: {
		remotePatterns: [
			{
				hostname: new URL(graphqlOrigin).hostname,
			},
		],
	},
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
};

export default nextConfig;
