import { useContext, useEffect, useState } from "react"
import { DetailsContext } from "../../contexts"
import { useSprites } from "@/common/components/game/hooks/useSprites"
import { capitalize } from "@/common/utils/capitalize"
import Image from "next/image"

type HeldItemsProps = {
    data: string[]
}

const HeldItems: React.FC<HeldItemsProps> = ({ data }) => {
    const { palette } = useContext(DetailsContext);

    return (
        <div className={`w-[20vw] border-b-2 border-x-2 transition-height flex flex-col overflow-hidden z-[2] ${data.length > 0 ? "h-[88px] shadow-[-2px_4px_6px_2px_#00000080]" : "h-0"}`} style={{ borderColor: data.length > 0 ? palette[0] : "transparent" }}>
            <div className="w-full flex gap-2 justify-center items-center">
                {
                    data.map((id: string, i: number) => (
                        <Item id={id} key={i} />
                    ))
                }
            </div>
            <div className="w-full text-base bg-black/50 flex justify-center h-[24px] border-t" style={{ borderColor: palette[0] }}>Held items</div>
        </div>
    )
}

const Item: React.FC<{ id: string }> = ({ id }) => {
    const { name, url } = useSprites("item", id);

    return (
        <div className="h-[64px] aspect-square flex items-center justify-center" title={capitalize(name)}>
            {
                url ?
                    <Image width={64} height={64} alt="" src={url} className="w-full h-full" /> :
                    <i className="ri-question-mark text-[2rem]" />
            }
        </div>
    )
}

export default HeldItems;