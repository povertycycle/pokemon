import { useContext } from "react";
import { DetailsContext } from "../contexts";
import Typewriter from "../../../../utils/Typewriter";

type NameProps = {
    name?: string | null,
    species?: string | null,
    index?: number | null
}

const Name: React.FC<NameProps> = ({ name, species, index }) => {
    let identifiers = name && species ? name.replace(species, "").split("-").slice(1) : [];

    return (
        <div className="absolute right-0 top-0 z-[1] flex flex-col p-1 border-l-2 border-b-2 border-base-white/50 bg-black/25 rounded-[6px] text-base-white items-center justify-center gap-1">
            <div className="w-full flex justify-center gap-2 text-[1.5rem] leading-6 px-8">
                <Typewriter text={`#${index ? index : "???"} - ${species ? species.split("-").map(text => (text.charAt(0).toUpperCase() + text.slice(1))).join(" ") : "??????????"}`} duration={500} />
            </div>
            {
                identifiers.length > 0 &&
                <div className="w-full flex justify-between gap-1 text-[1.125rem] leading-4">
                    {
                        identifiers.map((id: string, i: number) => (
                            <div className="flex items-center justify-center w-full bg-base-white/50 tracking-[2px] text-white py-1 px-2 rounded-[2px]" key={i}>{id.toUpperCase()}</div>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default Name;