"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
}));
app.use('/api/users', userRoutes_1.default);
app.use('/api/blog', blogRoutes_1.default);
app.use((req, res, next) => {
    res.status(404).json({ message: 'Resource not found' });
});
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    if (err.name === 'ZodError') {
        res.status(400).json({ message: err.errors.map((error) => error.message) });
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
