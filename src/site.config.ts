import type { AstroExpressiveCodeOptions } from "astro-expressive-code";
import type { Locale, SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
	url: "https://amirhh.site",
	author: "Amir Hossein",
	defaultLocale: "fa",
	showLogo: true,
	languages: {
		fa: { title: "امیرحسین", description: "نوشته‌ها، پروژه‌ها و عکس‌های امیرحسین" },
		en: { title: "Amir Hossein", description: "Amir Hossein’s writing, projects, and photographs" },
	},
	socials: {
		github: "https://github.com/amirhh-2000",
		linkedin: "https://www.linkedin.com/in/amirhossein-hasanzadeh",
	},
	date: { options: { day: "numeric", month: "short", year: "numeric" } },
};

export const menuLinks: Record<Locale, { path: string; title: string }[]> = {
	fa: [
		{ path: "/fa/", title: "خانه" },
		{ path: "/fa/writing/", title: "نوشته‌ها" },
		{ path: "/fa/projects/", title: "پروژه‌ها" },
		{ path: "/fa/photography/", title: "عکس‌ها" },
		{ path: "/fa/about/", title: "درباره من" },
	],
	en: [
		{ path: "/en/", title: "Home" },
		{ path: "/en/writing/", title: "Writing" },
		{ path: "/en/projects/", title: "Projects" },
		{ path: "/en/photography/", title: "Photography" },
		{ path: "/en/about/", title: "About" },
	],
};

export const expressiveCodeOptions: AstroExpressiveCodeOptions = {
	styleOverrides: {
		borderRadius: "4px",
		codeFontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Consolas, monospace',
		codeFontSize: "0.875rem",
		codeLineHeight: "1.7142857rem",
		codePaddingInline: "1rem",
		frames: { frameBoxShadowCssValue: "none" },
		uiLineHeight: "inherit",
	},
	themeCssSelector(theme, { styleVariants }) {
		if (styleVariants.length >= 2) {
			const baseTheme = styleVariants[0]?.theme;
			const altTheme = styleVariants.find(
				(variant) => variant.theme.type !== baseTheme?.type,
			)?.theme;
			if (theme === baseTheme || theme === altTheme) return `[data-theme='${theme.type}']`;
		}
		return `[data-theme="${theme.name}"]`;
	},
	themes: ["dracula", "github-light"],
	useThemedScrollbars: false,
};
