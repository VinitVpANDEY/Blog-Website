import { z } from 'zod';

export const signupSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const signinSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string(),
});

export const blogPostSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters long").max(40 , "Title must be at most 40 characters long"),
    content: z.string(),
});

export const commentPostSchema = z.object({
    content: z.string(),
});

