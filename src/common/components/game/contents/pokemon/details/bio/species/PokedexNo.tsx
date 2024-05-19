import { useContext } from "react"
import { DetailsContext } from "../../contexts"
import styles from "@/common/styles/custom.module.scss";
import { isDark } from "@/common/utils/colors";

type Entry = { pokedex: string, entry_number: number }

type PokedexNoProps = {
    pokedex_numbers: Entry[],
}

const PokedexNo: React.FC<PokedexNoProps> = ({ pokedex_numbers }) => {
    const { palette } = useContext(DetailsContext);
    const generateRegion = (text: string) => {
        return text.split("-").map(t => `${t.charAt(0).toUpperCase()}${t.slice(1)}`).join(" ");
    }

    return (
        <div className={`w-[256px] shrink-0 text-base leading-5 flex flex-col`} style={{ borderColor: palette.at(-1) }}>
            <div className="w-full py-1 text-[1.25rem] flex items-center justify-center" style={{ color: isDark(palette.at(-1)) ? "white" : "black", background: palette.at(-1) }}>Pokédex Entries</div>
            <div className={`pl-[12px] flex flex-col h-[208px] transition-height overflow-y-scroll ${styles.overflowWhite}`}>
                {
                    pokedex_numbers.map((pdn: Entry, i: number) => (
                        <div className={`flex gap-4 items-center justify-between pl-2 shrink-0 h-[24px] pr-[12px] py-[2px] ${i % 2 === 0 ? "" : "bg-black/15"}`} key={i}>
                            <span className="whitespace-nowrap">{generateRegion(pdn.pokedex)}</span>
                            <span>#{pdn.entry_number}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PokedexNo;