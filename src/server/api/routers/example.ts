import { z } from "zod";
import {
    createTrpcRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createTrpcRouter({
    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => ({
            greeting: `Hello ${input.text}`,
        })),

    getAll: publicProcedure.query(async ({ ctx }) =>
        ctx.prisma.example.findMany(),
    ),

    getSecretMessage: protectedProcedure.query(
        () => "you can now see this secret message!",
    ),
});
