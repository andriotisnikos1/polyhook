import "./central.config.js"
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import root from "./rest/root.js";
import trpc_root from "./trpc/trpc_root.js";
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import { createContext } from "./central.config.js";

export const appRouter = trpc_root;
export type AppRouter = typeof trpc_root;

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/rest", root)
app.use("/trpc", createExpressMiddleware({ router: trpc_root, createContext: createContext }))

const port = process.env.NODE_ENV === 'prd' ? (process.env.PORT || (() => {
    console.error('PORT must be defined');
    return 3002;
})()) : 3002;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
