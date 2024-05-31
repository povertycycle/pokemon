import "@/common/styles/global.scss";
import type { AppProps } from 'next/app'
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Pokemon Database for Game & TCG</title>
                <meta property="og:title" content="Pokemon Game & TCG Database" key="title" />
                <meta name="googlebot" content="notranslate"></meta>
                <meta name="keywords" content="pokemon,database,tcg,stylistic,simple,lightweight" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}