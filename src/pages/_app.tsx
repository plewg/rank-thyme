import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "~/utils/api";

import "~/styles/globals.css";

function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps<{ session: Session | null }>) {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}

const App = api.withTRPC(MyApp);
export default App;
