import { PaletteContext } from "@/stores/contexts";
import { useContext, useState } from "react";

/**
 * Bookmark typings
 */
type Bookmark =
    | "flavor"
    | "effectiveness"
    | "stats"
    | "species"
    | "abilities"
    | "forms"
    | "moves"
    | "encounters"
    | "bug-reports";

/**
 * Bookmark icon and id
 */
export const BOOKMARK_DATA: Record<Bookmark, { icon: string; id: string }> = {
    flavor: {
        icon: "ri-double-quotes-r",
        id: "hOASEz102uMjCETDkIsCT3K7xyMUUTeG",
    },
    effectiveness: {
        icon: "ri-fire-fill",
        id: "zyDQ7LRRURXfwVKHmF2OiWkI5PaydPoM",
    },
    stats: {
        icon: "ri-bar-chart-horizontal-fill",
        id: "z9CLCg0crhswKgmiUMo0QlnIrkLtrFFE",
    },
    species: {
        icon: "ri-info-i",
        id: "MFYDhCQCTFo8hFNwEZwq21s3IeLUzBmj",
    },
    abilities: {
        icon: "ri-leaf-fill",
        id: "VrXWgWQLkf59OQj7MD2hzlasqZPcLkTb",
    },
    forms: {
        icon: "ri-recycle-fill",
        id: "mcKvPUTPtI3lSPjUiUgD5TUV8rSUTvXf",
    },
    moves: {
        icon: "ri-boxing-fill",
        id: "0HehCrr6obHw3zZansZl4EE9QzxdXTlW",
    },
    encounters: {
        icon: "ri-map-pin-2-fill",
        id: "XcWiOkm1OTvPYYzGFcX6zCjpjZzxAESj",
    },
    "bug-reports": {
        icon: "ri-bug-fill",
        id: "LPkr8QlmIA5QL3A5nvFqYweYbvNTWP0m",
    },
};

/**
 * Bookmark shortcuts
 */
export const Bookmarks: React.FC = () => {
    const [show, setShow] = useState<boolean>(false);
    const { dark, light } = useContext(PaletteContext);

    return (
        <div className="max-sm:w-8 flex sm:h-full sm:fixed sm:left-0 sm:pt-14 sm:top-0">
            <div
                onClick={() => {
                    setShow(true);
                }}
                className="sm:hidden h-full aspect-square rounded-semi bg-white flex"
            >
                <i className="ri-bookmark-2-fill m-auto text-lg" />
            </div>
            <div
                onClick={() => {
                    setShow(false);
                }}
                style={{
                    color: dark.background,
                }}
                className={`${
                    show
                        ? "max-sm:max-h-dvh"
                        : "max-sm:max-h-0 max-sm:delay-500"
                } max-sm:w-full max-sm:fixed max-sm:bottom-0 max-sm:left-0 h-dvh sm:h-full max-sm:z-50 max-sm:flex max-sm:flex-col max-sm:justify-end max-sm:overflow-hidden`}
            >
                <div
                    className={`${
                        show ? "opacity-100" : "opacity-0"
                    } transition-opacity duration-200 ease-in sm:hidden absolute w-full h-full bg-black/65 top-0 left-0 z-0`}
                />
                <div
                    className={`mobile__template--card sm:items-end ${
                        show ? "max-sm:max-h-dvh" : "max-sm:max-h-0"
                    }`}
                >
                    <div className="px-6 py-5 text-base sm:hidden w-full flex justify-between font-medium tracking-wide">
                        <span>Jump To</span>
                        <i className="cursor-pointer ri-close-line" />
                    </div>
                    <div className="font-medium text-sm sm:py-16 sm:h-full w-full flex sm:justify-between flex-col sm:items-start gap-4 max-sm:px-4 whitespace-nowrap max-sm:pb-8">
                        {Object.entries(BOOKMARK_DATA).map(
                            ([key, { icon, id }]) => {
                                return (
                                    <div
                                        onClick={() => {
                                            document
                                                .getElementById(id)
                                                ?.scrollIntoView({
                                                    block: "nearest",
                                                    inline: "end",
                                                });
                                        }}
                                        style={{
                                            borderColor: dark.background,
                                        }}
                                        key={key}
                                        className="max-sm:w-full flex items-center gap-4 px-1 sm:pl-1.5 sm:border-r sm:border-y sm:pr-6 h-8 overflow-hidden sm:hover:max-w-80 cursor-pointer sm:max-w-8 transition-max-width relative bg-white"
                                    >
                                        <i className={`${icon} text-lg`} />
                                        <span className="capitalize">
                                            {key.replaceAll("-", " ")}
                                        </span>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
