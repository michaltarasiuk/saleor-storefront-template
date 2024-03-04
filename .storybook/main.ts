import type { StorybookConfig } from "@storybook/nextjs";

export default (<StorybookConfig>{
	stories: ["../src/**/*.mdx", "../src/**/*.stories.tsx"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-onboarding",
		"@storybook/addon-interactions",
	],
	framework: {
		name: "@storybook/nextjs",
		options: {},
	},
	docs: {
		autodocs: "tag",
	},
});
