import { trimUrl } from "@/common/utils/trimUrl";
import { cacheIsAllowed } from "../../home/cache/utils";
import { BASE_API_URL_POKEMON } from "../constants";
import { MoveVersions, VersionDetails } from "../contents/pokemon/interfaces/moves";
import { Pokemon, SecondaryData, Stats } from "../contents/pokemon/interfaces/pokemon";
import { GenSprites, Sprites } from "../contents/pokemon/interfaces/sprites";
import { POKEMON_DB, Stores, validateDatabase } from "./db";

type InitAbliity = { pokemons: { id: string, isHidden: boolean }[], name: string };
type InitMoves = { pokemons: {[key: string]: {}}, name: string }
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
                            let aId = trimUrl(a.ability.url);
                            const ability = { id: pokeRes.id.toString(), isHidden: a.is_hidden };
                            if (!initAbilities[aId]) {
                                initAbilities[aId] = { pokemons: [ability], name: a.ability.name }
                            } else {
                                initAbilities[aId].pokemons.push(ability);
                            }
                            return aId;
                        }),
                        name: pokeRes.name,
                        id: pokeRes.id.toString(),
                        index: parseInt(trimUrl(pokeRes.species.url)),
                        base_experience: pokeRes.base_experience,
                        cries: pokeRes.cries.latest,
                        height: pokeRes.height,
                        held_items: pokeRes.held_items.map((i: any) => (trimUrl(i.item.url))),
                        main_sprite: pokeRes.sprites.other["official-artwork"]?.front_default ?? pokeRes.sprites.front_default,
                        moves: pokeRes.moves.map((m: any) => {
                            let id = trimUrl(m.move.url);
                            if (!initMoves[id]) {
                                initMoves[id] = { pokemons: { [pokeRes.id.toString()]: []}, name: m.move.name }
                            } else {
                                initMoves[id].pokemons[pokeRes.id.toString()] = [];
                            }

                            return id;
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
                    insert.add(necessaryData, pokeRes.id.toString());
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

export async function getPokemonById(id: string): Promise<Pokemon | null> {
    return new Promise(res => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const pokemonList = db.transaction(Stores.Pokemon, 'readonly').objectStore(Stores.Pokemon).get(id);
    
            pokemonList.onsuccess = () => {
                res(pokemonList.result ?? null);
            }

            pokemonList.onerror = () => {
                res(null);
            }
        }
    })
}

function fetchSecondaryData(id: string): Promise<SecondaryData | null> {
    return new Promise(result => {
        fetch(`${BASE_API_URL_POKEMON}/${id}`).then(res => {
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

            const moveVersions = res?.moves?.reduce((acc: MoveVersions, c: any) => {
                acc[trimUrl(c.move.url)] = c.version_group_details.map((vgd: any) => ({
                    ...(vgd.level_learned_at && {min_level: vgd.level_learned_at}),
                    method: vgd.move_learn_method?.name,
                    version: vgd.version_group?.name
                }))

                return acc;
            }, {})

            result({ moveVersions, spritesData });
        }).catch(err => {
            result(null)
        })
    })    
}

export async function processSecondaryData(pokeId: string, moves: string[]): Promise<SecondaryData | null> {
    return new Promise(result => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;

            if (cacheIsAllowed()) {
                const movesTx = db.transaction(Stores.Moves, 'readonly');

                Promise.all(
                    moves.map(m => new Promise(result => {
                        const moveData = movesTx.objectStore(Stores.Moves).get(m)
                        moveData.onsuccess = () => {
                            if (moveData.result.pokemons[pokeId].length > 0) {
                                result([m, moveData.result.pokemons[pokeId]])
                            } else {
                                result(undefined);
                            }
                        }
                    }))
                ).then(res => {
                    const spritesData = db.transaction(Stores.Sprites, 'readonly').objectStore(Stores.Sprites).get(pokeId);
                    spritesData.onsuccess = () => {
                        if (res.filter(Boolean).length === moves.length && spritesData.result) {
                            let moveVersions = Object.fromEntries(res as [string, VersionDetails[]][])
                            result({ moveVersions, spritesData: spritesData.result });
                        } else {
                            fetchSecondaryData(pokeId).then(res => {
                                if (res) {
                                    const { moveVersions, spritesData } = res;
                                    const insertTx = db.transaction(Stores.Moves, 'readwrite');
                                    const store = insertTx.objectStore(Stores.Moves);
                                    Object.entries(moveVersions).forEach(([moveId, versionDetails]) => {
                                        const moveData = store.get(moveId);
                                        moveData.onsuccess = () => {
                                            const data = moveData.result;
                                            data.pokemons[pokeId] = versionDetails;
                                            store.put(data, moveId);
                                        }

                                    })

                                    insertTx.oncomplete = () => {
                                        const insertSprites = db.transaction(Stores.Sprites, 'readwrite').objectStore(Stores.Sprites).put(spritesData, pokeId); 
                                        insertSprites.onsuccess  = () => {
                                            result(res);
                                        }
                                    }
                                }
                                result(res);
                            })
                        }
                    }
                })
            } else {
                fetchSecondaryData(pokeId).then(res => {
                    result(res)
                });
            }
        }
    })
}

export async function getVarietySprite(id: string): Promise<{name: string, url: string}> {
    function fetchVarietySprite(id: string): Promise<{name: string, url: string}> {
        return new Promise(result => {
            fetch(`${BASE_API_URL_POKEMON}/${id}`).then(res => {
                if (!res.ok) throw new Error("Failed to fetch data from API");
        
                return res.json();
            }).then(res => {
                result({name: res?.name, url: res?.sprites?.front_default});
            }).catch(err => {
                result({name: "", url: ""})
            })
        })    
    }

    return new Promise(result => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;

            if (cacheIsAllowed()) {
                const spritesTx = db.transaction(Stores.Sprites, 'readonly').objectStore(Stores.Sprites).get(id);
                spritesTx.onsuccess = () => {
                    const pokedata = db.transaction(Stores.Pokemon, 'readonly').objectStore(Stores.Pokemon).get(id);
                    
                    pokedata.onsuccess = () => {
                        if (spritesTx.result) {
                            result({ name: pokedata.result.name, url: spritesTx.result?.others?.base_default });
                        } else {
                            processSecondaryData(id, pokedata.result.moves).then(res => {
                                if (res) result({ name: pokedata.result.name, url: res.spritesData.others.base_default})
                            }); 
                        }
                    }
                }
            } else {
                fetchVarietySprite(id).then(res => {
                    result(res)
                });
            }
        }
    })
}