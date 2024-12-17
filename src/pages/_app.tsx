import Loading from "@/common/components/_utils/Loading";
import Unavailable from "@/common/components/Unavailable";
import { useBuildIDB } from "@/common/hooks/useBuildIDB";
import "@/common/styles/global.scss";
import { BASE_API_URL_POKEMON } from "@/common/constants/urls";
import type { AppProps } from 'next/app'
import Head from "next/head";
import styles from "@/common/styles/transitions.module.scss";

export default function App({ Component, pageProps }: AppProps) {
    const { error } = useBuildIDB();

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Pokemon Database for Game & TCG</title>
                <meta property="og:title" content="Pokemon Game & TCG Database" key="title" />
                <meta name="googlebot" content="notranslate"></meta>
                <meta name="keywords" content="pokemon,database,tcg,stylistic,simple,lightweight" />
            </Head>
            {
                error === undefined ?
                    <div className={`${styles.fadeIn} w-screen h-dvh sm:h-screen text-white flex flex-col font-default items-center justify-center`}>
                        <Loading progress />
                    </div> :
                    (
                        !!error ?
                            <div className="w-screen h-dvh sm:h-screen text-white font-default">
                                <Unavailable error={error} url={BASE_API_URL_POKEMON} />
                            </div> :
                            <Component {...pageProps} />
                    )
            }
        </>
    )
}