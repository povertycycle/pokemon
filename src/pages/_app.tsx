import { Unavailable } from "@/components/errors/Unavailable";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Spinner } from "@/components/loaders/Spinner";
import { BASE_API_URL_POKEMON } from "@/constants/game/urls";
import { ErrorString } from "@/interfaces/generic";
import { initCacheRegistry, validateGameDatabase } from "@/requests/main";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import "@/styles/global.scss";

/**
 * Base app component
 */
export default function App({ Component, pageProps }: AppProps) {
    const [progress, setProgress] = useState<string[]>([]);
    const [error, setError] = useState<ErrorString>();

    async function setupWorker(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if ("serviceWorker" in navigator) {
                return navigator.serviceWorker
                    .register("/pokemon/pokeapi-js-wrapper-sw.js", {
                        scope: "/pokemon/",
                    })
                    .then((res) => {
                        resolve(true);
                    })
                    .catch((err) => {
                        reject(err?.message ?? "[Error]: SW-27");
                    });
            } else {
                resolve(false);
            }
        });
    }

    async function setupCache() {
        initCacheRegistry()
            .then((res) => {
                setProgress((prev) =>
                    prev.concat(["Storage successfully setup..."])
                );
                return validateGameDatabase();
            })
            .then((res) => {
                if (!!res) throw new Error(res);

                setProgress((prev) =>
                    prev.concat(["Database successfully validated..."])
                );
                return setupWorker();
            })
            .then((res) => {
                let message = res
                    ? "Image caching successfully installed..."
                    : "No service worker found; proceeding...";

                setProgress((prev) => prev.concat([message]));
                setError(null);
            })
            .catch((err) => {
                setError(err.message ?? "[Error]: UB-53");
            });
    }

    useEffect(() => {
        if (error === undefined) {
            setupCache();
        }
    }, []);

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>Pokemon Database for Game & TCG</title>
                <meta
                    property="og:title"
                    content="Pokemon Game & TCG Database"
                    key="title"
                />
                <meta name="googlebot" content="notranslate"></meta>
                <meta
                    name="keywords"
                    content="pokemon,database,tcg,stylistic,simple,lightweight"
                />
            </Head>
            <div className="w-screen h-dvh sm:h-screen bg-base-white flex font-default">
                {error === undefined ? (
                    <ProgressDisplay progress={progress} />
                ) : !!error ? (
                    <div className="text-white w-full h-full flex">
                        <Unavailable error={error} url={BASE_API_URL_POKEMON} />
                    </div>
                ) : (
                    <PageLayout>
                        <Component {...pageProps} />
                    </PageLayout>
                )}
            </div>
        </>
    );
}

/**
 * Display progress loading status
 * @param progress Message string list
 */
const ProgressDisplay: React.FC<{ progress: string[] }> = ({ progress }) => {
    return (
        <div className="flex flex-col h-fit m-auto text-black">
            <Spinner color="light" size={72} />
            <div className="flex flex-col mt-8 gap-1 font-medium sm:text-lg xl:text-xl">
                {progress.map((message) => (
                    <span key={message}>
                        <i className="ri-check-line text-[#4E8234]" /> {message}
                    </span>
                ))}
            </div>
        </div>
    );
};
