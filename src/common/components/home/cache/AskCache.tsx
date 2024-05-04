import { useState, useEffect } from "react";
import { CACHE_PERMISSION_ID, CACHE_STATUS, DISABLE_CACHE_QUERY, QUERY_STATUS } from "../../constants";
import { createPortal } from "react-dom";

const AskCache: React.FC = () => {
    const [shouldAsk, setShouldAsk] = useState<boolean>(false);

    useEffect(() => {
        if (localStorage.getItem(CACHE_PERMISSION_ID) === CACHE_STATUS.ALLOW || localStorage.getItem(CACHE_PERMISSION_ID) === CACHE_STATUS.PARTIAL || localStorage.getItem(DISABLE_CACHE_QUERY) === QUERY_STATUS.DISABLED) {
            setShouldAsk(false);
        } else {
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
            <div className="fixed font-default z-[1000] bottom-0 left-0 bg-base-white border-base-red-dark border-t-2 border-r-2 rounded-tr-[16px] p-4 text-[0.875rem]">
                <div className="max-w-[548px] w-full flex flex-col leading-4 text-base gap-1">
                    <span>This website uses caching to store the Pokemon data for a better user experience.</span>
                    <span>Allow all or only necessary data to be cached?</span>
                </div>
                <div className="w-full flex gap-4 mt-4 justify-end">
                    <button onClick={disableCacheQuery} className="w-[172px] flex items-center justify-center px-4 rounded-[6px] border-2 border-base-red-dark transition-colors hover:bg-base-red-dark hover:text-white">Don't Ask Again</button>
                    <button onClick={setAllow} className="w-[172px] flex items-center justify-center px-4 rounded-[6px] border-2 border-base-red-dark text-white bg-base-red-dark hover:bg-base-white hover:text-black transition-colors">Allow All</button>
                </div>
            </div>,
            document.body
        )

    )
}

export default AskCache;