import React, { useContext, useEffect, useState } from "react";
import { DetailsContext } from "../contexts";
import { getEncounterData } from "@/common/components/game/database/encountersDB";
import { Encounter, EncounterData, LocationEncounters } from "../../interfaces/encounters";
import { shortcutID } from "@/common/utils/shortcut";
import { Shortcuts } from "../../shortcuts/constants";
import { CONDITIONS } from "./conditions";
import { processAllLocations } from "@/common/components/game/database/locationsDB";
import { getGameColors } from "../_utils/getGameColors";
import { getGameName } from "../_utils/getGameName";
import { METHODS } from "./methods";
import { PalParkData } from "../../interface";
import Location from "./Location";
import { capitalize } from "@/common/utils/capitalize";
import { VERSION_COLORS } from "../constants";
import { API_HOME } from "@/common/components/game/constants";

type EncountersProps = {
    pal_park: PalParkData[]
}

const Encounters: React.FC<EncountersProps> = ({ pal_park }) => {
    const { details, palette } = useContext(DetailsContext);
    const [encounters, setEncounters] = useState<EncounterData | null>(null);
    const [locations, setLocations] = useState<{ [loc_id: string]: string } | null>(null)

    useEffect(() => {
        if (details?.id) {
            let encounterData: EncounterData | null = null;
            getEncounterData(details.id).then(res => {
                encounterData = res && Object.keys(res).length > 0 ? res : null;
                return processAllLocations(Object.keys(Object.values(res ?? {}).map(l => (Object.keys(l))).reduce((acc: { [key: string]: number }, o) => { o.forEach(l => { acc[l] = 0; }); return acc; }, {})));
            }).then(res => {
                setEncounters(encounterData);
                setLocations(res);
            })
        }
    }, [details?.id]);

    return (
        <div id={shortcutID(Shortcuts.Encounters)} className="w-full flex flex-col mt-16 items-center">
            <div className="w-full text-[1.5rem] py-1 flex items-center justify-center px-32 bg-black/50 text-base-white border-y-2 relative" style={{ borderColor: palette[0] }}>
                Encounters
            </div>
            <div className="flex flex-col items-start gap-12 pt-16 relative">
                <div className="absolute left-0 top-0 h-full w-[1px]" style={{ background: palette[0] }} />
                {
                    encounters && locations ?
                        Object.entries(encounters).map(([version, locEnc], i: number) => (
                            <div className="flex flex-col" key={i}>
                                <div className="flex justify-center items-center z-[1]">
                                    <div className="absolute left-0 text-[1.25rem] px-8 w-fit py-1 border whitespace-nowrap" style={{ background: getGameColors(version), borderColor: palette[0] }}>
                                        <span className="drop-shadow-[0_0_2px_black]">{getGameName(version)}</span>
                                    </div>
                                    <hr className="border-t w-full" style={{ borderColor: palette[0] }} />
                                </div>
                                <Location data={locEnc} locations={locations} />
                            </div>
                        )) :
                        <div className="px-4 py-1 bg-black/50 text-[1.125rem] border-b" style={{ borderColor: palette[0] }}>
                            Data is missing from the database. Please report this to <a className="text-[1.25rem] underline" target="_blank" href={"https://github.com/PokeAPI/pokeapi/"}>{API_HOME}</a>
                        </div>
                }
                {
                    pal_park.length > 0 &&
                    <div className="flex flex-col">
                        <div className="flex justify-center items-center z-[1]">
                            <div className="absolute left-0 text-[1.25rem] px-8 w-fit py-1 border whitespace-nowrap" style={{ background: `linear-gradient(270deg,${VERSION_COLORS["iv"].join(",")})`, borderColor: palette[0] }}>
                                <span className="drop-shadow-[0_0_2px_black]">Pal Park</span>
                            </div>
                            <hr className="border-t w-full" style={{ borderColor: palette[0] }} />
                        </div>
                        <PalPark data={pal_park} />
                    </div>
                }
            </div>
        </div>
    )
}

type PalParkProps = {
    data: PalParkData[]
}

const PalPark: React.FC<PalParkProps> = ({ data }) => {
    return (
        <div className="w-fit flex flex-col gap-8 px-8 pt-[36px] pb-8 bg-black/25">
            <ul className="w-full list-['-_'] px-4 space-y-8">
                {
                    data.map(({ rate, base_score, area }, i: number) => (
                        <li key={i}>
                            <span className="text-[1.25rem] underline decoration-[1px]">{capitalize(area)}</span>
                            <div className="flex flex-col text-[1.125rem] leading-6 tracking-[0.5px]">
                                <span>Rate {rate}</span>
                                <span>Base Score {base_score}</span>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Encounters;