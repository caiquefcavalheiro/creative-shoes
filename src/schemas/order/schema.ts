interface Order {
  id: string;
  quantity: number;
  totalPrice: number;
  orderDate: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
}

import { z } from "zod";
import { productSchema } from "../products/schema";

export const orderSchema = z.object({
  id: z.string(),
  quantity: z.number(),
  totalPrice: z.number(),
  orderDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string().nullable(),
  product: productSchema,
});

export type orderResponse = z.infer<typeof orderSchema>;
