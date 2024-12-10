import { BASE_API_URL_POKEMON } from "@/constants/urls";
import { initDB, updateValidator } from "@/database/main-db";
import { updatePokemonDatabase, validatePokemonDatabase } from "@/database/pokemon-db";
import { useEffect, useState } from "react";

const useBuildIDB = () => {
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

    async function initDatabase() {
        const status = await initDB();
        if (status) {
            validatePokemonDatabase(onsuccess, onfailed);
        } else {
            setError(true);
        }
    };

    useEffect(() => {
        if (!dbReady) initDatabase();
    }, []);

    return { dbReady, error }
}

export { useBuildIDB };