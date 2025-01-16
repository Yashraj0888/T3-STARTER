import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { taskSchema, taskUpdateSchema } from "~/utils/validation";

export const taskRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.task.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.task.findUnique({
        where: { id: input.id },
      });
    }),

  create: publicProcedure
    .input(taskSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.task.create({
        data: input,
      });
    }),

  update: publicProcedure
    .input(z.object({
      id: z.string(),
      data: taskUpdateSchema,
    }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.task.update({
        where: { id: input.id },
        data: input.data,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.task.delete({
        where: { id: input.id },
      });
    }),
});
