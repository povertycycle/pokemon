import { useSprites } from "@/common/components/game/hooks/useSprites";
import { capitalize } from "@/common/utils/capitalize";

const ImageSprites: React.FC<{ id: string, type: "species" | "item" }> = ({ id, type }) => {
    const { name, url } = useSprites(type, id);

    return (
        <div className="w-[64px] flex flex-col text-[1.25rem] leading-6 text-center items-center">
            <div className="w-full aspect-square rounded-[4px]">
                {url && <img alt="" src={url} className="w-full h-full" />}
            </div>
            <span className="whitespace-nowrap">{capitalize(name)}</span>
        </div>
    )
}

export default ImageSprites;