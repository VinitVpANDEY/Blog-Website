import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import blogRoutes from './routes/blogRoutes';
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
}));

app.use('/api/users', userRoutes);
app.use('/api/blog',blogRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: 'Resource not found' });
});

const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    console.error(err.stack);

    if (err.name === 'ZodError') {
        res.status(400).json({ message: err.errors.map((error: any) => error.message) });
        return; // End the request-response cycle
    }

    res.status(500).json({
        message: 'Internal Server Error',
    });

    return; // End the request-response cycle
};

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
