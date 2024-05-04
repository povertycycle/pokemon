import { useEffect, useContext, useState, useRef } from "react";
import { DetailsContext } from "../contexts";
import MoveDetails from "./MoveDetails";
import styles from "@/common/styles/custom.module.scss";
import { processMoveDetailsByPokemon } from "@/common/components/game/database/movesDB";
import { LevelMethodVersion, MoveDetailsType } from "../../interface";
import tableStyles from "./index.module.scss";
import VersionSelector from "./VersionSelector";
import Loading from "../Loading";
import Navigation from "./Navigation";

const Moves: React.FC = () => {
    const { details } = useContext(DetailsContext);
    const [initDetails, setInitDetails] = useState<MoveDetailsType | null>(null);
    const versionsRef = useRef<string[]>([]);

    useEffect(() => {
        if (details) {
            processMoveDetailsByPokemon(details.name, details.moves).then(res => {
                versionsRef.current = Object.keys(Object.values(res).reduce((acc: { [key: string]: boolean }, lmv: LevelMethodVersion[]) => {
                    lmv.forEach(v => {
                        acc[v.version] = true;
                    })
                    return acc;
                }, {}));
                setInitDetails(res);
            });
        }
    }, [details]);

    return (
        initDetails && details ?
            <MoveDisplay versions={versionsRef.current} details={initDetails} pokemon={details.name} /> :
            <Loading />
    )
}

const MoveDisplay: React.FC<{ versions: string[], details: MoveDetailsType, pokemon: string }> = ({ versions, details, pokemon }) => {
    const [activeVersion, setActiveVersion] = useState<string>(versions[0]);
    const sorted = details && Object.entries(details);

    useEffect(() => {
        setActiveVersion(versions[0]);
    }, [pokemon])

    return (
        <div className={`h-0 grow w-full flex flex-col overflow-hidden`}>
            <Navigation />
            <div className={`w-full overflow-y-scroll h-0 grow flex flex-col ${styles.overflowWhite}`}>
                {
                    sorted?.map((entry: [string, LevelMethodVersion[]], i: number) => (
                        <MoveDetails key={i} move={entry[0]} levelMethodVersions={entry[1]} />
                    ))
                }
            </div>


            {/* <VersionSelector versions={versions} active={activeVersion} setActive={setActiveVersion} /> */}
            {/* <table className={`${tableStyles.tableMoves} overflow-hidden rounded-[12px] flex flex-col h-full`}>
                <thead className="relative w-full text-base-white">
                    <tr className="text-[1.25rem] leading-5 tracking-[2px]">





                        <th className="bg-black/15 text-center w-[48px]">Lv</th>
                        <th className="bg-black/15 text-center max-w-[300px] basis-[50%]">Move</th>



                        <th>Method</th>
                        <th>Version</th>
                    </tr>
                </thead>
                <tbody >
                    
                </tbody>
            </table> */}
        </div>
    )
}

export default Moves;