import { POKEMON_DB } from "@/constants/game/main";
import { IAbility } from "../interfaces/ability";
import { Stores } from "@/constants/game/enums";
import { BASE_API_URL_ABILITY } from "@/constants/game/urls";
import { getService } from "@/requests/fetch";
import { PokeAPIAbilityData } from "@/interfaces/poke-api";

/**
 * Get ability data from indexed db and fetch to update if does not exist
 *
 * @param ability Ability name
 * @returns Ability interface data
 */
export async function getAbilityData(id: number): Promise<IAbility | null> {
    return new Promise((resolve) => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const abilityTx = db.transaction(Stores.Ability, "readonly");

            const abilityData = abilityTx.objectStore(Stores.Ability).get(id);
            abilityData.onsuccess = () => {
                const data: IAbility = abilityData.result;
                if (!!data) {
                    resolve(data);
                } else {
                    fetchAbility(id)
                        .then((res) => {
                            const abilityTx = db
                                .transaction(Stores.Ability, "readwrite")
                                .objectStore(Stores.Ability)
                                .put(res, id);

                            abilityTx.onsuccess = () => {
                                resolve(res);
                            };
                        })
                        .catch((err) => {
                            resolve(null);
                        });
                }
            };

            abilityData.onerror = () => {
                resolve(null);
            };
        };
    });
}

/**
 * Get ability data
 */
async function fetchAbility(ability: number): Promise<IAbility> {
    return getService(`${BASE_API_URL_ABILITY}/${ability}`).then(
        (res: PokeAPIAbilityData) => {
            const name =
                res.names.find((name) => name.language.name === "en")?.name ??
                res.names[0].name ??
                "";
            const effectEntry =
                res.effect_entries?.find(
                    (effect) => effect.language.name === "en"
                )?.effect ?? null;
            const flavorText =
                res.flavor_text_entries
                    ?.filter((flavor) => flavor.language.name === "en")
                    ?.at(-1)?.flavor_text ?? null;

            return {
                name,
                effectEntry,
                flavorText,
            };
        }
    );
}
