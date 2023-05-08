import { z } from "zod";

export const createPollSchema = z.object({
    name: z.string().trim().min(1),
    password: z.string().trim().optional().default(""),
    options: z
        .object({
            value: z.string().trim().min(1),
        })
        .array()
        .min(2)
        .max(255),
});
