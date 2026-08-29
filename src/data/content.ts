import { type CollectionEntry, getCollection } from "astro:content";
import type { Locale } from "@/types";

export const contentSlug = (id: string, locale: Locale) =>
	id.replace(new RegExp(`^${locale}/`), "").replace(/\/index$/, "");

export const photographySlug = (id: string) => id.replace(/\/index$/, "");

type PhotographyEntry = CollectionEntry<"photography">;
export type Photograph = PhotographyEntry["data"]["photos"][number];

export interface PhotographyItem {
	categorySlug: string;
	entry: PhotographyEntry;
	photo: Photograph;
	photoIndex: number;
	slug: string;
}

export function getPhotographyItems(entries: PhotographyEntry[]): PhotographyItem[] {
	const items = entries.flatMap((entry) => {
		const categorySlug = photographySlug(entry.id);
		return entry.data.photos.map((photo, photoIndex) => ({
			categorySlug,
			entry,
			photo,
			photoIndex,
			slug: photo.slug,
		}));
	});

	const seen = new Set<string>();
	for (const item of items) {
		if (seen.has(item.slug)) {
			throw new Error(`Duplicate photography slug: ${item.slug}`);
		}
		seen.add(item.slug);
	}

	return items;
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
		(a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
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
