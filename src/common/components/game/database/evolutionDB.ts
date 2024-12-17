import { cacheIsAllowed } from "../../home/cache/utils";
import { BASE_API_URL_EVOLUTION } from "../../../constants/urls";
import { EvolutionChain } from "../contents/pokemon/interfaces/evolution";
import { errorCheck } from "@/common/utils/errorCheck";
import { trimUrl } from "@/common/utils/string";
import { Stores } from "@/common/constants/enums";
import { POKEMON_DB } from "@/common/constants/main";

const namedKeys = ["trigger", "party_type", "known_move_type", "location"];

function getChainData(chains: any[], acc: EvolutionChain[][], baby_item?: string): EvolutionChain[][] {
    if (chains.length <= 0) return acc;

    let newAcc = acc.concat([chains.map(c => ({
        ...(c.is_baby && { is_baby: baby_item === "-1" ? "" : baby_item }),
        species: c.species.name,
        ...(c.evolution_details.length > 0 ? {
            evolution_details: c.evolution_details.map((d: any) => (
                Object.entries(d as { [key: string]: any }).reduce((acc: { [key: string]: string | boolean | number }, [key, value]) => {
                    if (value) {
                        if (namedKeys.includes(key)) {
                            acc[key] = value.name
                        } else if (typeof value === 'object' && !!value.url) {
                            acc[key] = trimUrl(value.url)
                        } else {
                            acc[key] = value;
                        }
                    }
                    return acc;
                }, {})))
        } : undefined)
    }))]);
    return getChainData(chains.reduce((a, c) => (a.concat(c.evolves_to)), []), newAcc);
}

function fetchEvolutionData(chain: string): Promise<EvolutionChain[][]> {
    return new Promise(result => {
        fetch(`${BASE_API_URL_EVOLUTION}/${chain}`).then(res => {
            return errorCheck(res);
        }).then(res => {
            const evolData = getChainData([res.chain], [], trimUrl(res.baby_trigger_item?.url))
            if (evolData.length > 10) throw new Error("Maximum depths reached")
            result(evolData);
        }).catch(err => {
            // ERROR;
        })
    })
}

export function fetchEvolutionChain(chain: string): Promise<EvolutionChain[][]> {
    return new Promise(result => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const evolTx = db.transaction(Stores.Evolution, 'readonly');

            if (cacheIsAllowed()) {
                const evolutionData = evolTx.objectStore(Stores.Evolution).get(chain);

                evolutionData.onsuccess = () => {
                    if (evolutionData.result) {
                        result(evolutionData.result);
                    } else {
                        fetchEvolutionData(chain).then(res => {
                            db.transaction(Stores.Evolution, 'readwrite').objectStore(Stores.Evolution).put(res, chain);
                            result(res);
                        })
                    }
                }

            } else {
                fetchEvolutionData(chain).then(res => {
                    result(res);
                });
            }
        }
    })
}