export type Locale = "fa" | "en";

export interface LocalizedSiteCopy {
	title: string;
	description: string;
}

export interface SiteConfig {
	author: string;
	date: { options: Intl.DateTimeFormatOptions };
	defaultLocale: Locale;
	languages: Record<Locale, LocalizedSiteCopy>;
	showLogo: boolean;
	socials: { github: string; linkedin: string };
	url: string;
}

export interface SiteMeta {
	alternateHref?: string | undefined;
	articleDate?: string | undefined;
	description?: string | undefined;
	locale: Locale;
	noIndex?: boolean;
	ogImage?: string | undefined;
	title: string;
}

export type AdmonitionType = "tip" | "note" | "important" | "caution" | "warning";
