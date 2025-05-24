import { GAME_DATABASE } from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import { MENU_LIST } from "../icons/Navigations";

interface GameLayoutProps {
    children: React.ReactNode;
}

/**
 * Layout for any game subdirectory
 */
export const GameLayout: React.FC<GameLayoutProps> = ({ children }) => {
    return (
        <div className="w-full h-full flex flex-col bg-base-white">
            <NavigationOverlay />
            <div className="flex flex-col w-full h-full overflow-hidden">
                {children}
            </div>
        </div>
    );
};

/**
 * Overlay for navigating game menu
 */
const NavigationOverlay: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();
    const isTabActive = pathname?.endsWith(GAME_DATABASE);

    /**
     * Helper to generate transition on page state change
     * @param isActive Tab active state
     * @param index Tab index
     * @returns Tailwind string
     */
    function generateTransition(index: number) {
        return !!isTabActive
            ? "max-xl:translate-x-0 xl:translate-y-0"
            : index % 2 === 0
            ? "max-xl:translate-x-full xl:translate-y-full"
            : "max-xl:-translate-x-full xl:-translate-y-full";
    }

    return (
        <div className="absolute flex max-xl:flex-col top-0 left-0 h-dvh w-0 xl:h-0 xl:w-screen bg-base-white z-40">
            {MENU_LIST.map(({ tab, Icon, color, background }, i) => {
                const style = {
                    transitionDelay: `${i * 50}ms`,
                    color,
                };
                const className = `${generateTransition(
                    i
                )} focus:outline-none group flex h-full w-screen xl:h-screen xl:w-full transition-transform duration-500 relative bg-white`;
                const component = (
                    <div
                        style={{
                            background,
                        }}
                        className="w-full h-full flex flex-col gap-2 sm:gap-3 xl:gap-6 m-auto items-center justify-center relative sm:group-hover:brightness-95 sm:brightness-[0.65] duration-150 transition-filter"
                    >
                        <div className="aspect-square w-6 sm:w-7 xl:w-20 text-xl sm:text-2xl xl:text-7xl">
                            <Icon />
                        </div>
                        <span className="font-medium capitalize text-xs sm:text-sm xl:text-2xl tracking-wide">
                            {tab}
                        </span>
                    </div>
                );

                return tab === "return" ? (
                    <div
                        key={tab}
                        onClick={() => router.back()}
                        className={`cursor-pointer ${className}`}
                        style={style}
                    >
                        {component}
                    </div>
                ) : (
                    <Link
                        tabIndex={-1}
                        prefetch={false}
                        shallow={true}
                        href={`${GAME_DATABASE}/${tab}`}
                        key={tab}
                        className={className}
                        style={style}
                    >
                        {component}
                    </Link>
                );
            })}
        </div>
    );
};
