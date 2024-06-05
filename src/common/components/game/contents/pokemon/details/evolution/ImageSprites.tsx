import { useSprites } from "@/common/components/game/hooks/useSprites";
import { capitalize } from "@/common/utils/capitalize";
import Image from "next/image";

const ImageSprites: React.FC<{ id: string, type: "species" | "item" }> = ({ id, type }) => {
    const { name, url } = useSprites(type, id);

    return (
        <div className="w-[56px] flex flex-col text-base leading-6 text-center items-center">
            <div className="w-full aspect-square rounded-[4px]">
                {url && <Image width={56} height={56} loading="lazy" alt="" src={url} className="w-full h-full" />}
            </div>
            <span className="text-[0.875rem] whitespace-nowrap">{capitalize(name)}</span>
        </div>
    )
}

export default ImageSprites;