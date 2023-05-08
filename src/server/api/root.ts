import { pollRouter } from "~/server/api/routers/poll";
import { createTrpcRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTrpcRouter({
    poll: pollRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
