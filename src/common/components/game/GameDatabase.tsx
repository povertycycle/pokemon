import { useEffect, useState } from "react";
import Return from "../Return";
import styles from "../animation.module.scss";
import Loading from "./utils/Loading";
import Unavailable from "./Unavailable";
import { BASE_API_URL_POKEMON } from "./constants";
import DatabaseDisplay from "./contents/DatabaseDisplay";
import { initDB, updateValidator } from "./database/db";
import { validatePokemonDatabase, updatePokemonDatabase } from "./database/pokemonDB";

const GameDatabase: React.FC = () => {
    const [dbReady, setDBReady] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const onsuccess = () => {
        setDBReady(true);
    }

    const onfailed = () => {
        fetch(BASE_API_URL_POKEMON).then(res => {
            if (!res.ok) throw new Error("Error fetching data from API");
            return res.json();
        }).then(res => {
            if (!res.count) throw new Error("API data format error")
            return updateValidator(res.count);
        }).then(res => {
            if (res) {
                return fetch(`${BASE_API_URL_POKEMON}?offset=0&limit=${res.count}`);
            } else {
                throw new Error("Failed to update local database");
            }
        }).then(res => {
            if (!res.ok) throw new Error("Error fetching data from API")
            return res.json();
        }).then(res => {
            return updatePokemonDatabase(res);
        }).then(res => {
            if (res) {
                setDBReady(true);
            } else {
                setDBReady(false);
                setError(true);
            }
        }).catch(err => {
            setDBReady(false);
            setError(true);
        });
    }

    const handleInitDB = async () => {
        const status = await initDB();
        if (status) {
            validatePokemonDatabase(onsuccess, onfailed);
        } else {
            setError(true);
        }
    };

    useEffect(() => {
        if (!dbReady) handleInitDB();
    }, []);

    return (
        <div className={`${styles.fadeIn} w-full h-full bg-base-white relative`}>
            <Return />
            {
                !dbReady ?
                    <Loading progress /> :
                    (
                        error ?
                            <Unavailable url={BASE_API_URL_POKEMON} /> :
                            <DatabaseDisplay />
                    )
            }
        </div>
    )
}

export default GameDatabase;