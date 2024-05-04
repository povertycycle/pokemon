import { Dispatch, SetStateAction } from "react";
import { VERSION_NAME } from "./constants";

type VersionSelectorProps = {
    versions: string[],
    active: string,
    setActive: Dispatch<SetStateAction<string>>
}


const VersionSelector: React.FC<VersionSelectorProps> = ({ versions, active, setActive }) => {
    return (
        <div className="flex gap-x-2 gap-y-1 whitespace-nowrap flex-wrap w-full px-1 tracking-[0.5px] leading-4 pb-2 pt-1 justify-between">
            {
                versions.map((v: string, i: number) => (
                    <div key={i} onClick={() => { setActive(v); }} className={`py-1 px-4 grow flex items-center justify-center rounded-full transition-[colors,transform] ${active === v ? "bg-base-white/50" : "bg-base-white/25 hover:bg-base-white/35 cursor-pointer hover:scale-[1.05]"}`}>
                        {VERSION_NAME[v]}
                    </div>
                ))
            }
        </div>
    )
}

export default VersionSelector;