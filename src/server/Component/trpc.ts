import z from "zod";
import { TRPCError } from "@trpc/server";
import { router, publicProcedure } from "../trpc";
import axios from "axios";
const api = process.env.TMDB_API_KEY;
const url = "https://api.themoviedb.org/3";

export const testing = publicProcedure
  .input(
    z.object({
      endpoint: z.string().default("/movie/popular"),
    })
  )
  .query(async ({ input }) => {
    try {
      const response = await axios.get(`${url}${input.endpoint}`, {
        params: {
          api_key: api,
        },
      });
      return response.data;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  });
