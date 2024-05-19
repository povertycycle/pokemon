import { useContext } from "react"
import { DetailsContext } from "../../contexts"
import { isDark } from "@/common/utils/colors";
import styles from "@/common/styles/custom.module.scss";
import { VERSION_COLORS } from "../sprites/constants";

type FlavorTextsProps = {
    entries: {
        version: string,
        text: string,
    }[]
}

const FlavorTexts: React.FC<FlavorTextsProps> = ({ entries }) => {
    const { palette } = useContext(DetailsContext);

    return (
        <div className={`flex flex-col w-full`}>
            <div className="px-8 py-1 text-[1.25rem] leading-6 w-fit" style={{ background: palette.at(-1), color: isDark(palette.at(-1)) ? "white" : "black" }}>Entries</div>
            <div className={`w-full flex flex-col max-h-[384px] overflow-y-scroll ${styles.overflowWhite}`}>
                {
                    entries.map(({ version, text }, i: number) => (
                        <div key={i} className={`w-full flex items-center gap-1 py-1 ${i % 2 === 0 ? "bg-black/15" : ""}`}>
                            <div className="h-full text-[1.125rem] w-[128px] shrink-0 px-2">{version.split("-").map(t => `${t.charAt(0).toUpperCase()}${t.slice(1)}`).join(" ")}</div>
                            <p className="px-2 py-1 font-mono leading-5 text-base tracking-[0.5px]">{text.replace("\u000c", " ")}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FlavorTexts;