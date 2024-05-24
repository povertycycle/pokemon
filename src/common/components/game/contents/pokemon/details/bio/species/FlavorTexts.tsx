import { useContext } from "react"
import { DetailsContext } from "../../contexts"
import styles from "@/common/styles/custom.module.scss";

type FlavorTextsProps = {
    entries: {
        version: string,
        text: string,
    }[]
}

const FlavorTexts: React.FC<FlavorTextsProps> = ({ entries }) => {
    const { palette, colors } = useContext(DetailsContext);

    return (
        <div className={`flex flex-col w-full h-[256px]`}>
            <div className="px-12 text-[1.25rem] w-fit" style={{ background: palette[0], color: colors[0] }}>Entries</div>
            <div className={`w-full flex flex-col border-l-2 overflow-y-auto ${styles.overflowWhite}`} style={{ borderColor: palette[0] }}>
                {
                    entries.map(({ version, text }, i: number) => (
                        <div key={i} className={`w-full flex items-center gap-1 ${i % 2 === 0 ? "bg-black/15" : ""}`}>
                            <div className="h-full flex text-[1.125rem] items-center justify-start w-[212px] shrink-0 px-4">{version.split("-").map(t => `${t.charAt(0).toUpperCase()}${t.slice(1)}`).join(" ")}</div>
                            <p className="border-l-2 p-2 font-mono leading-5 text-base tracking-[0.5px]" style={{ borderColor: palette[0] }}>{text.replace("\u000c", " ")}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FlavorTexts;