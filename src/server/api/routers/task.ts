import { any, z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { taskSchema, taskUpdateSchema } from "~/utils/validation";

export const taskRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }:any) => {
    return await ctx.db.task.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }: any) => {
      return await ctx.db.task.findUnique({
        where: { id: input.id },
      });
    }),
    create: publicProcedure
  .input(taskSchema)
  .mutation(async ({ ctx, input }:any) => {
    return await ctx.db.task.create({
      data: {
        title: input.title,
        description: input.description,
        // assuming you have status in your schema
      },
    });
  }),

  update: publicProcedure
    .input(z.object({
      id: z.string(),
      data: taskUpdateSchema,
    }))
    .mutation(async ({ ctx, input }:any) => {
      return await ctx.db.task.update({
        where: { id: input.id },
        data: input.data,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }:any) => {
      return await ctx.db.task.delete({
        where: { id: input.id },
      });
    }),
});
