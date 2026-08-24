import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const language = z.enum(["fa", "en"]);
const date = z
	.string()
	.or(z.date())
	.transform((value) => new Date(value))
	.refine((value) => !Number.isNaN(value.getTime()), {
		message: "Use a valid date such as 2026-08-23.",
	});
const requiredText = z.string().trim().min(1, "This field cannot be empty.");
const localizedText = z.object({ fa: requiredText, en: requiredText });

const writing = defineCollection({
	loader: glob({ base: "./content/writing", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		z.object({
			title: requiredText,
			description: requiredText,
			publishedAt: date,
			updatedAt: date.optional(),
			language,
			category: z.enum(["technical", "personal", "spiritual", "learning"]),
			tags: z.array(z.string()).default([]),
			draft: z.boolean().default(true),
			cover: z.object({ src: image(), alt: z.string() }).optional(),
			translationKey: z.string().optional(),
		}),
});

const project = defineCollection({
	loader: glob({ base: "./content/projects", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		z.object({
			name: requiredText,
			description: requiredText,
			year: z.number().int(),
			status: z.enum(["active", "experimental", "maintained", "archived"]),
			featured: z.boolean().default(false),
			language,
			website: z.url().optional(),
			repository: z.url().optional(),
			technologies: z.array(z.string()).default([]),
			cover: z.object({ src: image(), alt: z.string() }).optional(),
			translationKey: z.string().optional(),
			draft: z.boolean().default(true),
		}),
});

const photography = defineCollection({
	loader: glob({ base: "./content/photography", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		z.object({
			title: localizedText,
			description: localizedText,
			publishedAt: date,
			tags: z.array(z.string()).default([]),
			cover: z.object({ src: image(), alt: localizedText }),
			draft: z.boolean().default(true),
			photos: z
				.array(
					z.object({
						src: image(),
						title: localizedText.optional(),
						alt: localizedText,
						caption: localizedText.optional(),
						tags: z.array(z.string()).default([]),
						commercialUse: z.enum(["free", "paid"]).default("paid"),
						highRes: z.enum(["free", "paid"]).default("paid"),
						purchase: z
							.object({
								priceToman: z.number().int().positive(),
								iranPaymentUrl: z.url().optional(),
								nowPaymentsUrl: z.url().optional(),
							})
							.refine((value) => value.iranPaymentUrl || value.nowPaymentsUrl, {
								message: "Add at least one payment URL.",
							})
							.optional(),
					}),
				)
				.min(1, "A photography collection must include at least one web preview."),
		}),
});

const page = defineCollection({
	loader: glob({ base: "./content/pages", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: requiredText,
		description: requiredText,
		language,
		translationKey: z.string().optional(),
		draft: z.boolean().default(true),
	}),
});

export const collections = { writing, project, photography, page };
