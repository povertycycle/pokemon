import { useEffect, useState } from "react";
import ReturnButton from "../Return";
import { initDB } from "./db";
import DatabaseDisplay from "./DatabaseDisplay";

const GameDatabase: React.FC = () => {
    const [dbReady, setDBReady] = useState<boolean>(false);

    const handleInitDB = async () => {
        const status = await initDB();
        setDBReady(status);
        // FETCH NECESSARY DATA
        // const pokemon = await getStoreSingleData(Stores.Pokemon, "bulbasaur");

        // if (pokemon) {
        //     console.log("Retrieved from IndexedDB", pokemon);
        // } else {
        //     fetch('https://pokeapi.co/api/v2/pokemon/bulbasaur').then(res => {
        //         res.json().then(
        //             pokemon => {
        //                 addData(Stores.Pokemon, 'bulbasaur', pokemon);
        //                 console.log("Fetched", pokemon)
        //             }
        //         )
        //     });
        // }
    };

    useEffect(() => {
        handleInitDB();
    }, []);

    return (
        dbReady &&
        <div className="w-full h-full bg-black">
            <ReturnButton />
            <DatabaseDisplay />
        </div>
    )
}

export default GameDatabase;