import { PaletteContext } from "@/stores/contexts";
import { useContext } from "react";
import { ItemSprite } from "../ItemSprite";

type HeldItemsProps = {
    items: number[];
};

/**
 * List of held items by the Pokemon
 */
export const HeldItems: React.FC<HeldItemsProps> = ({ items }) => {
    const { dark } = useContext(PaletteContext);

    return (
        <div className={`flex flex-col items-end`}>
            <div
                className="section__header--default sm:justify-end"
                style={{ borderColor: dark.background }}
            >
                <i className="ri-plant-fill" />
                Held Item(s)
            </div>
            <div className="w-full flex flex-wrap p-2 gap-2 sm:justify-end">
                {items.map((id) => (
                    <ItemSprite id={id} key={id} />
                ))}
            </div>
        </div>
    );
};
