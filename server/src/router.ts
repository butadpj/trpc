import { initTRPC } from "@trpc/server";
import z from "zod";

let idIncrement = 1;

interface User {
    id: number;
    name: string;
}

const users: User[] = [
    {
        id: idIncrement,
        name: "KATT",
    },
];

const trpc = initTRPC.create();

const trpcRouter = trpc.router({
    allUsers: trpc.procedure.query(() => {
        return users;
    }),
    userById: trpc.procedure.input(z.number()).query((req) => {
        const { input } = req;

        const user = users.find((user) => user.id === input);

        return user;
    }),
    createUser: trpc.procedure
        .input(z.object({ name: z.string() }))
        .mutation((req) => {
            const id = idIncrement++;

            const user: User = {
                id,
                name: req.input.name,
            };

            users.push(user);
            return user;
        }),
});

export type TRPCRouter = typeof trpcRouter;
export default trpcRouter;
