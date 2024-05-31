import { useContext } from "react"
import { DetailsContext } from "../../contexts"
import styles from "@/common/styles/custom.module.scss";
import { capitalize } from "@/common/utils/capitalize";

type Entry = { pokedex: string, entry_number: number }

type PokedexNoProps = {
    pokedex_numbers: Entry[],
}

const PokedexNo: React.FC<PokedexNoProps> = ({ pokedex_numbers }) => {
    const { palette, colors } = useContext(DetailsContext);

    return (
        <div className={`flex flex-col shrink-0 shadow-[-2px_4px_10px_2px_#00000080] border-x-2 border-b-2 max-h-[320px]`} style={{ borderColor: palette[0] }}>
            <div className="text-[1.25rem] pt-8">
                <div className="w-full px-4 bg-black/50 text-base-white border-y flex justify-center" style={{ borderColor: palette[0] }}>Pokédex Entries</div>
            </div>
            <div className={`pt-1 flex flex-col h-0 grow text-base font-mono tracking-[-0.5px] transition-height overflow-x-hidden overflow-y-auto z-[1] ${styles.overflowWhite}`}>
                {
                    pokedex_numbers.map((pdn: Entry, i: number) => (
                        <div className={`flex gap-4 items-center justify-between px-2 shrink-0 h-[24px] py-[2px] ${i % 2 === 0 ? "" : "bg-black/15"}`} key={i}>
                            <span className="whitespace-nowrap">{capitalize(pdn.pokedex)}</span>
                            <span>#{pdn.entry_number}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PokedexNo;