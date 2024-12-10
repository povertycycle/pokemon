import { useState, useEffect } from "react";
import { CACHE_PERMISSION_ID, CACHE_STATUS, DISABLE_CACHE_QUERY, QUERY_STATUS } from "../../../../constants/main";
import { createPortal } from "react-dom";

const AskCache: React.FC = () => {
    const [shouldAsk, setShouldAsk] = useState<boolean>(false);

    useEffect(() => {
        if (localStorage.getItem(CACHE_PERMISSION_ID) !== CACHE_STATUS.ALLOW && localStorage.getItem(CACHE_PERMISSION_ID) !== CACHE_STATUS.PARTIAL && localStorage.getItem(DISABLE_CACHE_QUERY) !== QUERY_STATUS.DISABLED) {
            setShouldAsk(true);
        }
    }, []);

    const disableCacheQuery = () => {
        localStorage.setItem(DISABLE_CACHE_QUERY, QUERY_STATUS.DISABLED);
        localStorage.setItem(CACHE_PERMISSION_ID, CACHE_STATUS.PARTIAL);
        setShouldAsk(false);
    }

    const setAllow = () => {
        localStorage.setItem(DISABLE_CACHE_QUERY, QUERY_STATUS.DISABLED);
        localStorage.setItem(CACHE_PERMISSION_ID, CACHE_STATUS.ALLOW);
        setShouldAsk(false);
    }

    return (
        shouldAsk &&
        createPortal(
            <div className="fixed max-sm:w-screen font-default z-[1000] bottom-0 left-0 bg-base-white-soft sm:rounded-tr-[16px] text-[0.875rem] p-4">
                <div className="max-w-[548px] sm:w-full flex flex-col leading-4 text-base gap-1">
                    <span>This website uses local caching to store the Pokemon data for a better user experience.</span>
                    <span>Allow all or only necessary data to be cached?</span>
                </div>
                <div className="w-full flex gap-4 mt-4 justify-center sm:justify-end text-[1rem] whitespace-nowrap">
                    <button onClick={disableCacheQuery} className="w-full max-w-[196px] flex items-center justify-center px-4 py-1 transition-colors bg-base-white-dark hover:bg-base-white">Don't Ask Again</button>
                    <button onClick={setAllow} className="w-full max-w-[196px] flex items-center justify-center px-4 py-1 text-white bg-base-red-dark hover:bg-base-red transition-colors">Allow All</button>
                </div>
            </div >,
            document.body
        )

    )
}

export default AskCache;