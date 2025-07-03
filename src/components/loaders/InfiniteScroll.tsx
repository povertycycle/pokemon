import { useInView } from "@/utils/hooks";

type InfiniteScrollProps = {
    hasNext: boolean;
    fetchNext: () => void;
    children: React.ReactNode;
};

/**
 * Infinite scroll custom component that fetches on into view
 *
 * @param hasNext Truth check to fetch next set of data
 * @param fetchNext Function to get next set of data
 * @param children Display data
 * @param scrollRef Optional reference element for scroll container
 */
export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
    hasNext,
    fetchNext,
    children,
}) => {
    return (
        <div className={`w-full h-fit flex flex-col items-center`}>
            {children}
            {hasNext ? (
                <Fetcher hasNext={hasNext} fetchNext={fetchNext} />
            ) : (
                <span className="text-center text-sm sm:text-base py-4 sm:py-8 italic text-black/75">
                    All data fetched
                </span>
            )}
        </div>
    );
};

const Fetcher: React.FC<{ hasNext: boolean; fetchNext: () => void }> = ({
    hasNext,
    fetchNext,
}) => {
    const ref = useInView({
        onIntoView: () => {
            if (hasNext) fetchNext();
        },
        keep: true,
    });
    return <div ref={ref} className="h-36 w-full shrink-0" />;
};
