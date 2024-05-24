import { cacheIsAllowed } from "../../home/cache/utils";
import { BASE_API_URL_EVOLUTION, BASE_API_URL_SPECIES } from "../constants";
import { EvolutionChain } from "../contents/pokemon/interfaces/evolution";
import { POKEMON_DB, Stores } from "./db";


function getChainData(chains: any[], acc: EvolutionChain[][]): EvolutionChain[][] {
    if (chains.length <= 0) return acc;

    let newAcc = acc.concat([chains.map(c => ({
        is_baby: c.is_baby,
        species_id: c.species.url.replaceAll(BASE_API_URL_SPECIES, "").replaceAll("/", ""),
        ...(c.evolution_details.length > 0 ? {
            evolution_details: c.evolution_details.map((d: any) => ({
                trigger: d.trigger?.name,
                min_level: d.min_level
            }))
        } : undefined)
    }))]);

    return getChainData(chains.reduce((a, c) => (a.concat(c.evolves_to)), []), newAcc);
}

function fetchEvolutionData(chain: string): Promise<EvolutionChain[][]> {
    return new Promise(result => {
        fetch(`${BASE_API_URL_EVOLUTION}/${chain}`).then(res => {
            if (!res.ok) throw new Error("Failed to fetch data from API");
    
            return res.json();
        }).then(res => {
            const evolData = getChainData([res.chain], [])
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