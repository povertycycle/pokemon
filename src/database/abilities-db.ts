import { Stores } from "@/common/constants/enums";
import { POKEMON_DB } from "@/common/constants/main";
import { BASE_API_URL_ABILITY } from "@/common/constants/urls";
import { PokeAPIAbilityData } from "@/common/interfaces/_externals/ability";
import { AbilityCard, AbilityData, AbilityDataMini } from "@/common/interfaces/ability";
import { errorCheck } from "@/common/utils/errorCheck";
import { trimUrl } from "@/common/utils/string";

export async function getAbilityData(ability: string, pokeId: number): Promise<AbilityCard | null> {
    return new Promise(resolve => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const abilityTx = db.transaction(Stores.Ability, 'readonly');

            // if (cacheIsAllowed()) {
            const abilityData = abilityTx.objectStore(Stores.Ability).get(ability);
            abilityData.onsuccess = () => {
                const _data: AbilityData = abilityData.result;
                const isHidden = _data.pokemon.find(a => a.id === String(pokeId))?.isHidden ?? false;
                if (!!_data?.data) {
                    resolve({ ...abilityData.result.data, isHidden });
                } else {
                    fetchAbility(ability, pokeId).then(res => {
                        if (res.data) {
                            _data.data = res.data;
                            const abilityTx = db.transaction(Stores.Ability, 'readwrite').objectStore(Stores.Ability).put(
                                _data,
                                ability,
                            )

                            abilityTx.onsuccess = () => {
                                resolve({ ...res.data, isHidden })
                            }
                        } else {
                            resolve(null);
                        }
                    }).catch(err => {
                        resolve(null);
                    })
                }
            }

            abilityData.onerror = () => {
                resolve(null);
            }
            // } else {
            //     fetchAbility(ability, pokeId).then(res => {
            //         if (!!res) {
            //             resolve({ ...res.data, isHidden: res.isHidden })
            //         }
            //     }).catch(err => {
            //         resolve(null);
            //     })
            // }
        }
    })
}

async function fetchAbility(ability: string, pokeId: number): Promise<{ data: AbilityDataMini, isHidden: boolean }> {
    return fetch(`${BASE_API_URL_ABILITY}/${ability}`).then(res => {
        return errorCheck(res);
    }).then((res: PokeAPIAbilityData) => {
        const effect = res.effect_entries?.find(effect => (
            effect.language.name === "en"
        ));
        const text = res.flavor_text_entries?.filter(flavor => flavor.language.name === "en");
        const abilityCard = {
            effectEntry: effect?.effect ?? null,
            flavorText: text?.at(-1)?.flavor_text ?? null,
            id: res.id
        }
        const isHidden = res.pokemon.find(p => trimUrl(p.pokemon.url) === String(pokeId))?.is_hidden ?? false;

        return { data: abilityCard, isHidden };
    })
}