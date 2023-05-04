import { createNextApiHandler } from "@trpc/server/adapters/next";
import { env } from "~/env";
import { appRouter } from "~/server/api/root";
import { createTrpcContext } from "~/server/api/trpc";

// export API handler
const apiHandler = createNextApiHandler({
    router: appRouter,
    createContext: createTrpcContext,
    onError:
        env.NODE_ENV === "development"
            ? ({ path, error }) => {
                  console.error(
                      `❌ tRPC failed on ${path ?? "<no-path>"}: ${
                          error.message
                      }`,
                  );
              }
            : undefined,
});

export default apiHandler;
