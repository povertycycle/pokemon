import { UIEvent } from "react";

type FetchScrollerProps = {
    hasNext: boolean;
    fetchNext: () => void;
    endOfLine?: React.ReactNode;
    children: React.ReactNode;
}

const FetchScroller: React.FC<FetchScrollerProps> = ({ hasNext, fetchNext, endOfLine, children }) => {
    function handleFetch(e: UIEvent<HTMLDivElement>) {
        const THRESHOLD_HEIGHT = 128;
        const elem = (e.target as HTMLDivElement);
        if (elem.scrollHeight - elem.scrollTop - window.innerHeight < THRESHOLD_HEIGHT && hasNext) {
            fetchNext();
        }
    }

    return (
        <div onScroll={hasNext ? handleFetch : undefined} className={`w-full h-full overflow-y-scroll flex flex-col items-center`}>
            {children}
            {
                hasNext ?
                    <div className="h-[128px]" /> :
                    (
                        endOfLine ?? <span className="text-center text-[1.25rem] sm:text-[1.5rem] pt-4 pb-8 sm:py-4">-- All pokemon fetched --</span>
                    )
            }
        </div>
    )
}

export default FetchScroller;