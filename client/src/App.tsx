import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./utils/trpc";
import { httpBatchLink } from "@trpc/client";

import Hello from "./Hello";

import "./App.css";


function App() {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: "http://localhost:5000/trpc",
                    // headers() {
                    //     return {
                    //         authorization: getAuthCookie(),
                    //     };
                    // },
                }),
            ],
        })
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <Hello />
            </QueryClientProvider>
        </trpc.Provider>
    );
}

export default App;
