import { PaletteContext } from "@/stores/contexts";
import { useContext } from "react";
import { BOOKMARK_DATA } from "../header/Bookmarks";
import { EncounterData, PalParkEncounter } from "../../../interfaces/pokemon";
import { PalPark } from "./PalPark";
import { Encounter } from "./Encounter";

type EncountersProps = {
    id: number;
    palPark: PalParkEncounter[];
    encounters?: EncounterData | null;
};

export const Encounters: React.FC<EncountersProps> = ({
    id,
    palPark,
    encounters,
}) => {
    const {
        dark: { background },
    } = useContext(PaletteContext);
    const { icon, id: scrollId } = BOOKMARK_DATA.encounters;

    return (
        <div id={scrollId} className="flex flex-col">
            <div className="border-0 section__header--default">
                <i className={icon} style={{ color: background }} />
                Encounters
            </div>
            <div className="sm:columns-3 max-sm:flex max-sm:flex-col sm:gap-2">
                <PalPark data={palPark} />
                <Encounter data={encounters} id={id} />
            </div>
        </div>
    );
};
