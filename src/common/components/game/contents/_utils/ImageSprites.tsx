import Loading from "@/common/components/_utils/Loading";
import { capitalize } from "@/common/utils/string";
import Image from "next/image";

const ImageSprites: React.FC<{ id: string | null, type: "species" | "item", minified?: boolean }> = ({ id, type, minified }) => {

    return (
        <div className="w-[56px] flex flex-col text-base leading-6 text-center items-center">
            {/* <div title={!!minified ? capitalize(name) : undefined} className="w-full aspect-square rounded-[4px] flex items-center justify-center">
                {
                    url === undefined ?
                        <div className="w-full h-full">
                            <Loading />
                        </div> :
                        (
                            !!url ?
                                <Image width={56} height={56} loading="lazy" alt="" src={url} className="w-full h-full" /> :
                                <i className="ri-question-mark text-[2rem]" />
                        )

                }
            </div>
            {!!!minified && <span className="text-[0.875rem] whitespace-nowrap">{capitalize(name)}</span>} */}
        </div>
    )
}

export default ImageSprites;