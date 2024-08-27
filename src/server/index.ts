import z from "zod";
import { router, publicProcedure } from "./trpc";
import { testing } from "./Component/trpc";
export const appRouter = router({
  testing: testing,
});
export type AppRouter = typeof appRouter;
