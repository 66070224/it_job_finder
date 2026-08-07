import z from "zod";
export const signUpSchema = z.object({
  first_name: z.string().min(3).max(30),
  last_name: z.string().min(3).max(30),
  email: z.email(),
  password: z.string().min(8).max(30),
});

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(30),
});