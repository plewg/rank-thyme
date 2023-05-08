import bcrypt from "bcrypt";
import { z } from "zod";
import { createPollSchema } from "~/schemas/poll";
import { createTrpcRouter, publicProcedure } from "~/server/api/trpc";
import { generateId } from "~/utils/nanoid";
import { shuffleArray } from "~/utils/shuffle";

export const pollRouter = createTrpcRouter({
    create: publicProcedure
        .input(createPollSchema)
        .mutation(async ({ input, ctx }) => {
            const hashedPassword = await bcrypt.hash(input.password, 10);
            return await ctx.prisma.poll.create({
                select: {
                    id: true,
                },
                data: {
                    id: generateId(),
                    name: input.name,
                    password: hashedPassword,
                    options: {
                        createMany: {
                            data: input.options.map((option) => ({
                                id: generateId(),
                                body: option.value,
                            })),
                        },
                    },
                },
            });
        }),
    view: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
            const poll = await ctx.prisma.poll.findUniqueOrThrow({
                select: {
                    id: true,
                    name: true,
                    options: true,
                    updatedAt: true,
                },
                where: {
                    id: input.id,
                },
            });

            poll.options = shuffleArray(poll.options);

            return poll;
        }),
    vote: publicProcedure
        .input(z.object({ id: z.string(), options: z.string().array() }))
        .mutation(async ({ input, ctx }) => {
            // do things
            await ctx.prisma.vote.create({
                data: {
                    id: generateId(),
                    pollId: input.id,
                    optionVoteRanks: {
                        createMany: {
                            data: input.options.map((option, index) => ({
                                id: generateId(),
                                optionId: option,
                                rank: index,
                            })),
                        },
                    },
                },
            });
        }),
    results: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
            const poll = await ctx.prisma.poll.findUniqueOrThrow({
                select: {
                    name: true,
                    options: true,
                },
                where: {
                    id: input.id,
                },
            });

            const voteResults = await ctx.prisma.optionVoteRank.groupBy({
                by: ["optionId"],
                _sum: {
                    rank: true,
                },
            });

            return {
                name: poll.name,
                votes: poll.options.map(({ id, body }) => {
                    const optionResult = voteResults.find(
                        ({ optionId }) => optionId === id,
                    );

                    return {
                        id,
                        body,
                        weightedVote: optionResult?._sum.rank ?? null,
                    };
                }),
            };
        }),
});
