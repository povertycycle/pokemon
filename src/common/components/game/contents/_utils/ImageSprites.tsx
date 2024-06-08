import { useSprites } from "@/common/components/game/hooks/useSprites";
import { capitalize } from "@/common/utils/capitalize";
import Image from "next/image";
import Loading from "../../utils/Loading";

const ImageSprites: React.FC<{ id: string | null, type: "species" | "item", minified?: boolean }> = ({ id, type, minified }) => {
    const { name, url } = useSprites(type, id);

    return (
        <div className="w-[56px] flex flex-col text-base leading-6 text-center items-center">
            <div title={!!minified ? capitalize(name) : undefined} className="w-full aspect-square rounded-[4px] flex items-center justify-center">
                {
                    url === undefined ?
                        <div className="w-full h-full">
                            <Loading size={56} />
                        </div> :
                        (
                            !!url ?
                                <Image width={56} height={56} loading="lazy" alt="" src={url} className="w-full h-full" /> :
                                <i className="ri-question-mark text-[2rem]" />
                        )

                }
            </div>
            {!!!minified && <span className="text-[0.875rem] whitespace-nowrap">{capitalize(name)}</span>}
        </div>
    )
}

export default ImageSprites;