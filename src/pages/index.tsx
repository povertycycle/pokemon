import Link from "next/link";

/**
 * Root app page containing visit page button
 */
export default function Page() {
    const PROFILE = "https://povertycycle.github.io/povertycycle/";

    return (
        <Link
            href={PROFILE}
            target="_blank"
            className={`top-0 rounded-br-md pl-2 pr-3 left-0 flex gap-2 items-center z-10 bg-black/50 sm:hover:bg-white sm:hover:text-base-red-8 transition-colors text-white font-medium fixed`}
        >
            <i className="ri-corner-up-left-fill text-base sm:text-lg" />
            <span className="text-xs sm:text-sm">Visit My Page</span>
        </Link>
    );
}
