import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../../api/src/index.js";

export default createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: "https://api.polyhook.me/trpc"
        })
    ]
})