import { API_HOME } from "@/common/constants/urls";
import { shortcutID } from "@/common/utils/shortcut";
import React, { useContext, useState } from "react";
import { Shortcuts } from "../../shortcuts/constants";

type EncountersProps = {
    pal_park: any;
}

const Encounters: React.FC<EncountersProps> = ({ pal_park }) => {
    const [encounters, setEncounters] = useState<any | null>(null);
    const [locations, setLocations] = useState<{ [loc_id: string]: string } | null>(null)

    // useEffect(() => {
    // if (details?.id) {
    //     let encounterData: any | null = null;
    //     getEncounterData(details.id).then(res => {
    //         encounterData = res && Object.keys(res).length > 0 ? res : null;
    //         return processAllLocations(Object.keys(Object.values(res ?? {}).map(l => (Object.keys(l))).reduce((acc: { [key: string]: number }, o) => { o.forEach(l => { acc[l] = 0; }); return acc; }, {})));
    //     }).then(res => {
    //         setEncounters(encounterData);
    //         setLocations(res);
    //     })
    // }
    // }, [details?.id]);

    return (
        <div id={shortcutID(Shortcuts.Encounters)} className="w-full flex flex-col mt-16 items-center">
            <div className="w-full text-[1.25rem] py-1 flex items-center justify-center px-32 bg-black/50 text-base-white border-y-2 relative" style={{}}>
                Encounters
            </div>
            <div className="flex flex-col items-start gap-8 pt-12 relative text-base-white">
                {/* <div className="absolute left-0 top-0 h-full w-[2px]" style={{ background: palette[0] }} /> */}
                {
                    // encounters && locations ?
                    //     Object.entries(encounters).map(([version, locEnc], i: number) => (
                    //         <div className="flex flex-col" key={i}>
                    //             <div className="flex justify-center items-center z-[1]">
                    //                 {/* <div className="absolute left-0 text-[1.125rem] px-4 w-fit border-2 whitespace-nowrap" style={{ background: getGameColors(version), borderColor: palette[0] }}>
                    //                     <span className="drop-shadow-[0_0_2px_black]">{getGameName(version)}</span>
                    //                 </div> */}
                    //                 {/* <hr className="border-t-2 w-full" style={{ borderColor: palette[0] }} /> */}
                    //             </div>
                    //             {/* <Location data={locEnc} locations={locations} /> */}
                    //         </div>
                    //     )) :
                    //     <div className="px-4 py-1 bg-black/50 text-[1.125rem] border-b-2" style={{ borderColor: palette[0] }}>
                    //         Data is missing from the database. Please report this to <a className="text-[1.25rem] underline" target="_blank" href={"https://github.com/PokeAPI/pokeapi/"}>{API_HOME}</a>
                    //     </div>
                }
                {
                    pal_park.length > 0 &&
                    <div className="flex flex-col">
                        <div className="flex justify-center items-center z-[1]">
                            {/* <div className="absolute left-0 text-[1.125rem] px-8 w-fit py-1 border-2 whitespace-nowrap" style={{ background: `linear-gradient(270deg,${VERSION_COLORS["iv"].join(",")})`, borderColor: palette[0] }}>
                                <span className="drop-shadow-[0_0_2px_black]">Pal Park</span>
                            </div> */}
                            {/* <hr className="border-t-2 w-full" style={{ borderColor: palette[0] }} /> */}
                        </div>
                        <PalPark data={pal_park} />
                    </div>
                }
            </div>
        </div>
    )
}

type PalParkProps = {
    data: any
}

const PalPark: React.FC<PalParkProps> = ({ data }) => {
    return (
        <div className="w-fit flex flex-col gap-4 pt-[28px] pb-4 bg-black/25">
            <ul className="w-full space-y-8">
                {
                    // data.map(({ rate, base_score, area }, i: number) => (
                    //     <li className="" key={i}>
                    //         <div className="px-4 bg-black/50 text-[1.125rem] border-b" style={{ borderColor: palette[0] }}>{capitalize(area)}</div>
                    //         <div className="px-8 flex gap-8 mt-2 text-base leading-5 tracking-[0.5px]">
                    //             <span>Rate: {rate}</span>
                    //             <span>Base Score: {base_score}</span>
                    //         </div>
                    //     </li>
                    // ))
                }
            </ul>
        </div>
    )
}

export default Encounters;