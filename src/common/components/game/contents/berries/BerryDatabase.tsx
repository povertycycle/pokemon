import Loading from "@/common/components/_utils/loading/Loading";
import styles from "@/common/styles/transitions.module.scss";
import { useEffect, useState } from "react";
import Empty from "../databases/poke-card/Empty";
import { BerryData } from "./constants";
import Display from "./Display";

const BerryDatabase: React.FC = () => {
    const [berries, setBerries] = useState<BerryData[] | null | undefined>();

    useEffect(() => {
        // getAllBerries().th
    }, [])

    return (
        <div className={`absolute z-0 w-full h-full overflow-hidden flex items-center justify-center top-0 ${styles.fadeIn}`}>
            {
                berries === undefined ?
                    <Loading /> :
                    (
                        berries === null || Object().length === 0 ?
                            <Empty /> :
                            <Display berries={berries} />
                    )
            }
        </div>
    )
}

export default BerryDatabase;