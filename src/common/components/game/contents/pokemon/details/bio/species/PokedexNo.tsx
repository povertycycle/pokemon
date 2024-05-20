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
        <div className={`h-full text-base flex flex-col items-end`}>
            <div className="px-4 flex w-fit items-center justify-center" style={{ color: isDark(palette[0]) ? "white" : "black", background: palette[0] }}>Pokédex Entries</div>
            <div className={`flex flex-col h-0 grow text-[0.875rem] leading-4 transition-height overflow-y-auto  border-r-2 ${styles.overflowWhite}`} style={{ borderColor: palette[0] }}>
                {
                    pokedex_numbers.map((pdn: Entry, i: number) => (
                        <div className={`flex gap-4 items-center justify-between px-2 shrink-0 h-[24px] tracking-[0.5px] py-[2px] ${i % 2 === 0 ? "" : "bg-black/15"}`} key={i}>
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