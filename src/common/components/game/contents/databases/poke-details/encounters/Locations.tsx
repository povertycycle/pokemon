import { EncounterData, PalParkEncounter } from "@/common/interfaces/encounter";
import Encounters from "./Encounters";
import PalPark from "./PalPark";
import { Bookmark, BOOKMARK_DATA } from "../../bookmarks/_utils";
import { useContext } from "react";
import { PaletteContext } from "../_utils";

type LocationsProps = {
    id: number;
    palPark: PalParkEncounter[];
    data?: EncounterData | null;
}

const Locations: React.FC<LocationsProps> = ({ id, palPark, data }) => {
    const { palette } = useContext(PaletteContext);
    const { icon, id: scrollId } = BOOKMARK_DATA[Bookmark.Encounters];

    return (
        <div id={scrollId} className="flex flex-col">
            <div className="border-0 section__header--default items-center gap-3"><i className={`${icon} text-[1.25rem] leading-4`} style={{ color: palette[1] }} />Encounters</div>
            <div className="sm:columns-3 max-sm:flex max-sm:flex-col sm:gap-2">
                <PalPark data={palPark} />
                <Encounters data={data} id={id} />
            </div>
        </div>
    )
}

export default Locations;