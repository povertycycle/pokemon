import { cacheIsAllowed } from "@/common/components/home/cache/utils";
import { Stores } from "@/common/constants/enums";
import { POKEMON_DB } from "@/common/constants/main";
import { BASE_API_URL_EVOLUTION } from "@/common/constants/urls";
import { PokeAPIEvolution, PokeAPIEvolutionChain, PokeAPIEvolutionDetails } from "@/common/interfaces/_externals/evolution";
import { EvolutionData } from "@/common/interfaces/evolution";
import { errorCheck } from "@/common/utils/errorCheck";
import { trimUrl } from "@/common/utils/string";

export async function getEvolutionData(chain: string): Promise<EvolutionData | null> {
    return new Promise(resolve => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const evolutionTx = db.transaction(Stores.Evolution, 'readonly');
            const evolutionData = evolutionTx.objectStore(Stores.Evolution).get(chain);
            evolutionData.onsuccess = () => {
                const data: EvolutionData = evolutionData.result;
                if (!!data) {
                    resolve(data);
                } else {
                    fetchEvolutionData(chain).then(res => {
                        if (cacheIsAllowed() && !!res) {
                            const insertTx = db.transaction(Stores.Evolution, 'readwrite').objectStore(Stores.Evolution).put(
                                res,
                                chain
                            )
                            insertTx.onsuccess = () => {
                                resolve(res);
                            }
                            insertTx.onerror = () => {
                                resolve(res);
                            }
                        } else {
                            resolve(res);
                        }
                    }).catch(err => {
                        console.error(err);
                        resolve(null);
                    })
                }
            }

            evolutionData.onerror = () => {
                resolve(null);
            }
        }
    })
}

async function fetchEvolutionData(chain: string): Promise<EvolutionData | null> {
    return fetch(`${BASE_API_URL_EVOLUTION}/${chain}`).then(res => {
        return errorCheck(res);
    }).then((res: PokeAPIEvolutionChain) => {
        const babyItemId = res.baby_trigger_item?.url ? trimUrl(res.baby_trigger_item.url) : undefined;
        return parseEvolutionData([res.chain], 0, babyItemId)?.[0] ?? null;
    }).catch(err => {
        console.error(err);
        return null;
    })
}

function parseEvolutionData(chains: PokeAPIEvolution[], depth: number, babyItemId?: string): EvolutionData[] | undefined {
    if (depth >= 5) {
        throw new Error("Exceeding maximum depth: 5");
    };

    if (chains.length === 0) {
        return;
    } else {
        return chains.map(
            chain => {
                const conditions = processConditionsData(chain.evolution_details);
                const evolutions = parseEvolutionData(chain.evolves_to, depth + 1);
                return {
                    ...(chain.is_baby && { isBaby: true }),
                    ...(!!babyItemId && { babyItemId }),
                    pokemon: trimUrl(chain.species.url),
                    ...(conditions.length > 0 && { conditions }),
                    ...(!!evolutions && { evolutions })
                }
            }
        )
    }
}

function processConditionsData(data: PokeAPIEvolutionDetails[]) {
    const processed = data.map(details => {
        return Object.entries(details).reduce((acc: Record<string, string | number | boolean>, [method, value]) => {
            if (!!value) {
                if (typeof value === "object") {
                    if (["known_move_type", "location", "party_type", "trigger"].includes(method)) {
                        acc[method] = value.name;
                    } else {
                        acc[method] = trimUrl(value.url);
                    }
                } else {
                    acc[method] = value;
                }
            } else if (method === "relative_physical_stats" && typeof value === "number") {
                acc[method] = value;
            }

            return acc;
        }, {});;
    });
    return processed.reduce((acc, data) => {
        let added = false;
        acc.forEach(settled => {
            const keyA = Object.keys(settled).sort();
            const keyB = Object.keys(data).sort();
            if (JSON.stringify(keyA) === JSON.stringify(keyB)) {
                Object.entries(data).forEach(([key, value]) => {
                    if (settled[key] && typeof value === "string" && value !== settled[key]) {
                        settled[key] += `;${value}`;
                    } else {
                        settled[key] = value;
                    }
                })
                added = true;
                return;
            }
        });
        if (!added) {
            acc.push(data);
        }
        return acc;
    }, [] as Record<string, string | number | boolean>[])
}
