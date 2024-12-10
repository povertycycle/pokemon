import { PokeAPIDataMini } from "@/common/interfaces/_external";
import { trimUrl } from "@/common/utils/trimUrl";
import { doBatchProcess, fetchPokemonData } from "./_utils";
import { POKEMON_DB, Stores, validateDatabase } from "./main-db";
import { PokemonDetails, PokemonCard, PokemonData } from "@/common/interfaces/pokemon";
import { cacheIsAllowed } from "@/common/components/home/cache/utils";

type PokeAPIResponse = {
    count: number,
    next: string,
    previous: string,
    results: { name: string, url: string }[]
}

export async function validatePokemonDatabase(onsuccess: () => void, onfailed: () => void) {
    const request = indexedDB.open(POKEMON_DB);

    request.onsuccess = () => {
        let db: IDBDatabase = request.result;
        const pokemonList = db.transaction(Stores.Pokemon, 'readonly').objectStore(Stores.Pokemon).getAll();

        pokemonList.onsuccess = () => {
            const dbCount = pokemonList.result.length;
            validateDatabase(db, dbCount).then(res => {
                if (res) {
                    onsuccess();
                } else {
                    onfailed();
                }
            });
        }
    }
}

export async function updatePokemonDatabase(pokemon: PokeAPIResponse): Promise<boolean> {
    return new Promise(result => {
        const request = indexedDB.open(POKEMON_DB);
        const initAbility: { [key: string]: { pokemon: { id: string, isHidden: boolean }[] } } = {};
        function processData(data: PokeAPIDataMini) {
            const insert = request.result.transaction(Stores.Pokemon, 'readwrite').objectStore(Stores.Pokemon);
            const abilities = data.abilities.map((ability) => {
                let name = ability.ability.name;
                const p = {
                    id: data.id.toString(),
                    isHidden: ability.is_hidden
                };
                if (!initAbility[name]) {
                    initAbility[name] = {
                        pokemon: [p]
                    }
                } else {
                    initAbility[name].pokemon.push(p);
                }
                return name;
            })

            const necessaryData = {
                id: data.id,
                abilities: abilities,
                name: data.name,
                index: parseInt(trimUrl(data.species.url)),
                mainSprites: {
                    default: data.sprites.other["official-artwork"]?.front_default ?? data.sprites.front_default,
                    icon: data.sprites.front_default
                },
                species: data.species.name,
                types: data.types.map((t: any) => (t.type.name)),
            }
            insert.add(necessaryData, data.id.toString());
        }

        request.onsuccess = () => {
            doBatchProcess(pokemon.results.map((p: any)=>(p.url)), processData).then(res=> {
                if (res) {
                    const txAbility = request.result.transaction(Stores.Ability, 'readwrite');
                    Object.entries(initAbility).forEach(e =>{
                        txAbility.objectStore(Stores.Ability).put(e[1], e[0]);
                    });
                    result(true);
                } else {
                    result(false);
                }
            }).catch(err => {
                result(false);
            })
        }
    })
}

export async function getAllPokemons(): Promise<PokemonCard[] | null> {
    return new Promise(res => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const pokemonList = db.transaction(Stores.Pokemon, 'readonly').objectStore(Stores.Pokemon).getAll();
    
            pokemonList.onsuccess = () => {
                res(pokemonList.result ?? null);
            }

            pokemonList.onerror = () => {
                res(null);
            }
        }
    })
}

export async function getPokemonData(id: string): Promise<PokemonData | null> {
    return new Promise((result, reject) => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const mainRequest = db.transaction(Stores.Pokemon, 'readonly').objectStore(Stores.Pokemon).get(id);
            mainRequest.onsuccess = () => {
                const mainData = mainRequest.result as PokemonCard;
                if (!!!mainData) {
                    reject("Missing initial pokemon data. Please contact developer.");
                } else {
                    const detailsRequest = db.transaction(Stores.PokeDetails, 'readwrite').objectStore(Stores.PokeDetails).get(id);
                    detailsRequest.onsuccess = () => {
                        if (!!detailsRequest.result) {
                            result({
                                ...mainData,
                                ...detailsRequest.result
                            });
                        } else {
                            fetchPokemonData(id, mainData.species).then(res => {
                                if (!res) {
                                    reject("Unable to fetch data from API. Please contact developer");
                                } else {
                                    const insertTx = db.transaction(Stores.PokeDetails, 'readwrite').objectStore(Stores.PokeDetails);
                                    if (cacheIsAllowed()) {
                                        insertTx.put(res, mainData.id.toString());
                                    }
                                    result({
                                        ...mainData,
                                        ...res
                                    });
                                }
                            })
                        }
                    }

                    detailsRequest.onerror = (e: any) => {
                        reject(e);
                    }
                }
            }

            mainRequest.onerror = (e: any) => {
                reject(e);
            }
        }
    })
}