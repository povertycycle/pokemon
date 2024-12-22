import { useContext, useEffect, useState } from "react"
import { PaletteContext } from "../_utils"
import Image from "next/image"
import { GITHUB_ITEM_PATH } from "@/common/constants/urls"
import { ItemDataMini } from "@/common/interfaces/item"
import { getItemSprite } from "@/database/items-db"
import { capitalize } from "@/common/utils/string"

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
    const [data, setData] = useState<ItemDataMini | null>();

    useEffect(() => {
        getItemSprite(id).then(res => {
            setData(res);
        }).catch(err => {
            setData(null);
        })
    }, [id])

    return (
        <div className="flex items-center justify-center">
            {
                !!data?.name ?
                    <div tabIndex={0} className="flex group/item gap-2 items-center">
                        <Image title={capitalize(data.name)} width={36} height={36} alt="" src={`${GITHUB_ITEM_PATH}/${data.name}.png`} className="h-[36px] w-[36px]" />
                        <span className="max-sm:group-focus/item:flex hidden">{capitalize(data.name)}</span>
                    </div> :
                    <i className="ri-question-mark text-[2rem]" />
            }
        </div>
    )
}
