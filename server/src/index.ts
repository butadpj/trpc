import express, { Application } from "express";
import trpcRouter from "./router";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";

const app: Application = express();

const createContext = ({}: trpcExpress.CreateExpressContextOptions) => ({});

app.use(express.json());

app.use(cors());

app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
        router: trpcRouter,
        createContext,
    })
);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
