"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const asyncHandler_1 = require("../utils/asyncHandler");
const schema_1 = require("../types/schema");
const prisma_1 = __importDefault(require("../prisma"));
const router = express_1.default.Router();
//  /api/blog/users     => All blogs written by user
router.get('/users', authMiddleware_1.authMiddleware, (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    // Fetch user with their blogs
    const user = yield prisma_1.default.user.findUnique({
        where: { id: Number(userId) },
        include: {
            blogs: {
                select: {
                    id: true,
                    title: true,
                    content: true,
                    createdAt: true,
                    updatedAt: true,
                    author: {
                        select: {
                            name: true, // Include author's name
                        },
                    },
                },
            },
        },
    });
    // If user does not exist
    if (!user) {
        return res.status(404).json({ message: 'User does not exist' });
    }
    // Format blogs
    const formattedBlogs = user.blogs.map((blog) => ({
        id: blog.id,
        title: blog.title,
        content: blog.content,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
        author_name: blog.author.name, // Access the author's name
    }));
    // Return blogs
    res.status(200).json({
        blogs: formattedBlogs,
    });
})));
//  /api/blog/6              => Specific Blog
router.get('/:id', authMiddleware_1.authMiddleware, (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const blogId = req.params.id;
    // console.log(blogId);
    const blog = yield prisma_1.default.blog.findUnique({
        where: { id: Number(blogId) },
        include: {
            author: {
                select: {
                    name: true, // Fetches the author's name
                },
            },
        },
    });
    // Format the result to include author_name
    const formattedBlog = blog
        ? {
            id: blog.id,
            title: blog.title,
            content: blog.content,
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,
            author_name: blog.author.name, // Access the nested author's name
        }
        : null;
    if (!formattedBlog) {
        return res.status(404).json({ message: 'Blog does not exist' });
    }
    res.status(200).json({
        blog: formattedBlog,
    });
})));
//  /api/blog/                  => All Blogs
router.get('/', (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield prisma_1.default.blog.findMany({
        include: {
            author: {
                select: {
                    name: true,
                }
            }
        }
    });
    // Format the result to include author_name
    const formattedBlog = blogs.map((blog) => ({
        id: blog.id,
        title: blog.title,
        content: blog.content,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
        author_name: blog.author.name,
    }));
    if (!formattedBlog) {
        return res.status(404).json({ message: 'Blog does not exist' });
    }
    res.status(200).json({
        blogs: formattedBlog,
    });
})));
//  /api/blog/post
router.post('/post', authMiddleware_1.authMiddleware, (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { title, content } = schema_1.blogPostSchema.parse(req.body);
    if (userId) {
        const newBlog = yield prisma_1.default.blog.create({
            data: {
                title,
                content,
                authorId: userId,
            },
        });
        res.status(201).json({
            message: 'Blog post created successfully!',
            blog: newBlog,
        });
    }
    else {
        return res.status(400).json({ message: 'Invalid User' });
    }
})));
//  /api/blog/6/update
router.put('/:id/update', authMiddleware_1.authMiddleware, (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const blogId = req.params.id;
    const { title, content } = schema_1.blogPostSchema.parse(req.body);
    const blog = yield prisma_1.default.blog.findUnique({
        where: { id: Number(blogId) },
    });
    if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
    }
    if (blog.authorId !== userId) {
        return res.status(403).json({ message: 'You are not authorized to update this blog' });
    }
    const updatedBlog = yield prisma_1.default.blog.update({
        where: { id: Number(blogId) },
        data: {
            title,
            content,
            updatedAt: new Date(),
        },
    });
    res.status(200).json({
        message: 'Blog updated successfully!',
        blog: updatedBlog,
    });
})));
//  /api/blog/6/delete
router.delete('/:id/delete', authMiddleware_1.authMiddleware, (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const blogId = req.params.id;
    const blog = yield prisma_1.default.blog.findUnique({
        where: { id: Number(blogId) },
    });
    if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
    }
    if (blog.authorId !== userId) {
        return res.status(403).json({ message: 'You are not authorized to update this blog' });
    }
    yield prisma_1.default.blog.delete({
        where: { id: Number(blogId) },
    });
    res.status(200).json({
        message: 'Blog deleted successfully!',
    });
})));
// api/blog/:id/add/comment
router.post('/:id/add/comment', authMiddleware_1.authMiddleware, (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const blogId = req.params.id;
    const { content } = schema_1.commentPostSchema.parse(req.body);
    if (userId && blogId) {
        const comment = yield prisma_1.default.comment.create({
            data: {
                content: content,
                userId: userId,
                blogId: Number(blogId),
            },
            include: {
                user: true,
            }
        });
        const formattedComment = {
            content: comment.content,
            createdAt: comment.createdAt,
            author: comment.user.name,
        };
        res.status(201).json({
            message: 'Comment added successfully!',
            comment: formattedComment,
        });
    }
    else {
        return res.status(400).json({ message: 'Invalid User or Blog ID' });
    }
})));
// api/blog/:id/get/comment
router.get('/:id/get/comment', authMiddleware_1.authMiddleware, (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const blogId = req.params.id;
    if (userId && blogId) {
        const comments = yield prisma_1.default.comment.findMany({
            where: { blogId: Number(blogId) },
            include: {
                user: {
                    select: {
                        name: true
                    }
                }
            }
        });
        const formattedComment = comments.map((comment) => ({
            content: comment.content,
            createdAt: comment.createdAt,
            author: comment.user.name,
        }));
        res.status(201).json({
            comments: formattedComment,
        });
    }
    else {
        return res.status(400).json({ message: 'Invalid User or Blog ID' });
    }
})));
// search
exports.default = router;
