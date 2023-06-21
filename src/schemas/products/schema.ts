import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(4, "Deve ter pelo menos 4 caracteres"),
  description: z.string().optional(),
  price: z
    .string()
    .min(1, "O campo de preço é obrigatório")
    .transform((value) => parseFloat(value)),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const productSchemaResponses = productSchema.array();

export const productSchemaRegister = productSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .refine((data) => data.price <= 0, {
    message: "O preço precisa ser maior que 0",
    path: ["price"],
  });

export type productResponse = z.infer<typeof productSchema>;
export type productResponses = z.infer<typeof productSchemaResponses>;
export type productRegister = z.infer<typeof productSchemaRegister>;
