import { Encounter, LocationEncounters } from "../../interfaces/encounters";
import { CONDITIONS } from "./conditions";
import { METHODS } from "./methods";

type LocationProps = {
    data: LocationEncounters,
    locations: { [key: string]: string }
}

const Location: React.FC<LocationProps> = ({ data, locations }) => {
    return (
        <div className="w-fit flex flex-col gap-8 px-8 pt-[36px] pb-8 bg-black/25">
            {
                Object.entries(data).map(([loc_id, encounter], i: number) => (
                    <div key={i} className="flex flex-col items-start w-full gap-2">
                        <span className="text-[1.25rem] underline decoration-[1px]">{locations[loc_id]}</span>
                        <ul className="w-full list-['-_'] px-4 space-y-8">
                            {
                                encounter.map((data: Encounter, k: number) => (
                                    <li className="tracking-[0.5px] text-[1.125rem] leading-6" key={k}>
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
                                            <div className="flex flex-col leading-5 text-base mt-2">
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