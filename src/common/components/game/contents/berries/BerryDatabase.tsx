import { useEffect, useState } from "react";
import { DatabaseDisplayProps } from "../databases/_utils";
import styles from "@/common/styles/transitions.module.scss";
import { BerryData } from "@/common/interfaces/berry";
import Loading from "@/common/components/_utils/loading/Loading";
import Empty from "@/common/components/_utils/Empty";
import Display from "./Display";
import { getAllBerries } from "@/database/berries-db";

const BerryDatabase: React.FC<DatabaseDisplayProps> = ({ back }) => {
    const [berries, setBerries] = useState<BerryData[] | null>();

    useEffect(() => {
        getAllBerries().then(res => {
            setBerries(res);
        }).catch(err => {
            setBerries(null);
        });
    }, []);

    return (
        <div className={`relative w-full h-full overflow-hidden flex items-center justify-center top-0 ${styles.fadeIn}`}>
            {
                berries === undefined ?
                    <Loading /> :
                    (
                        berries === null || berries.length === 0 ?
                            <Empty /> :
                            <Display berries={berries} back={back} />
                    )
            }
        </div>
    )
}

export default BerryDatabase;
