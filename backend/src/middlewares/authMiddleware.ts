import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: number;
    iat: number;    // initiated at
    exp: number;
}

// Extend the Request type locally for this middleware
interface AuthenticatedRequest extends Request {
    userId?: number; // Add the `user` property
  }

export const authMiddleware = (req: Request, res: Response, next: NextFunction)  : void => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(401).json({ message: 'No token provided, authorization denied'});
        return;
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET!) as JwtPayload;
        (req as AuthenticatedRequest).userId = decoded.userId; // Cast `req` to `AuthenticatedRequest`
        next() 
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
}