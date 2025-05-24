import { GAME_DATABASE, TCG_DATABASE } from "@/constants/routes";
import Link from "next/link";

type PageSelectorProps = {
    shouldAnimate?: boolean;
};

/**
 * Main page database selector
 *
 * @param shouldAnimate will only animate on into main page or "/" route
 */
export const PageSelector: React.FC<PageSelectorProps> = ({
    shouldAnimate,
}) => {
    const container =
        "group cursor-pointer h-[50dvh] shrink-0 sm:h-[50vh] w-screen overflow-hidden transition-transform duration-500 flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl xl:text-5xl";
    const image =
        "sm:group-hover:scale-[1.01] transition-transform absolute w-full h-full object-cover";
    const text =
        "sm:hover:bg-black/25 sm:text-white/50 sm:hover:text-white transition-colors relative h-full w-full flex items-center justify-center bg-black/35 sm:bg-black/50";

    return (
        <div
            className={`absolute flex flex-col z-50 h-0 left-0 top-0 text-base-white font-vcr-mono`}
        >
            <Link
                tabIndex={-1}
                href={GAME_DATABASE}
                shallow={true}
                className={`${!!shouldAnimate ? `animate-slide-down` : null} ${
                    !shouldAnimate ? "-translate-y-full" : "translate-y-0"
                } ${container}`}
            >
                <img className={image} src="/pokemon/img/mmgs.jpg" alt="" />
                <div className={text}>Game Database</div>
            </Link>
            <Link
                tabIndex={-1}
                href={TCG_DATABASE}
                shallow={true}
                className={`${!!shouldAnimate ? `animate-slide-up` : null} ${
                    !shouldAnimate ? "translate-y-full" : "translate-y-0"
                } ${container}`}
            >
                <img className={image} src="/pokemon/img/mmcs.jpg" alt="" />
                <div className={text}>TCG Database</div>
            </Link>
        </div>
    );
};
