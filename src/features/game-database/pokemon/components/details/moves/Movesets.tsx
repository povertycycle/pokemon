import { PaletteContext } from "@/stores/contexts";
import { useContext, useState } from "react";
import { Move } from "./Move";

type MovesetProps = {
    version: string;
    method: string;
    moves: (string | number)[];
};

export const Moveset: React.FC<MovesetProps> = ({ version, method, moves }) => {
    const {
        dark: { background },
    } = useContext(PaletteContext);
    const { description, icon, title } = METHODS[method];

    return (
        <div className="flex flex-col w-full sm:break-inside-avoid-column">
            <div className="w-full flex flex-col">
                <div
                    className="section__header--default"
                    style={{ borderColor: background }}
                >
                    <i className={icon} style={{ color: background }} /> {title}
                </div>
                <span className="text-xxs sm:text-xs py-1 px-2 font-medium">
                    {description}
                </span>
            </div>
            <div className="flex flex-col mt-2">
                {moves
                    .sort(
                        (a, b) =>
                            (typeof a === "string"
                                ? parseInt(a.split("@")[1])
                                : a) -
                            (typeof b === "string"
                                ? parseInt(b.split("@")[1])
                                : b)
                    )
                    .map((move, i) => {
                        const { id, level } = getMoveId(move);

                        return (
                            <div
                                key={move}
                                className="flex items-center justify-center w-full overflow-hidden relative"
                                style={{
                                    backgroundColor: `${background}${
                                        i % 2 === 0 ? "1a" : "0d"
                                    }`,
                                }}
                            >
                                <Move id={id} level={level} version={version} />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

/**
 * Method data
 */
const METHODS: Record<
    string,
    { icon: string; title: string; description: string }
> = {
    egg: {
        icon: "ri-seedling-fill",
        title: "Egg",
        description:
            "Appears on a newly-hatched Pokémon, if the father had the same move",
    },
    "level-up": {
        icon: "ri-flashlight-fill",
        title: "Level Up",
        description: "Learned when a Pokémon reaches a certain level",
    },
    machine: {
        icon: "ri-computer-fill",
        title: "Machine",
        description: "Can be taught at any time by using a TM or HM",
    },
    tutor: {
        icon: "ri-presentation-fill",
        title: "Tutor",
        description: "Can be taught at any time by an NPC",
    },
    "stadium-surfing-pikachu": {
        icon: "ri-flood-line",
        title: "Stadium: Surfing Pikachu",
        description:
            "Learned when a non-rental Pikachu helps beat Prime Cup Master Ball R-2. It must participate in every battle, and you must win with no continues",
    },
    "light-ball-egg": {
        icon: "ri-sun-fill",
        title: "Volt Tackle Pichu",
        description:
            "Appears on a Pichu whose mother was holding a Light Ball. The father cannot be Ditto",
    },
    "colosseum-purification": {
        icon: "ri-ancient-gate-fill",
        title: "Colosseum: Purification",
        description:
            "Appears on a Shadow Pokémon as it becomes increasingly purified",
    },
    "xd-shadow": {
        icon: "ri-eye-fill",
        title: "XD: Shadow",
        description: "Appears on a Snatched Shadow Pokémon",
    },
    "xd-purification": {
        icon: "ri-sparkling-2-fill",
        title: "XD: Purification",
        description:
            "Appears on a Shadow Pokémon as it becomes increasingly purified",
    },
    "form-change": {
        icon: "ri-loop-right-line",
        title: "Form Change",
        description:
            "Appears when Rotom or Cosplay Pikachu changes form. Disappears if the Pokémon becomes another form and this move can only be learned by form change",
    },
    "zygarde-cube": {
        icon: "ri-box-3-fill",
        title: "Zygarde Cube",
        description:
            "Can be taught using the Zygarde Cube. Must find the corresponding Zygarde Core first in Sun/Moon. All moves are available immediately in Ultra Sun/Ultra Moon",
    },
};

/**
 * Helper function to get move id
 */
function getMoveId(move: string | number): { id: number; level?: number } {
    let id: number, level: number;
    if (typeof move === "number") {
        return {
            id: move,
        };
    } else if (typeof move === "string") {
        const [stringId, stringLevel] = move.split("@");
        return {
            id: parseInt(stringId),
            level: parseInt(stringLevel),
        };
    } else {
        return {
            id: -1,
        };
    }
}
