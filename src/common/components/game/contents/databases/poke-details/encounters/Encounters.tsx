import Spinner from "@/common/components/_utils/loading/Spinner";
import { CONDITIONS, METHODS } from "@/common/constants/locations";
import { useInView } from "@/common/hooks/useInView";
import { EncounterData } from "@/common/interfaces/encounter";
import { capitalize } from "@/common/utils/string";
import { getVersionData } from "@/common/utils/version";
import { getEncounterData } from "@/database/encounter-db";
import { useContext, useState } from "react";
import { PaletteContext } from "../_utils";

type EncountersProps = {
    id: number;
    data?: EncounterData | null;
}

const Encounters: React.FC<EncountersProps> = ({ id, data }) => {
    const [encounterData, setEncounterData] = useState<EncounterData | null | undefined>(data);
    const { ref } = useInView({
        onIntoView: () => {
            if (data === undefined) {
                getEncounterData(String(id)).then(res => {
                    setEncounterData(res);
                }).catch(err => {
                    setEncounterData(null);
                })
            }
        }
    });

    return (
        <div className="" ref={ref}>
            {
                encounterData === undefined ?
                    <div className="w-full my-4">
                        <Spinner />
                    </div> :
                    (
                        encounterData === null ?
                            <div className="text-base-red-dark">-- No Encounter Found --</div> :
                            <Display encounters={encounterData} />
                    )
            }
        </div>
    )
}

export default Encounters;

const Display: React.FC<{ encounters: EncounterData }> = ({ encounters }) => {
    const { palette } = useContext(PaletteContext);

    return (
        <>
            {
                Object.entries(encounters).map(([versions, encounter], i) => (
                    <div className="flex-col w-full flex sm:break-inside-avoid-column [&:not(:first-child)]:mt-4 sm:[&:not(:first-child)]:mt-2" key={i}>
                        <div className="flex flex-wrap font-medium text-[1.rem] sm:text-[1.125rem] bg-black/10">
                            {
                                versions.split(";").map(version => (
                                    <Version key={version} version={version} />
                                ))
                            }
                        </div>
                        <div className="flex flex-col py-2 sm:py-1 text-[0.875rem] sm:text-[1rem]" style={{ background: `${palette[1]}1a` }}>
                            {
                                Object.entries(encounter).map(([location, details], j) => (
                                    <div className="flex flex-col px-3 py-1" key={j}>
                                        <div className="text-[1rem] sm:text-[1.125rem]">{capitalize(location)}</div>
                                        <ul className="list-disc px-5 sm:pt-1">
                                            {
                                                details.map((data, k) => (
                                                    <li key={k}>
                                                        <span className="font-medium">{data.totalChance}</span>% chance by <span className="font-medium">{METHODS[data.method]}</span> <span className="whitespace-nowrap font-medium bg-black/10 rounded-full px-2">Lv {data.levelRange.replace("-", " - ")}</span> <br />
                                                        {!!data.conditions && <span>Requirements: {data.conditions.map(condition => CONDITIONS[condition]).join(", ")}</span>}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </>
    )
}

const Version: React.FC<{ version: string; }> = ({ version }) => {
    const { name, background } = getVersionData(version, { opacity: "33" });

    return (
        <div className="grow px-4 text-center" style={{ background }}>
            {name}
        </div>
    )
}