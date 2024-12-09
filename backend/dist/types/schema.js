"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentPostSchema = exports.blogPostSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, 'Name must be at least 3 characters long'),
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
});
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z.string(),
});
exports.blogPostSchema = zod_1.z.object({
    title: zod_1.z.string().min(5, "Title must be at least 5 characters long").max(40, "Title must be at most 40 characters long"),
    content: zod_1.z.string(),
});
exports.commentPostSchema = zod_1.z.object({
    content: zod_1.z.string(),
});
