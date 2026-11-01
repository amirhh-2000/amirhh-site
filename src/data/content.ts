import { type CollectionEntry, getCollection } from "astro:content";
import type { Locale } from "@/types";

export const contentSlug = (id: string, locale: Locale) =>
	id.replace(new RegExp(`^${locale}/`), "").replace(/\/index$/, "");

import categories from "../../content/photography-categories.json";

type PhotographyEntry = CollectionEntry<"photography">;
export type Photograph = Omit<PhotographyEntry["data"], "title" | "alt" | "caption"> & {
	src: PhotographyEntry["data"]["image"];
	title: Record<Locale, string | undefined>;
	alt: Record<Locale, string | undefined>;
	caption: Record<Locale, string | undefined>;
};
export interface PhotographyItem {
	categorySlug: string;
	category: (typeof categories)[keyof typeof categories];
	photo: Photograph;
	photoIndex: number;
	slug: string;
	publishedAt: Date | undefined;
}
export function getPhotographyItems(entries: PhotographyEntry[]): PhotographyItem[] {
	return entries.map((entry, photoIndex) => {
		const category = categories[entry.data.category as keyof typeof categories];
		if (!category) throw new Error(`Unknown photography category: ${entry.data.category}`);
		if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.id))
			throw new Error(`Invalid photography filename: ${entry.id}`);
		const { title, titleEn, alt, altEn, caption, captionEn, ...data } = entry.data;
		return {
			categorySlug: data.category,
			category,
			photoIndex,
			slug: entry.id,
			publishedAt: data.publishedAt,
			photo: {
				...data,
				src: data.image,
				title: { fa: title, en: titleEn },
				alt: { fa: alt, en: altEn },
				caption: { fa: caption, en: captionEn },
			},
		};
	});
}

export async function getWriting(locale: Locale) {
	return (
		await getCollection("writing", ({ data }) => data.language === locale && !data.draft)
	).sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

export async function getProjects(locale: Locale) {
	return (
		await getCollection("project", ({ data }) => data.language === locale && !data.draft)
	).sort((a, b) => b.data.year - a.data.year);
}

export async function getPhotography() {
	return (await getCollection("photography", ({ data }) => !data.draft)).sort(
		(a, b) =>
			(b.data.publishedAt?.getTime() ?? 0) - (a.data.publishedAt?.getTime() ?? 0) ||
			a.id.localeCompare(b.id),
	);
}

export function findTranslation<T extends "writing" | "project" | "page">(
	entry: CollectionEntry<T>,
	entries: CollectionEntry<T>[],
) {
	return entry.data.translationKey
		? entries.find(
				(item) =>
					item.data.translationKey === entry.data.translationKey &&
					item.data.language !== entry.data.language &&
					!item.data.draft,
			)
		: undefined;
}
