import { Request, Response, NextFunction } from "express";

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void {
    console.error("Error:", err);

    if (err instanceof Error) {
        res.status(500).json({ message: err.message});
    } else {
        res.status(500).json({ message: "an unknown error occurred"});
    }

    next();
}