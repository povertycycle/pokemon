import { errorCheck } from "@/common/utils/errorCheck";
import { cacheIsAllowed } from "../../home/cache/utils";
import { BASE_API_URL_ABILITY } from "../constants";
import { AbilityDetails } from "../contents/pokemon/interfaces/ability";
import { POKEMON_DB, Stores } from "./db";

function fetchAbilityData(id: string, pokemon: string): Promise<AbilityDetails | null> {
    return new Promise(result => {
        fetch(`${BASE_API_URL_ABILITY}/${id}`).then(res => {
            return errorCheck(res);
        }).then(res => {
            let eE =  res.effect_entries?.find((e: any) => (e.language.name === "en"));
            let h = res.pokemon.find((p: any) => (p.pokemon.name === pokemon))?.is_hidden;
            const abilityData = {
                ...(!res.is_main_series && { not_main_series: true }),
                flavor_text: res?.flavor_text_entries?.filter((fTE: any) => (fTE.language.name === "en"))?.at(-1)?.flavor_text ?? "-",
                ...(eE?.effect &&  { effect: eE.effect }),
            }
            result({ name: res.name, is_hidden: h, data: abilityData });
        }).catch(err => {
            result(null);
        })
    })
}

export function getAbilityData(id: string, pokemon: string, pokeId: string): Promise<AbilityDetails | null> {
    return new Promise(result => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const abilityTx = db.transaction(Stores.Ability, 'readonly');

            if (cacheIsAllowed()) {
                const abilityData = abilityTx.objectStore(Stores.Ability).get(id);
                
                abilityData.onsuccess = () => {
                    if (abilityData.result?.data) {
                        result({ name: abilityData.result.name, data: abilityData.result.data, is_hidden: abilityData.result.pokemons.find((p: any) => (p.id === pokeId))?.is_hidden ?? false });
                    } else {
                        fetchAbilityData(id, pokemon).then(res => {
                            if (res?.data) {
                                db.transaction(Stores.Ability, 'readwrite').objectStore(Stores.Ability).put({
                                    ...abilityData.result,
                                    data: res.data,
                                }, id);
                                result(res);
                            } else {
                                result(null);
                            }
                        }).catch(err => {
                            result(null)
                        })
                    }
                }
            } else {
                fetchAbilityData(id, pokemon).then(res => {
                    result(res);
                }).catch(err => {
                    result(null)
                });
            }
        }
    })
}