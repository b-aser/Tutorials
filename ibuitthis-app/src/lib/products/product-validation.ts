import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, "Product name must be at least 3 characters long")
    .max(120, "Product name must be less than 120 characters long")
    .regex(
      /^[a-zA-Z0-9\s]+$/,
      "Product name must contain only letters, numbers, and spaces",
    ),
  tagline: z.string().min(1),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters long")
    .max(140, "Slug must be less than 140 characters long")
    .regex(
      /^[a-z0-9\-]+$/,
      "Slug must contain only lowercase letters, numbers, and hyphens",
    ),

  description: z.string().optional(),
  websiteUrl: z.string().min(1, { message: "Website URL is required" }),
  tags: z
    .string()
    .min(1, { message: "Tags are required" })
    .transform((val) => val.split(",").map((tag) => tag.trim().toLocaleLowerCase())),
});
