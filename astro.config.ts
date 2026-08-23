import fs from "node:fs";
import { satteri, satteriHeadingIdsPlugin } from "@astrojs/markdown-satteri";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";
import webmanifest from "astro-webmanifest";
import { satteriAdmonitionsPlugin } from "./src/plugins/admonitions";
import { satteriGithubCardPlugin } from "./src/plugins/github-cards";
import {
	satteriAutolinkHeadingsPlugin,
	satteriExternalLinksPlugin,
	satteriFootnoteLabelPlugin,
	satteriReadingTimePlugin,
	satteriUnwrapImagesPlugin,
} from "./src/plugins/satteri";
import { expressiveCodeOptions, siteConfig } from "./src/site.config";

export default defineConfig({
	site: siteConfig.url,
	i18n: {
		defaultLocale: "fa",
		locales: ["fa", "en"],
		routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
	},
	integrations: [
		expressiveCode(expressiveCodeOptions),
		icon(),
		sitemap(),
		mdx(),
		robotsTxt(),
		webmanifest({
			name: siteConfig.languages.fa.title,
			description: siteConfig.languages.fa.description,
			lang: "fa",
			icon: "public/icon.svg",
			icons: [
				{ src: "icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
				{ src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
				{ src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
			],
			start_url: "/fa/",
			background_color: "#1d1f21",
			theme_color: "#2bbc8a",
			display: "standalone",
			config: { insertFaviconLinks: false, insertThemeColorMeta: false, insertManifestLink: false },
		}),
	],
	markdown: {
		processor: satteri({
			features: { directive: true },
			mdastPlugins: [
				satteriUnwrapImagesPlugin(),
				satteriReadingTimePlugin(),
				satteriGithubCardPlugin(),
				satteriAdmonitionsPlugin(),
			],
			hastPlugins: [
				satteriHeadingIdsPlugin(),
				satteriAutolinkHeadingsPlugin(),
				satteriFootnoteLabelPlugin(),
				satteriExternalLinksPlugin(),
			],
		}),
	},
	vite: { plugins: [tailwind(), rawFonts([".ttf", ".woff", ".woff2"])] },
});

function rawFonts(ext: string[]) {
	return {
		name: "vite-plugin-raw-fonts",
		// @ts-expect-error Astro's Vite hook is intentionally untyped here.
		transform(_, id) {
			if (ext.some((item) => id.endsWith(item))) {
				const buffer = fs.readFileSync(id);
				return { code: `export default ${JSON.stringify(buffer)}`, map: null, moduleType: "js" };
			}
		},
	};
}
