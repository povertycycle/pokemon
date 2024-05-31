import React, { useContext } from "react"
import { FILTER_TYPE_COLORS } from "../../../constants"
import { TYPE_EFFECTIVENESS } from "../../../types/constants"
import { DetailsContext } from "../../contexts"

type EffectivenessProps = {
    types?: string[],
}

const Effectiveness: React.FC<EffectivenessProps> = ({ types }) => {
    const { palette } = useContext(DetailsContext);
    const effectiveness = generateEffectiveness(types);

    return (
        <div className={`flex w-full flex-col mt-12 relative z-[1] gap-4`}>
            <div className="px-4 text-[1.5rem] w-full flex justify-center bg-black/50 text-base-white border-y" style={{ borderColor: palette[0] }}>Effectiveness</div>
            <div className="w-fit max-w-full flex flex-col py-4 gap-4 pr-2">
                {
                    effectiveness ?
                        [
                            { t: "WEAK", b: "bg-hp-dark", c: "ri-arrow-down-double-line", e: "4" },
                            { t: "WEAK", b: "bg-spd-dark", c: "ri-arrow-down-s-line", e: "2" },
                            { t: "RESIST", b: "bg-sp-atk-dark", c: "ri-arrow-up-s-line", e: "1/2" },
                            { t: "RESIST", b: "bg-sp-def-dark", c: "ri-arrow-up-double-line", e: "1/4" },
                            { t: "IMMUNE", b: "bg-black", c: "ri-close-fill", e: "0" },
                            { t: "NORMAL", b: "bg-base-white-dark", c: "ri-subtract-line", e: "1" }
                        ].map((dat, i: number) => (
                            effectiveness[dat.e] &&
                            <Information key={i} types={effectiveness[dat.e]} {...dat} color={palette[0]} />
                        )) :
                        <div className="px-4 text-[1.25rem]">Unknown Type</div>
                }
            </div>
        </div>
    )
}


const Information: React.FC<{ types: string[], t: string, b: string, c: string, e: string, color: string }> = ({ types, t, b, c, e, color }) => {
    return (
        <div className="flex text-[1.125rem] leading-8 gap-4">
            <div className={`h-[36px] shrink-0 w-[192px] border-r-2 border-y-2 rounded-r-[6px] flex items-center justify-between pr-2 ${b} text-base-white`} style={{ borderColor: color }}>
                <span className="flex items-center"><i className={`text-[2.5rem] ${c}`} /> {t}</span>
                <span>X{e}</span>
            </div>
            <div className={`flex flex-wrap gap-2 leading-4 items-center`}>
                {
                    types.map((t: string, i: number) => (
                        <div key={i} className={`group/select`}>
                            <div onClick={() => {
                                const type1 = document.querySelector(`[data-type='${t}-1']`) as HTMLDivElement;
                                const type2 = document.querySelector(`[data-type='${t}-2']`) as HTMLDivElement;
                                if (type1) {
                                    type1.click();
                                } else if (type2) {
                                    type2.click();
                                }
                            }} className={`px-4 border-2 group-hover/select:translate-y-[-6px] transition-transform shadow-base-black h-[36px] cursor-pointer rounded-[6px] flex items-center justify-center`} style={{ background: FILTER_TYPE_COLORS[t] }}>
                                <span className="text-base-white drop-shadow-[0_0_4px_black]">{t.toUpperCase()}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

function generateEffectiveness(types?: string[]) {
    return types && Object.entries(Object.entries(TYPE_EFFECTIVENESS).reduce((acc: { [type: string]: number }, [t, chart]) => {
        if (types.includes(t)) {
            Object.entries(chart).forEach(([c, e]) => {
                acc[c] = acc[c] * e;
            })
        }

        return acc;
    }, Object.keys(TYPE_EFFECTIVENESS).reduce((acc: any, t: string) => { acc[t] = 1; return acc; }, {}))).reduce((acc: { [eff: string]: string[] }, [type, value]) => {
        let parsed = String(value);
        if (value === 0.25) {
            parsed = "1/4";
        } else if (value === 0.5) {
            parsed = "1/2"
        }
        acc[parsed] = (acc[parsed] ?? []).concat([type])
        return acc;
    }, {});
}

export default Effectiveness;