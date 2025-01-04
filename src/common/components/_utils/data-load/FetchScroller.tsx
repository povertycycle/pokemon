import { RefObject, UIEvent } from "react";

type FetchScrollerProps = {
    ref: RefObject<HTMLDivElement>;
    hasNext: boolean;
    fetchNext: () => void;
    endOfLine?: React.ReactNode;
    children: React.ReactNode;
    type: string;
}

const FetchScroller: React.FC<FetchScrollerProps> = ({ ref, hasNext, fetchNext, endOfLine, children, type }) => {
    function handleFetch(e: UIEvent<HTMLDivElement>) {
        const THRESHOLD_HEIGHT = 128;
        const elem = (e.target as HTMLDivElement);
        if (elem.scrollHeight - elem.scrollTop - window.innerHeight < THRESHOLD_HEIGHT && hasNext) {
            fetchNext();
        }
    }

    return (
        <div ref={ref} onScroll={hasNext ? handleFetch : undefined} className={`w-full h-full overflow-y-scroll flex flex-col items-center`}>
            {children}
            {
                hasNext ?
                    <div className="h-[128px]" /> :
                    (
                        endOfLine ?? <span className="text-center text-[1.25rem] sm:text-[1.5rem] pt-4 pb-8 sm:py-4">-- All {type} fetched --</span>
                    )
            }
        </div>
    )
}

export default FetchScroller;