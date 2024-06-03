import { useContext } from "react";
import { Encounter, LocationEncounters } from "../../interfaces/encounters";
import { CONDITIONS } from "./conditions";
import { METHODS } from "./methods";
import { DetailsContext } from "../contexts";

type LocationProps = {
    data: LocationEncounters,
    locations: { [key: string]: string }
}

const Location: React.FC<LocationProps> = ({ data, locations }) => {
    const { palette } = useContext(DetailsContext);

    return (
        <div className="w-fit flex flex-col gap-4 pt-[24px] pb-4 bg-black/25">
            {
                Object.entries(data).map(([loc_id, encounter], i: number) => (
                    <div key={i} className="flex flex-col items-start w-full gap-2">
                        <div className="px-4 w-full bg-black/50 text-[1.125rem] border-b" style={{ borderColor: palette[0] }}>{locations[loc_id]}</div>
                        <ul className="w-full list-['-_'] px-8 space-y-4">
                            {
                                encounter.map((data: Encounter, k: number) => (
                                    <li className="tracking-[0.5px] text-base leading-4" key={k}>
                                        <span>{METHODS[data.method]}</span>
                                        <div className="flex gap-8">
                                            <span>{data.chance}% chance</span>
                                            <span>{(() => {
                                                let range = data.level_range.split(";");
                                                return range.length === 1 ? `Lv. ${range[0]}` : `Range: Lv.${range[0]} tp ${range.at(-1)}`
                                            })()}</span>
                                        </div>
                                        {
                                            data.condition && data.condition.length > 0 &&
                                            <div className="flex flex-col leading-4 text-base mt-2">
                                                <span className="italic tracking-[1px]">Req conditions:</span>
                                                <ul className="list-[upper-roman] px-4">
                                                    {
                                                        data.condition.map((c: string, j: number) => (
                                                            <li key={j}>
                                                                <span className="italic tracking-[1px]">{CONDITIONS[c]}</span>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                ))
            }
        </div>
    )
}

export default Location;