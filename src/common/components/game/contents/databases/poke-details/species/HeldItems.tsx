import { useContext } from "react"
import { PaletteContext } from "../_utils"

type HeldItemsProps = {
    itemIDs: string[]
}

const HeldItems: React.FC<HeldItemsProps> = ({ itemIDs }) => {
    const { palette } = useContext(PaletteContext);

    return (
        <div className={`flex flex-col w-full`}>
            <div className="pl-4 py-1 pr-8 text-[1rem] sm:text-[1.125rem] w-fit sm:w-1/2 whitespace-nowrap font-semibold flex border-b tracking-[1px]" style={{ borderColor: palette[1] }}>Held Item(s)</div>
            <div className="max-sm:mt-3 w-full flex p-2 sm:p-3 gap-2">
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
    return (
        <div className="h-[32px] aspect-square flex items-center justify-center">
            {
                // url ?
                //     <Image width={64} height={64} alt="" src={url} className="w-full h-full" /> :
                //     <i className="ri-question-mark text-[2rem]" />
            }
        </div>
    )
}
