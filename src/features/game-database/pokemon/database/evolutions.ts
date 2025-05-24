import { Stores } from "@/constants/game/enums";
import { POKEMON_DB } from "@/constants/game/main";
import { BASE_API_URL_EVOLUTION } from "@/constants/game/urls";
import {
    PokeAPIEvolution,
    PokeAPIEvolutionChain,
    PokeAPIEvolutionDetails,
} from "@/interfaces/poke-api";
import { getService } from "@/requests/fetch";
import { parseUrlAsId } from "@/utils/strings";

type RawEvolutionChain = {
    isBaby?: boolean;
    babyItemId?: number;
    pokemon: number;
    conditions?: Record<string, string | number | boolean>[];
    evolutions?: RawEvolutionChain[];
};

export type IEvolution = Omit<RawEvolutionChain, "evolutions">;

/**
 * Get processed evolution data in layers
 * @param chain Chain id
 */
export async function getEvolutionData(
    chain: number
): Promise<IEvolution[][] | null> {
    return getEvolutionChain(chain)
        .then((res) => {
            return processEvolutionLayer(res);
        })
        .catch((err) => {
            return null;
        });
}

/**
 * Helper to flatten raw evolution data
 */
function processEvolutionLayer(data: RawEvolutionChain[]): IEvolution[][] {
    let compiled = [] as IEvolution[][];

    function cleanData(evolution: RawEvolutionChain): IEvolution {
        const clean: IEvolution = {
            pokemon: evolution.pokemon,
        };
        if (evolution.isBaby) {
            clean.isBaby = evolution.isBaby;
        }
        if (evolution.babyItemId) {
            clean.babyItemId = evolution.babyItemId;
        }
        if (evolution.conditions) {
            clean.conditions = evolution.conditions;
        }
        return clean;
    }

    function addToCompilation(evolution: RawEvolutionChain, depth: number) {
        if (depth >= 5) {
            throw new Error("Exceeding maximum depth: 5");
        }

        const clean = cleanData(evolution);

        if (compiled[depth]) {
            compiled[depth].push(clean);
        } else {
            compiled[depth] = [clean];
        }

        evolution.evolutions?.forEach((evolution) => {
            addToCompilation(evolution, depth + 1);
        });
    }

    data.forEach((dat) => {
        addToCompilation(dat, 0);
    });

    return compiled;
}

/**
 * Get evolution chain from indexed db or fetch and update if it doesnt exist
 * @param chain Chain id
 */
async function getEvolutionChain(chain: number): Promise<RawEvolutionChain[]> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const evolutions = db
                .transaction(Stores.Evolution, "readonly")
                .objectStore(Stores.Evolution)
                .get(chain);

            evolutions.onsuccess = () => {
                let data: RawEvolutionChain[] = evolutions.result;

                if (!data) {
                    fetchEvolutionData(chain)
                        .then((res) => {
                            const insertTx = db
                                .transaction(Stores.Evolution, "readwrite")
                                .objectStore(Stores.Evolution)
                                .put(res, chain);

                            insertTx.onsuccess = () => {
                                resolve(res);
                            };

                            insertTx.onerror = (err: any) => {
                                reject(err?.message);
                            };
                        })
                        .catch((err) => {
                            reject(err?.message);
                        });
                } else {
                    resolve(data);
                }
            };

            evolutions.onerror = (err: any) => {
                reject(err?.message);
            };
        };
    });
}

/**
 * Helper function to fetch evolution data
 * @param chain Chain id
 */
async function fetchEvolutionData(chain: number): Promise<RawEvolutionChain[]> {
    return getService(`${BASE_API_URL_EVOLUTION}/${chain}`).then(
        (res: PokeAPIEvolutionChain) => {
            const babyItemId = res.baby_trigger_item?.url
                ? parseUrlAsId(res.baby_trigger_item.url)
                : undefined;

            return parseEvolutionData([res.chain], 0, babyItemId) ?? [];
        }
    );
}

/**
 * Helper function to reorganize nested evolution chain
 */
function parseEvolutionData(
    chains: PokeAPIEvolution[],
    depth: number,
    babyItemId?: number
): RawEvolutionChain[] | undefined {
    if (depth >= 5) {
        throw new Error("Exceeding maximum depth: 5");
    }

    if (chains.length === 0) {
        return;
    } else {
        return chains.map((chain) => {
            const conditions = processConditionsData(chain.evolution_details);
            const evolutions = parseEvolutionData(chain.evolves_to, depth + 1);

            return {
                ...(chain.is_baby && { isBaby: true }),
                ...(!!babyItemId && { babyItemId }),
                pokemon: parseUrlAsId(chain.species.url),
                ...(conditions.length > 0 && { conditions }),
                ...(!!evolutions && { evolutions }),
            };
        });
    }
}

/**
 * Helper to process evolution conditions data
 */
function processConditionsData(data: PokeAPIEvolutionDetails[]) {
    const processed = data.map((details) => {
        return Object.entries(details).reduce(
            (
                acc: Record<string, string | number | boolean>,
                [method, value]
            ) => {
                if (!!value) {
                    if (typeof value === "object") {
                        if (
                            [
                                "known_move_type",
                                "location",
                                "party_type",
                                "trigger",
                            ].includes(method)
                        ) {
                            acc[method] = value.name;
                        } else {
                            acc[method] = parseUrlAsId(value.url);
                        }
                    } else {
                        acc[method] = value;
                    }
                } else if (
                    method === "relative_physical_stats" &&
                    typeof value === "number"
                ) {
                    acc[method] = value;
                }

                return acc;
            },
            {}
        );
    });

    return processed.reduce((acc, data) => {
        let added = false;

        acc.forEach((settled) => {
            const keyA = Object.keys(settled).sort();
            const keyB = Object.keys(data).sort();
            if (JSON.stringify(keyA) === JSON.stringify(keyB)) {
                Object.entries(data).forEach(([key, value]) => {
                    if (
                        settled[key] &&
                        typeof value === "string" &&
                        value !== settled[key]
                    ) {
                        settled[key] += `;${value}`;
                    } else {
                        settled[key] = value;
                    }
                });
                added = true;
                return;
            }
        });

        if (!added) {
            acc.push(data);
        }

        return acc;
    }, [] as Record<string, string | number | boolean>[]);
}
