import { z } from "zod";

export const blogSchema = z.object({
    blogTitle: z
        .string()
        .min(2, { message: "Please enter a valid title" }),

    shortDesc: z
        .string()
        .min(1, { message: "Short description is required" }),

    description: z
        .string()
        .min(1, { message: "Description is required" }),
});
