import { siteConfig } from "@/site.config";
import type { Locale } from "@/types";

export function getFormattedDate(date: Date, locale: Locale, options?: Intl.DateTimeFormatOptions) {
	return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-US", {
		...siteConfig.date.options,
		...options,
	}).format(date);
}
