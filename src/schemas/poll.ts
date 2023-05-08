import { z } from "zod";

export const createPollSchema = z.object({
    name: z.string().trim().min(1, { message: "Name can't be empty" }),
    password: z.string().trim().optional().default(""),
    options: z
        .object({
            value: z.string().trim().min(1),
        })
        .array()
        .min(2, { message: "You must have at least 2 options" })
        .max(255, { message: "You must have less than 255 options" }),
});
