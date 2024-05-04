import { Pokemon } from "../contents/pokemon/interface";
import { POKEMON_DB, Stores, validateDatabase } from "./db";

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

type PokeData = {
    name: string,
    url: string,
}

type PokeAPIResponse = {
    count: number,
    next: string,
    previous: string,
    results: PokeData[]
}

type Ability = {
    name: string, isHidden: boolean
}

type InitAbliity = {
    pokemons: Ability[] 
}

type Move = {
    name: string
}

type InitMoves = {
    pokemons: {[key: string]: {}}
}

export async function updatePokemonDatabase(pokemon: PokeAPIResponse): Promise<boolean> {
    return new Promise(res => {

        const initAbilities: {[key: string]: InitAbliity} = {};
        const initMoves: {[key: string]: InitMoves} = {};
        Promise.all(pokemon.results.map((pokemon: PokeData) => {
            return fetch(pokemon.url).then(res => {
                if (!res.ok) throw new Error("Failed to fetch data from API");
                return res.json();
            })
        })).then(res => {
            const request = indexedDB.open(POKEMON_DB);

            request.onsuccess = () => {
                const insert = request.result.transaction(Stores.Pokemon, 'readwrite').objectStore(Stores.Pokemon);

                res.forEach(pokeRes => {
                    const necessaryData = {
                        abilities: pokeRes.abilities.map((a: any) => {
                            const ability = { name: pokeRes.name, isHidden: a.is_hidden };
                            if (!initAbilities[a.ability.name]) {
                                initAbilities[a.ability.name] = { pokemons: [ability] }
                            } else {
                                initAbilities[a.ability.name].pokemons.push(ability);
                            }
                            return a.ability.name;
                        }),
                        name: pokeRes.name,
                        index: parseInt(pokeRes.species.url.split("/").slice(-2)[0]),
                        base_experience: pokeRes.base_experience,
                        cries: pokeRes.cries.latest,
                        height: pokeRes.height,
                        held_items: pokeRes.held_items.map((i: any) => (i.item.name)),
                        moves: pokeRes.moves.map((m: any) => {
                            if (!initMoves[m.move.name]) {
                                initMoves[m.move.name] = { pokemons: { [pokeRes.name]: []} }
                            } else {
                                initMoves[m.move.name].pokemons[pokeRes.name] = [];
                            }

                            return m.move.name;
                        }),
                        stats: pokeRes.stats,
                        species: pokeRes.species.name,
                        types: pokeRes.types.map((t: any) => (t.type.name)),
                        weight: pokeRes.weight
                    };
                    insert.add(necessaryData, pokeRes.name);
                });
            }
        }).catch(err => {
            res(false);
        }).finally(() => {
            const request = indexedDB.open(POKEMON_DB);

            request.onsuccess = () => {
                const insert = request.result.transaction(Stores.Ability, 'readwrite');
                Object.entries(initAbilities).forEach((entries: [string, InitAbliity]) => {
                    insert.objectStore(Stores.Ability).put(entries[1], entries[0]);
                });
                insert.oncomplete = () => {
                    const insertMoves = request.result.transaction(Stores.Moves, 'readwrite');
                    Object.entries(initMoves).forEach((entries: [string, InitMoves]) => {
                        insertMoves.objectStore(Stores.Moves).put(entries[1], entries[0]);
                    });

                    insertMoves.oncomplete = () => {
                        res(true);
                    }
                }
                insert.onabort = () => {
                    res(false);
                }
            }
            
            request.onerror = () => {
                res(false);
            }
        })
    })
}

export async function getAllPokemons(): Promise<Pokemon[] | null> {
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

export async function getPokemonByName(pokemon: string): Promise<Pokemon | null> {
    return new Promise(res => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const pokemonList = db.transaction(Stores.Pokemon, 'readonly').objectStore(Stores.Pokemon).get(pokemon);
    
            pokemonList.onsuccess = () => {
                res(pokemonList.result ?? null);
            }

            pokemonList.onerror = () => {
                res(null);
            }
        }
    })
}