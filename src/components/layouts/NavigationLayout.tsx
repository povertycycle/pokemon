import { MENU_LIST } from "../icons/Navigations";
import { GameNavigations } from "../internal/GameNavigations";

interface NavigationLayout {
    route: string;
    children: React.ReactNode;
}

/**
 * Layout for header filter with navigation in game pages
 * @param route Route the filter is used at
 * @param children Filter contents on the header
 */
export const NavigationLayout: React.FC<NavigationLayout> = ({
    route,
    children,
}) => {
    const current = MENU_LIST.find((menu) => menu.tab === route);
    if (!current) {
        return <b className="text-base-red-8">[Error]: FL-20</b>;
    }

    return (
        <div
            className="w-full shrink-0 h-14 flex sticky top-0 left-0 z-10"
            style={{
                background: current.background,
            }}
        >
            <div className="flex justify-between h-full w-full mx-auto max-w-screen-xl p-3 gap-3">
                <div className="h-full grow">{children}</div>
                <GameNavigations route={route} />
            </div>
        </div>
    );
};
