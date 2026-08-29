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
		z
			.object({
				title: localizedText,
				description: localizedText,
				publishedAt: date,
				tags: z.array(z.string()).default([]),
				draft: z.boolean().default(true),
				photos: z.array(
					z
						.object({
							src: image(),
							slug: z
								.string()
								.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens.")
								.min(1),
							title: localizedText.optional(),
							alt: localizedText.optional(),
							caption: localizedText.optional(),
							tags: z.array(z.string()).optional(),
							process: z
								.enum(["photograph", "ai-assisted", "ai-derived", "ai-generated"])
								.default("photograph"),
							access: z
								.object({
									type: z.enum(["display-only", "request", "free"]),
									license: z
										.object({
											highResolution: z.enum(["free", "paid"]).default("free"),
											commercialUse: z.enum(["free", "paid"]).default("free"),
										})
										.default({ highResolution: "free", commercialUse: "free" }),
									file: z
										.string()
										.regex(/^\/downloads\//, "Download files must live under /public/downloads.")
										.optional(),
									format: requiredText.optional(),
									dimensions: requiredText.optional(),
								})
								.default({
									type: "display-only",
									license: { highResolution: "free", commercialUse: "free" },
								}),
						})
						.superRefine((photo, context) => {
							if (photo.access.type === "free" && !photo.access.file) {
								context.addIssue({
									code: "custom",
									path: ["access", "file"],
									message: "A free photograph needs a public file under /downloads/.",
								});
							}
							if (
								photo.access.type === "request" &&
								photo.access.license.highResolution === "free" &&
								photo.access.license.commercialUse === "free"
							) {
								context.addIssue({
									code: "custom",
									path: ["access", "license"],
									message: "A requested photograph needs at least one paid license condition.",
								});
							}
							if (
								photo.access.type === "free" &&
								(photo.access.license.highResolution === "paid" ||
									photo.access.license.commercialUse === "paid")
							) {
								context.addIssue({
									code: "custom",
									path: ["access", "license"],
									message: "A free photograph cannot have a paid license condition.",
								});
							}
						}),
				),
			})
			.superRefine((data, context) => {
				if (!data.draft && data.photos.length === 0) {
					context.addIssue({
						code: "custom",
						path: ["photos"],
						message: "A published photography collection must include at least one web preview.",
					});
				}
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
