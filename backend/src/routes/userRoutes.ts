import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { signupSchema, signinSchema } from '../types/schema'; 
import prisma from '../prisma';
import { asyncHandler } from '../utils/asyncHandler';
import { authMiddleware } from '../middlewares/authMiddleware'; 
import { Request, Response } from 'express';

const router = express.Router();

// Extend the Request type locally
interface AuthenticatedRequest extends Request {
    userId?: number;
  }

router.post(
    '/signup',
    asyncHandler(async (req: Request, res: Response) => {
        const { name, email, password } = signupSchema.parse(req.body);
        const userExists = await prisma.user.findUnique({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        /*
        // If you want to signin user along with signup
        const userId = user.id;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        */
        res.status(201).json({ user });
    })
);

router.post(
    '/signin',
    asyncHandler(async (req: Request, res: Response) => {
        const { email, password } = signinSchema.parse(req.body);
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const userId = user.id;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.json({ token });
    })
);


router.get(
    '/profile',
    authMiddleware,
    asyncHandler(async (req: Request, res: Response) => {
        const id = (req as AuthenticatedRequest).userId;
        const user = await prisma.user.findUnique({
            where: { id:  id },
            select: { id: true, name: true, email: true },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    })
);
export default router;