import Link from "next/link";
import { MENU_LIST } from "../icons/Navigations";
import { ListDropdown } from "./ListDropdown";
import { useRouter } from "next/router";
import { GAME_DATABASE } from "@/constants/routes";

interface GameNavigationsProps {
    route?: string;
}

/**
 * Game navigations used in filter layouts
 *
 * @param route Current route
 */
export const GameNavigations: React.FC<GameNavigationsProps> = ({ route }) => {
    const router = useRouter();

    return (
        <ListDropdown
            mobile={{
                title: "Navigation",
                Icon: (
                    <div className="h-full aspect-square rounded-semi bg-white flex">
                        <i className="ri-menu-line m-auto text-lg" />
                    </div>
                ),
            }}
        >
            <div className="flex max-sm:flex-col gap-2 max-sm:w-full sm:h-full max-sm:px-4 font-medium text-sm max-sm:pb-4">
                {MENU_LIST.map(({ tab, Icon, background }) => (
                    <div
                        style={{ color: background }}
                        key={tab}
                        className={`sm:h-full sm:aspect-square max-sm:w-full overflow-hidden`}
                    >
                        {tab === "return" ? (
                            <div
                                className={`cursor-pointer flex gap-6 sm:bg-white sm:brightness-75 sm:hover:brightness-95 rounded-semi h-full w-full p-1.5`}
                                onClick={() => router.back()}
                            >
                                <div className="h-5 sm:h-full aspect-square text-lg">
                                    <Icon />
                                </div>
                                <span className="sm:hidden capitalize">
                                    {tab}
                                </span>
                            </div>
                        ) : (
                            <Link
                                tabIndex={-1}
                                className={`flex gap-6 focus:outline-none sm:bg-white ${
                                    tab === route
                                        ? "sm:brightness-95"
                                        : "sm:brightness-75 sm:hover:brightness-95"
                                } rounded-semi h-full w-full p-1.5`}
                                href={`${GAME_DATABASE}/${tab}`}
                            >
                                <div className="h-5 sm:h-full aspect-square">
                                    <Icon />
                                </div>
                                <span className="sm:hidden capitalize">
                                    {tab}
                                </span>
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </ListDropdown>
    );
};
