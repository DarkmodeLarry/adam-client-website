import { router } from "../trpc";
import { adminRouter } from "./admin";

// connecting all the routers
export const appRouter = router({
  admin: adminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
