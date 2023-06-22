import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(4, "Deve ter pelo menos 4 caracteres"),
  description: z.string().optional(),
  price: z.string().transform((value) => Number(value)),
  image: z.any(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const productSchemaResponse = productSchema.extend({
  price: z.number(),
});

export const productSchemaResponses = productSchema
  .extend({ price: z.number() })
  .array();

export const productSchemaRegister = productSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .refine((data) => data.price >= 0, {
    message: "O preço precisa ser maior que 0",
    path: ["price"],
  });

export const productSchemaPatch = productSchema.partial();

export type productResponse = z.infer<typeof productSchemaResponse>;
export type productResponses = z.infer<typeof productSchemaResponses>;
export type productRegister = z.infer<typeof productSchemaRegister>;
export type productPatch = z.infer<typeof productSchemaPatch>;
