import express, { Request, Response } from "express";
import { logger } from "./middleware.js";
import { errorHandler } from "./errorMiddleware.js";
import userRoutes from "./userRoutes.js";

const app = express();
const PORT = 3000;

// Apply middleware
app.use(logger);

// user routes
app.use("/users", userRoutes);

// Error route
app.get("/error", (req: Request, res: Response) => {
    throw new Error("This is a test error!!");
});

// Root route
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

// about route
app.get("/about", (req: Request, res: Response) => {
    res.send("This is the about page");
});

/*
// route with a parameter
app.get("/user/:id", (req:Request, res:Response) => {
    const userId = req.params.id;
    res.send(`User ID: ${userId}`);
});
*/

// Global error handler (placed at bottom of all routes)
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});