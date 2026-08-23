import rss from "@astrojs/rss";
import { getWriting } from "@/data/content";
import { isLocale } from "@/i18n";
import { siteConfig } from "@/site.config";

export function getStaticPaths() {
	return ["fa", "en"].map((locale) => ({ params: { locale } }));
}

export async function GET(context: { params: { locale?: string }; site?: URL }) {
	const locale = isLocale(context.params.locale) ? context.params.locale : "fa";
	const entries = await getWriting(locale);
	const copy = siteConfig.languages[locale];
	return rss({
		title: copy.title,
		description: copy.description,
		site: context.site ?? siteConfig.url,
		customData: `<language>${locale}</language>`,
		items: entries.map((entry) => ({
			title: entry.data.title,
			description: entry.data.description,
			pubDate: entry.data.publishedAt,
			link: `/${locale}/writing/${entry.id.replace(`${locale}/`, "")}/`,
		})),
	});
}
