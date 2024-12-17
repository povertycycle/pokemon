import { initDB, validateGameDatabase } from "@/database/main-db";
import { useEffect, useState } from "react";

const useBuildIDB = () => {
    const [error, setError] = useState<string | null | undefined>(undefined);

    async function initDatabase() {
        initDB()
            .then(res => {
                if (res) {
                    return validateGameDatabase()
                } else {
                    throw new Error("Unable to initialize IndexedDB.")
                }
            })
            .then(res => {
                setError(res);
            })
            .catch(err => {
                setError(String(err));
            });
    };

    useEffect(() => {
        if (error === undefined) initDatabase();
    }, []);

    return { error }
}

export { useBuildIDB };
