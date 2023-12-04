import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import dotenv from 'dotenv';
import initMongoDB from './lib/integrations/mongodb.js';
dotenv.config();

export const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => ({});
type Context = inferAsyncReturnType<typeof createContext>;
export const t = initTRPC.context<Context>().create();

export const { db, mongo } = await initMongoDB()
