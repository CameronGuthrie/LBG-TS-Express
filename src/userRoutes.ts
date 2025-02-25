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

            CREATE Method

*/

// POST to /users
router.post("/", (req:Request, res: Response) => {
    const { name, age } = req.body;

    if (!name || !age) {
        res.status(400).json({ message: `name and age are required` });
    } else {

        const newUser: User = {
            id: users.length + 1,
            name,
            age: Number(age)
        }

        users.push(newUser);
        res.status(201).json(newUser);

    }
})


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

/*

            UPDATE Method

*/

// PUT at /users/:id
router.put("/:id", (req:Request, res: Response) => {
    const userId = req.params.id;
    const { name, age } = req.body;
    const user = users.find((arrayObject) => arrayObject.id === Number(userId));

    if (!user) {
        res.status(404).json({message: "user not found!!!!"});
    } else {
        user.name = name || user.name; // truthy falsey OR
        user.age = age ? Number(age) : user.age; // ternary if statement
       
        /*
            if (age == true) {
                user.age = Number(age);
            } else {
                user.age = user.age;
            }
        */

        res.json(user);
    }

})

/*

            DELETE Method

*/

// DELETE /users/:id
router.delete("/:id", (req:Request, res:Response) => {
    const userId = req.params.id;
    const index = users.findIndex((arrayObject) => arrayObject.id === Number(userId));

    if (index === -1) {
        res.status(404).json({ message: "user not found" })
    } else {
        users.splice(index, 1);
        res.status(204).send();
    }

});

export default router;

// FALSEY THINGS

// '', ``, "", 0, false, undefined, null, NaN