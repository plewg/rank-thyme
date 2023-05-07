import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html className="h-full">
            <Head>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <body className="mx-auto h-full bg-purple-200 italic">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
