import { useState, useEffect } from "react";
import { CACHE_PERMISSION_ID, CACHE_STATUS, DISABLE_CACHE_QUERY, QUERY_STATUS } from "./constants";

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
        setShouldAsk(false);
    }

    const setPartial = () => {
        localStorage.setItem(CACHE_PERMISSION_ID, CACHE_STATUS.PARTIAL);
        disableCacheQuery();
    }

    const setAllow = () => {
        localStorage.setItem(CACHE_PERMISSION_ID, CACHE_STATUS.ALLOW);
        disableCacheQuery();
    }

    return (
        shouldAsk &&
        <div className="absolute bottom-0 left-0 bg-base-white border-base-red-dark border-t-2 border-r-2 rounded-tr-[16px] p-4 text-[0.875rem]">
            <span className="absolute w-full leading-4 text-base">This website uses caching to store the Pokemon data for a better user experience.</span>
            <div className="w-full flex gap-4 mt-12 justify-end">
                <button onClick={disableCacheQuery} className="w-[172px] flex items-center justify-center px-4 rounded-[6px] border-2 border-base-red-dark transition-colors hover:bg-base-red-dark hover:text-white">Don't Ask Again</button>
                <button onClick={setPartial} className="w-[172px] flex items-center justify-center px-4 rounded-[6px] border-2 border-base-red-dark transition-colors hover:bg-base-red-dark hover:text-white">Partial</button>
                <button onClick={setAllow} className="w-[172px] flex items-center justify-center px-4 rounded-[6px] border-2 border-base-red-dark text-white bg-base-red-dark hover:bg-base-white hover:text-black transition-colors">Allow All</button>
            </div>
        </div>
    )
}

export default AskCache;