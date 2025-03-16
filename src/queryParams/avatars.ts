import { z } from "zod";

export const searchAvatarsParams = z.object({
  featured: z.boolean().optional(),
  sort: z.enum(["popularity", "heat", "trust", "shuffle", "random", "favorites", "reportScore", "reportCount", "publicationDate", "labsPublicationDate", "created", "_created_at", "updated", "_updated_at", "order", "relevance", "magic", "name"]).optional(),
  user: z.enum(["me"]).optional(),
  userId: z.string().optional(),
  n: z.number().min(1).max(100).optional(),
  order: z.enum(["ascending", "descending"]).optional(),
  offset: z.number().min(0).optional(),
  tag: z.string().optional(),
  notag: z.string().optional(),
  releaseStatus: z.enum(["public", "private", "hidden", "all"]).optional(),
  maxUnityVersion: z.string().optional(),
  minUnityVersion: z.string().optional(),
  platform: z.string().optional(),
})
export type searchAvatarsParamsType = z.infer<typeof searchAvatarsParams>;
