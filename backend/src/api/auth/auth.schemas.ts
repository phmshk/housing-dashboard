import z from "zod";

const registerSchema = z.object({
  body: z.object({
    email: z.email("Not a valid email"),

    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.email("Not a valid email"),
    password: z.string(),
  }),
});

export { registerSchema, loginSchema };
