import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from 'express';
import { blogPostSchema, commentPostSchema } from "../types/schema";
import prisma from "../prisma";

const router = express.Router();

interface AuthenticatedRequest extends Request {
    userId?: number; 
  }

interface BlogRequest extends Request {
    params: {
        id: string;
    }
}

//  /api/blog/users     => All blogs written by user
router.get(
  '/users',
  authMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).userId;

    // Fetch user with their blogs
    const user = await prisma.user.findUnique({
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
  })
);
  
//  /api/blog/6              => Specific Blog
router.get(
  '/:id',
  authMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).userId;
    const blogId = (req as BlogRequest).params.id;
    // console.log(blogId);

    const blog = await prisma.blog.findUnique({
      where: { id: Number(blogId)},
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
  })
);

//  /api/blog/                  => All Blogs
router.get( 
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const blogs = await prisma.blog.findMany({
      include: {
        author: {
          select: {
            name: true,
          }
        }
      }
    });
    
    // Format the result to include author_name
    const formattedBlog = blogs.map((blog) => (
      {
        id: blog.id,
        title: blog.title,
        content: blog.content,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
        author_name: blog.author.name,
      }
    ))

    if (!formattedBlog) {
      return res.status(404).json({ message: 'Blog does not exist' });
    }
    res.status(200).json({
      blogs: formattedBlog,
    });
  })
);


//  /api/blog/post
router.post(
  '/post',
  authMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).userId;
    const { title, content } = blogPostSchema.parse(req.body);

    if(userId){
      const newBlog = await prisma.blog.create({
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
    else{
      return res.status(400).json({ message: 'Invalid User' });
    }
    
  })
);


//  /api/blog/6/update
router.put(
  '/:id/update',
  authMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).userId;
    const blogId =(req as BlogRequest).params.id; 
    const { title, content } = blogPostSchema.parse(req.body); 

    const blog = await prisma.blog.findUnique({
      where: { id: Number(blogId) },
    });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.authorId !== userId) {
      return res.status(403).json({ message: 'You are not authorized to update this blog' });
    }

    const updatedBlog = await prisma.blog.update({
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
  })
);


//  /api/blog/6/delete
router.delete(
  '/:id/delete',
  authMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).userId;
    const blogId = (req as BlogRequest).params.id;

    const blog = await prisma.blog.findUnique({
      where: { id: Number(blogId) },
    });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.authorId !== userId) {
      return res.status(403).json({ message: 'You are not authorized to update this blog' });
    }

    await prisma.blog.delete({
      where: { id: Number(blogId) },
    });

    res.status(200).json({
      message: 'Blog deleted successfully!',
    });
  })
);


// api/blog/:id/add/comment
router.post(
  '/:id/add/comment',
  authMiddleware,
  asyncHandler( async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).userId;
    const blogId = (req as BlogRequest).params.id;
    const { content } = commentPostSchema.parse(req.body);

    if(userId && blogId){
      const comment = await prisma.comment.create({
        data: {
          content: content,
          userId: userId,
          blogId: Number(blogId),
        },
        include: {
          user: true,
        }
      })

      const formattedComment = {
        content: comment.content,
        createdAt: comment.createdAt,
        author: comment.user.name,
      }

      res.status(201).json({
        message: 'Comment added successfully!',
        comment: formattedComment,
      });
    }
    else{
      return res.status(400).json({ message: 'Invalid User or Blog ID' });
    }

  })
)


// api/blog/:id/get/comment
router.get(
  '/:id/get/comment',
  authMiddleware,
  asyncHandler( async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).userId;
    const blogId = (req as BlogRequest).params.id;

    if(userId && blogId){
      const comments = await prisma.comment.findMany({
        where: {blogId: Number(blogId)},
        include: {
          user: {
            select: {
              name: true
            }
          }
        }
      });

      const formattedComment = comments.map((comment) => (
        {
          content : comment.content,
          createdAt: comment.createdAt,
          author: comment.user.name,
        }
      ))

      res.status(201).json({
        comments: formattedComment,
      });
    }
    else{
      return res.status(400).json({ message: 'Invalid User or Blog ID' });
    }

  })
)


// search



export default router;