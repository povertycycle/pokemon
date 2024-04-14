import { useEffect, useState } from "react";
import ReturnButton from "../Return";
import styles from "../animation.module.scss";
import DatabaseDisplay from "./DatabaseDisplay";
import { initDB } from "./db";

const GameDatabase: React.FC = () => {
    const [dbReady, setDBReady] = useState<boolean>(false);

    const handleInitDB = async () => {
        const status = await initDB();
        setDBReady(status);
    };

    useEffect(() => {
        handleInitDB();
    }, []);

    return (
        dbReady &&
        <div className={`${styles.fadeIn} w-full h-full bg-base-white`}>
            <ReturnButton />
            <DatabaseDisplay />
        </div>
    )
}

export default GameDatabase;