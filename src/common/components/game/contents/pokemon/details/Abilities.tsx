import global from "@/common/styles/custom.module.scss";
import { useContext, useEffect, useState } from "react";
import Typewriter from "../../../utils/Typewriter";
import { BASE_API_URL_ABILITY } from "../../../constants";
import { POKEMON_DB, Stores } from "../../../database/db";
import Loading from "./Loading";
import { DetailsContext } from "./contexts";

const Abilities: React.FC = () => {
    const { details } = useContext(DetailsContext);
    const [selected, setSelected] = useState<string | undefined>(details?.abilities[0]);

    useEffect(() => {
        setSelected(details?.abilities[0])
    }, [details?.name])

    return (
        selected ?
            <div className="w-full flex flex-col justify-end">
                <div className="w-full flex gap-1 items-end h-[40px]">
                    {
                        details?.abilities?.map((ability: string, i: number) => (
                            <div key={i} className={`w-full flex items-center justify-center relative transition-[height,colors] text-[1.25rem] ${selected !== ability ? "cursor-pointer hover:h-full h-[80%] hover:text-black/75 text-black/50" : "h-full translate-y-[2px]"} rounded-t-[8px] bg-base-white`} onClick={() => { setSelected(ability) }}>
                                {selected !== ability && <div className="rounded-t-[8px] absolute w-full h-full bg-black/25 top-0 left-0" />}
                                {
                                    ability.split("-").map(text => (text.charAt(0).toUpperCase() + text.slice(1))).join(" ")
                                }
                            </div>
                        ))
                    }
                </div>
                <AbilityData ability={selected} />
            </div> :
            <div className="w-full h-[72px] flex items-center justify-center bg-black text-white rounded-[6px] text-[1.25rem]">
                Pokemon does not have any ability
            </div>
    )
}

type Flavor = {
    text: string,
    language: string,
    version: string,
}

type AbilityDetails = {
    effect: string,
    short_effect: string,
    flavors: Flavor[],
    isHidden: boolean,
}

const AbilityData: React.FC<{ ability: string }> = ({ ability }) => {
    const { details: pokeDetails } = useContext(DetailsContext);
    const [details, setDetails] = useState<AbilityDetails | undefined | null>(null);

    useEffect(() => {
        setDetails(null);
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const abilityData = db.transaction(Stores.Ability, 'readonly').objectStore(Stores.Ability).get(ability);

            abilityData.onsuccess = () => {
                const isHidden = abilityData.result.pokemons.find((pokemon: any) => (pokemon.name === pokeDetails?.name))?.isHidden;
                if (!abilityData.result?.details) {
                    fetch(`${BASE_API_URL_ABILITY}/${ability}`).then(res => {
                        if (!res.ok) {
                            throw new Error("Failed to fecth data")
                        }
                        return res.json();
                    }).then(res => {
                        const insert = db.transaction(Stores.Ability, 'readwrite').objectStore(Stores.Ability);
                        const effect = res?.effect_entries?.find((entry: any) => (entry?.language?.name === "en"))
                        const details = {
                            effect: effect.effect,
                            short_effect: effect.short_effect,
                            flavors: res?.flavor_text_entries?.map((flavor: any) => (
                                { text: flavor.flavor_text, language: flavor.language.name, version: flavor.version_group.name }
                            ))
                        };
                        insert.put({ ...abilityData.result, details: details }, ability);
                        setDetails({ ...details, isHidden: isHidden });
                    }).catch(err => {
                        setDetails(undefined);
                    });
                } else {
                    setDetails({ ...abilityData.result.details, isHidden: isHidden });
                }
            }
        };
    }, [ability]);

    return (
        <div className={`w-full rounded-b-[6px] bg-base-white flex flex-col gap-1 px-4 pt-4 ${details?.isHidden ? "pb-8" : "pb-2"} relative`}>
            {
                details === null ?
                    <Loading /> :
                    (
                        details === undefined ?
                            <div className="w-full h-full flex items-center justify-center text-[3rem]">??????????</div> :
                            <>
                                <span className="italic tracking-[1px] leading-5"><Typewriter text={details.short_effect} duration={1}></Typewriter></span>
                                <hr className="bg-black h-[2px] w-full shrink-0" />
                                <div className={`max-h-[128px] overflow-y-auto ${global.overflow}`}>
                                    <div className="w-full h-full pr-[6px]">
                                        <Typewriter text={details.effect} duration={1}></Typewriter>
                                    </div>
                                </div>
                                {details.isHidden && <span className="w-full absolute left-0 bottom-0 bg-black/25 flex justify-end px-4 items-center">Hidden Ability</span>}
                            </>
                    )
            }
        </div>
    )
}

export default Abilities;