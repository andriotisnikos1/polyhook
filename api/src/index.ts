import "./central.config.js"
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import root from "./rest/root.js";
import trpc_root from "./trpc/trpc_root.js";
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import { createContext } from "./central.config.js";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"

export const appRouter = trpc_root;
export type AppRouter = typeof trpc_root;

//----Temp

export const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: "http://localhost:3000/trpc"
        })
    ]
})


//----Temp

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/rest", root)
app.use("/trpc", createExpressMiddleware({ router: trpc_root, createContext: createContext }))

const port = process.env.NODE_ENV === 'production' ? process.env.PORT! : 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
