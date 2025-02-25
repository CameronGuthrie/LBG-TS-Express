import { Request, Response, Router } from "express";

const router = Router();

interface User {
    id: number;
    name: string;
    age: number;
}

const users: User[] = [
    { id: 1, name: "Cameron", age: 32},
    { id: 2, name: "Jordan", age: 30}
];


/*

            READ Methods

*/

// GET /users
router.get("/", (req:Request, res:Response) => {
    res.json(users);
});

// GET /users/:id
router.get("/:id", (req:Request, res:Response) => {
    const userId = req.params.id;
    const user = users.find((arrayObject) => arrayObject.id === Number(userId));

    if (!user) {
        res.status(404).json({message : `user ${userId} not found`});
    } else {
        res.json(user);
    }
});

export default router;