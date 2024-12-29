import { useItemSprite } from "@/common/hooks/game/useItemSprite"
import { capitalize } from "@/common/utils/string"
import Image from "next/image"
import { useContext } from "react"
import { PaletteContext } from "../_utils"

type HeldItemsProps = {
    itemIDs: string[]
}

const HeldItems: React.FC<HeldItemsProps> = ({ itemIDs }) => {
    const { palette } = useContext(PaletteContext);

    return (
        <div className={`flex flex-col`}>
            <div className="section__header--default sm:justify-end" style={{ borderColor: palette[1] }}>Held Item(s)</div>
            <div className="w-full flex p-2 gap-2 sm:justify-end">
                {
                    itemIDs.map(itemID => (
                        <ItemSprite id={itemID} key={itemID} />
                    ))
                }
            </div>
        </div>
    )
}

export default HeldItems;

const ItemSprite: React.FC<{ id: string }> = ({ id }) => {
    const { name, sprite } = useItemSprite(id);

    return (
        <div className="flex items-center justify-center">
            {
                !!sprite ?
                    <div tabIndex={0} className="flex group/item gap-2 items-center">
                        <Image title={capitalize(name)} width={36} height={36} alt="" src={sprite} className="h-[36px] w-[36px]" />
                        <span className="max-sm:group-focus/item:flex hidden">{capitalize(name)}</span>
                    </div> :
                    <i className="ri-question-mark text-[2rem]" />
            }
        </div>
    )
}
