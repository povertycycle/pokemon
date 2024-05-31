import { cacheIsAllowed } from "../../home/cache/utils";
import { BASE_API_URL_ABILITY } from "../constants";
import { AbilityDetails } from "../contents/pokemon/interfaces/ability";
import { POKEMON_DB, Stores } from "./db";

function fetchAbilityData(id: string, pokemon: string): Promise<{ name: string, data: AbilityDetails | null, isHidden: boolean }> {
    return new Promise(result => {
        fetch(`${BASE_API_URL_ABILITY}/${id}`).then(res => {
            if (!res.ok) throw new Error("Failed to fetch data from API");
    
            return res.json();
        }).then(res => {
            let eE =  res.effect_entries.find((e: any) => (e.language.name === "en"));
            let h = res.pokemon.find((p: any) => (p.pokemon.name === pokemon))?.is_hidden
            const abilityData = {
                ...(!res.is_main_series && { not_main_series: true }),
                effect_entries: { effect: eE?.effect, short_effect: eE?.short_effect },
            }
            result({ name: res.name, data: abilityData, isHidden: h });
        }).catch(err => {
            result({ name: "", data: null, isHidden: false });
        })
    })
}

export function getAbilityData(id: string, pokemon: string, pokeId: string): Promise<{ name: string, data: AbilityDetails | null, isHidden: boolean }> {
    return new Promise(result => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const abilityTx = db.transaction(Stores.Ability, 'readonly');

            if (cacheIsAllowed()) {
                const abilityData = abilityTx.objectStore(Stores.Ability).get(id);
                
                abilityData.onsuccess = () => {
                    if (abilityData.result?.data) {
                        result({ name: abilityData.result.name, data: abilityData.result?.data, isHidden: abilityData.result.pokemons.find((p: any) => (p.id === pokeId))?.isHidden ?? false });
                    } else {
                        fetchAbilityData(id, pokemon).then(res => {
                            db.transaction(Stores.Ability, 'readwrite').objectStore(Stores.Ability).put({
                                ...abilityData.result,
                                data: res.data
                            }, id);
                            result(res);
                        })
                    }
                }
            } else {
                fetchAbilityData(id, pokemon).then(res => {
                    result(res);
                });
            }
        }
    })
}