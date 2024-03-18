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
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
};

export default nextConfig;
