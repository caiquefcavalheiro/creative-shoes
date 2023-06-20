import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  name: z.string().min(4, "Deve ter pelo menos 4 caracteres"),
  email: z.string().email({ message: "Deve inserir um email válido" }),
  password: z.string().min(6, "Deve ter pelo menos 5 caracteres"),
});

export const userSchemaRegister = userSchema
  .omit({ id: true })
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas estão diferentes",
    path: ["confirmPassword"],
  });

export const usersSchemaResponse = userSchema.omit({ password: true }).array();
export const userSchemaResponse = userSchema.omit({ password: true });
export const userSchemaLogin = userSchema.omit({ id: true, name: true });

export type userRegister = z.infer<typeof userSchemaRegister>;
export type usersResponse = z.infer<typeof usersSchemaResponse>;
export type userResponse = z.infer<typeof userSchemaResponse>;
export type userLogin = z.infer<typeof userSchemaLogin>;
