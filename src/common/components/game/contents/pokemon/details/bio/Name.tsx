import { isDark } from "@/common/utils/colors";
import Typewriter from "../../../../utils/Typewriter";

type NameProps = {
    name?: string | null,
    species?: string | null,
    index?: number | null,
    palette: string[],
}

const Name: React.FC<NameProps> = ({ name, species, index, palette }) => {
    let identifiers = name && species ? name.replace(species, "").split("-").slice(1) : [];
    const base = palette.at(-1) ?? "#000000";

    return (
        <div className="absolute left-[56px] top-0 z-[1] flex flex-col px-1 pb-1 border-x-4 border-b-4 rounded-b-[10px]" style={{
            borderColor: base,
            color: isDark(base) ? "#f0f0f0" : "#000000"
        }}>
            <div className="w-full h-full flex flex-col gap-1 items-center justify-center">
                <div className={`w-full flex justify-between gap-1 text-[1.25rem] leading-6 tracking-[4px]`}>
                    <div className={`px-2 py-1 shrink-0 ${identifiers.length === 0 ? "rounded-bl-[4px]" : ""}`} style={{ background: base }}>#{index ? index : "???"}</div>
                    <div className={`px-8 py-1 grow ${identifiers.length === 0 ? "rounded-br-[4px]" : ""}`} style={{ background: base }}>
                        <Typewriter text={`${species ? species.split("-").map(text => (text.charAt(0).toUpperCase() + text.slice(1))).join(" ") : "??????????"}`} duration={500} />
                    </div>
                </div>
                {
                    identifiers.length > 0 &&
                    <div className="w-full flex justify-between gap-1 text-base leading-4 p-1 rounded-b-[4px] overflow-hidden" style={{ background: base }}>
                        {
                            identifiers.map((id: string, i: number) => (
                                <div className={`flex items-center justify-center w-full tracking-[2px] text-white py-1 px-2 ${i === 0 ? "rounded-bl-[4px]" : (i === identifiers.length - 1 ? "rounded-br-[4px]" : "")}`} key={i} style={{
                                    background: palette[0],
                                    color: isDark(palette[0]) ? "#f0f0f0" : "#000000"
                                }}>
                                    {id.toUpperCase()}
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Name;