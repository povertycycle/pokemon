import { useContext, useEffect, useState } from "react";
import { DetailsContext } from "../contexts";
import Sprites from "./sprites/Sprites";

const Bio: React.FC = () => {
    const { details } = useContext(DetailsContext);
    const [speciesData, setSpeciesData] = useState();

    useEffect(() => {
        // setDetails(null);
        // const request = indexedDB.open(POKEMON_DB);

        // request.onsuccess = () => {
        //     let db: IDBDatabase = request.result;
        //     const abilityData = db.transaction(Stores.Ability, 'readonly').objectStore(Stores.Ability).get(ability);

        //     abilityData.onsuccess = () => {
        //         const isHidden = abilityData.result.pokemons.find((pokemon: any) => (pokemon.name === pokeDetails?.name))?.isHidden;
        //         if (!abilityData.result?.details) {
        //             fetch(`${BASE_API_URL_ABILITY}/${ability}`).then(res => {
        //                 if (!res.ok) {
        //                     throw new Error("Failed to fecth data")
        //                 }
        //                 return res.json();
        //             }).then(res => {
        //                 const insert = db.transaction(Stores.Ability, 'readwrite').objectStore(Stores.Ability);
        //                 const effect = res?.effect_entries?.find((entry: any) => (entry?.language?.name === "en"))
        //                 const details = {
        //                     effect: effect.effect,
        //                     short_effect: effect.short_effect,
        //                     flavors: res?.flavor_text_entries?.map((flavor: any) => (
        //                         { text: flavor.flavor_text, language: flavor.language.name, version: flavor.version_group.name }
        //                     ))
        //                 };
        //                 insert.put({ ...abilityData.result, details: details }, ability);
        //                 setDetails({ ...details, isHidden: isHidden });
        //             }).catch(err => {
        //                 setDetails(undefined);
        //             });
        //         } else {
        //             setDetails({ ...abilityData.result.details, isHidden: isHidden });
        //         }
        //     }
        // };
    }, [details]);


    return (
        <div className="w-full flex">
            <Sprites />



            {/* <div className="w-full flex flex-col bg-base-white/50 rounded-l-[8px] p-4">
                <span>Base experience yield {details?.base_experience || "???"}</span>
                <span>Height {details?.height}</span>
                <span>Weight {details?.weight}</span>
            </div> */}
            {/* <div className="w-full flex flex-col border-2 border-base-white/50 rounded-r-[8px] overflow-hidden">

            </div> */}
        </div>
    )
}

export default Bio;