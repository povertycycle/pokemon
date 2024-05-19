import { cacheIsAllowed } from "../../home/cache/utils";
import { BASE_API_URL_POKEMON } from "../constants";
import { LevelMethodVersion, MoveDetailsType } from "../contents/pokemon/interfaces/moves";
import { Pokemon, SecondaryData, Stats } from "../contents/pokemon/interfaces/pokemon";
import { GenSprites, Sprites } from "../contents/pokemon/interfaces/sprites";
import { POKEMON_DB, Stores, validateDatabase } from "./db";

type InitAbliity = { pokemons: { name: string, isHidden: boolean }[] };
type InitMoves = { pokemons: {[key: string]: {}} }
type PokeData = { name: string, url: string }
type PokeAPIResponse = {
    count: number,
    next: string,
    previous: string,
    results: PokeData[]
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
    return new Promise(res => {
        const initAbilities: {[key: string]: InitAbliity} = {};
        const initMoves: {[key: string]: InitMoves} = {};
        Promise.all(pokemon.results.map(async (pokemon: PokeData) => {
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
                        main_sprite: pokeRes.sprites.other["official-artwork"]?.front_default ?? pokeRes.sprites.front_default,
                        moves: pokeRes.moves.map((m: any) => {
                            if (!initMoves[m.move.name]) {
                                initMoves[m.move.name] = { pokemons: { [pokeRes.name]: []} }
                            } else {
                                initMoves[m.move.name].pokemons[pokeRes.name] = [];
                            }

                            return m.move.name;
                        }),
                        stats: pokeRes.stats.reduce((acc: Stats, s: any) => {
                            acc[s.stat.name] = {
                                base_stat: s.base_stat,
                                effort: s.effort
                            }
                            return acc;
                        }, {}),
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

function fetchSecondaryData(pokemon: string): Promise<SecondaryData | null> {
    return new Promise(result => {
        fetch(`${BASE_API_URL_POKEMON}/${pokemon}`).then(res => {
            if (!res.ok) throw new Error("Failed to fetch data from API");
    
            return res.json();
        }).then(res => {
            const resSprites = res.sprites;
            const spritesData = {
                others: Object.entries(resSprites.other).reduce((acc: Sprites, entries: [string, any]) => {
                    const entry = { [entries[0]]: entries[1].front_default };
                    if (entry) {
                        acc = { ...acc, ...entry }
                    }
                    return acc
                }, {}),
                versions: Object.entries(resSprites.versions).reduce((acc: GenSprites, entries: [string, any]) => {
                    const subSprites = Object.entries(entries[1]).reduce((acc2: Sprites, entries2: [string, any]) => {
                        return { ...acc2, ...(entries2[1].front_default ? { [entries2[0]]: entries2[1].front_default } : undefined) }
                    }, {});

                    return Object.keys(subSprites).length === 0 ? acc : {
                        ...acc, [entries[0]]: subSprites
                    }
                }, {})
            }
            if (resSprites.front_default) {
                spritesData.others["base_default"] = resSprites.front_default
            }

            const moveDetails: MoveDetailsType = res.moves.reduce((acc: MoveDetailsType, move: any) => {
                acc[move.move.name] = move.version_group_details.map((vgp: any) => ({
                    levelLearned: vgp.level_learned_at,
                    method: vgp.move_learn_method.name,
                    version: vgp.version_group.name
                }));
                return acc;
            }, {});
            result({ moveDetails, spritesData });
        }).catch(err => {
            result(null)
        })
    })    
}

export async function processSecondaryData(pokemon: string, moves: string[]): Promise<SecondaryData | null> {
    function dataIncomplete(details: MoveDetailsType) {
        return Object.values(details).some(value => (value.length <= 0))
    }

    return new Promise(result => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;

            if (cacheIsAllowed()) {
                const moveTx = db.transaction(Stores.Moves, 'readonly');
                const store = moveTx.objectStore(Stores.Moves);
                const moveDetails: MoveDetailsType = moves.reduce((acc: MoveDetailsType, m: string) => {
                    const s = store.get(m);
                    s.onsuccess = () => {
                        acc[m] = s.result.pokemons[pokemon];
                    };
                    return acc;
                }, {})

                moveTx.oncomplete = () => {
                    const spritesData = db.transaction(Stores.Sprites, 'readonly').objectStore(Stores.Sprites).get(pokemon);
                    spritesData.onsuccess = () => {
                        if (!dataIncomplete(moveDetails) && spritesData.result) {
                            result({ moveDetails, spritesData: spritesData.result });
                        } else {
                            fetchSecondaryData(pokemon).then(res => {
                                if (res) {
                                    const { moveDetails, spritesData } = res;
                                    const moveInsTx = db.transaction(Stores.Moves, 'readwrite');
                                    const store = moveInsTx.objectStore(Stores.Moves);
                                    Object.entries(moveDetails).forEach((entry: [string, LevelMethodVersion[]]) => {
                                        const prev = store.get(entry[0]);
                                        prev.onsuccess = () => {
                                            const result = prev.result;
                                            result.pokemons[pokemon] = entry[1];
                                            store.put(result, entry[0]);                                    
                                        }
                                    })

                                    moveInsTx.oncomplete = () => {
                                        const spritesInsTx = db.transaction(Stores.Sprites, 'readwrite');
                                        spritesInsTx.objectStore(Stores.Sprites).put(spritesData, pokemon);
                                        spritesInsTx.oncomplete = () => {
                                            result({ moveDetails, spritesData });
                                        }
                                    }
                                } else {
                                    throw new Error("failed to process secondary data.")
                                }
                            }).catch(err => {
                                result(null);
                            })
                        }
                    }
                }
            } else {
                fetchSecondaryData(pokemon).then(res => {
                    result(res)
                });
            }
        }
    })
}

export async function getVarietySprite(pokemon: string): Promise<string> {
    function fetchVarietySprite(pokemon: string): Promise<string> {
        return new Promise(result => {
            fetch(`${BASE_API_URL_POKEMON}/${pokemon}`).then(res => {
                if (!res.ok) throw new Error("Failed to fetch data from API");
        
                return res.json();
            }).then(res => {
                result(res?.sprites?.front_default);
            }).catch(err => {
                result("")
            })
        })    
    }

    return new Promise(result => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;

            if (cacheIsAllowed()) {
                const spritesTx = db.transaction(Stores.Sprites, 'readonly').objectStore(Stores.Sprites).get(pokemon);
                spritesTx.onsuccess = () => {
                    if (spritesTx.result) {
                        result(spritesTx.result?.others?.base_default);
                    } else {
                        const moves = db.transaction(Stores.Pokemon, 'readonly').objectStore(Stores.Pokemon).get(pokemon);

                        moves.onsuccess = () => {
                            processSecondaryData(pokemon, moves.result.moves).then(res => {
                                if (res) result(res.spritesData.others.base_default)
                            });    
                        }
                    }
                }
            } else {
                fetchVarietySprite(pokemon).then(res => {
                    result(res)
                });
            }
        }
    })
}