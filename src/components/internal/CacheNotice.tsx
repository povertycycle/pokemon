import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Cache constants
 */
const CACHE_NOTICE_ID = "H2J9Rtp41OUPGHZtOrlvbAEXzTfExbn0";

/**
 * Acknoledgement status
 */
enum Status {
    Unread = "0",
    Read = "1",
}

/**
 * Cache notice for user
 */
export const CacheNotice: React.FC = () => {
    const [shouldNotify, setShouldNotify] = useState<Status>(Status.Unread);

    useEffect(() => {
        const status = localStorage.getItem(CACHE_NOTICE_ID) ?? Status.Unread;
        setShouldNotify(status as Status);
    }, []);

    const setAcknowledge = () => {
        localStorage.setItem(CACHE_NOTICE_ID, Status.Read);
        setShouldNotify(Status.Read);
    };

    return (
        shouldNotify !== Status.Read && (
            <div className="fixed max-sm:w-screen z-max bottom-0 sm:max-w-screen-xs left-0 bg-base-white flex flex-col gap-4 items-end sm:rounded-tr-2xl max-sm:p-3 sm:py-4 sm:pr-6 sm:pl-5">
                <div className="font-medium text-xs sm:text-sm flex flex-col gap-2">
                    <span>
                        This website uses local caching system to store data and
                        reduce API costs of{" "}
                        <Link
                            className="underline"
                            target="_blank"
                            href="https://pokeapi.co/"
                        >
                            https://pokeapi.co/
                        </Link>
                        .
                    </span>
                    <span>
                        Please acknowledge this notice for your best viewing
                        experience.
                    </span>
                </div>
                <button
                    onClick={setAcknowledge}
                    className="text-xs sm:text-sm h-7 sm:h-8 px-3 sm:px-4 rounded-md font-bold tracking-wide text-white bg-base-red-8"
                >
                    Acknowledge
                </button>
            </div>
        )
    );
};
