import { cacheIsAllowed } from "@/common/components/home/cache/utils";
import { Stores } from "@/common/constants/enums";
import { POKEMON_DB } from "@/common/constants/main";
import { BASE_API_URL_POKEMON, BASE_API_URL_SPECIES } from "@/common/constants/urls";
import { PokeAPIData, PokeAPIDataMini, PokeAPISpecies } from "@/common/interfaces/_external";
import { PokemonCard, PokemonData, PokemonDetails, Sprites, Stats } from "@/common/interfaces/pokemon";
import { errorCheck } from "@/common/utils/errorCheck";
import { trimUrl } from "@/common/utils/string";
import { doBatchProcess, PokeAPIResponse } from "./_utils";

export async function updatePokemonDatabase(pokemon: PokeAPIResponse): Promise<number> {
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
            doBatchProcess(
                pokemon.results.map(p => p.url),
                processData
            ).then(res => {
                if (res > 0) {
                    const txAbility = request.result.transaction(Stores.Ability, 'readwrite');
                    Object.entries(initAbility).forEach(e => {
                        txAbility.objectStore(Stores.Ability).put(e[1], e[0]);
                    });
                    txAbility.oncomplete = () => {
                        result(res);
                    }
                } else {
                    result(-1);
                }
            }).catch(err => {
                result(-1);
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
                                    const insertTx = db.transaction(Stores.PokeDetails, 'readwrite').objectStore(Stores.PokeDetails).put(res, mainData.id.toString());
                                    insertTx.onsuccess = () => {
                                        result({
                                            ...mainData,
                                            ...res
                                        });
                                    };
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

async function fetchPokemonData(id: string, species: string): Promise<PokemonDetails | null> {
    return Promise.all([
        fetch(`${BASE_API_URL_POKEMON}/${id}`),
        fetch(`${BASE_API_URL_SPECIES}/${species}`),
    ]).then(([baseRequest, speciesRequest]) => {
        return Promise.all([errorCheck(baseRequest), errorCheck(speciesRequest)]);
    }).then(([baseRes, speciesRes]: [PokeAPIData, PokeAPISpecies]) => {
        let payload: PokemonDetails = {
            stats: baseRes.stats.reduce((acc, statData) => {
                acc[statData.stat.name] = {
                    baseStat: statData.base_stat,
                    effort: statData.effort,
                }
                return acc;
            }, {} as Stats),
            sprites: [
                ...(Object.entries(baseRes.sprites.versions).reduce((acc, [gen, value]) => {
                    acc = acc.concat(Object.entries(value).reduce((acc2, [game, views]) => {
                        let title = game;
                        if (title.toLowerCase().includes("icons")) {
                            title = `${gen}-icon`;
                        }
                        if (views["front_default"]) {
                            acc2.push({ game: title, url: views["front_default"] })
                        }
                        return acc2;
                    }, [] as Sprites[]));
                    return acc;
                }, [] as Sprites[])),
                ...(Object.entries(baseRes.sprites.other).reduce((acc, [title, images]) => {
                    if (title !== "official-artwork") {
                        const defaultImage = images["front_default"];
                        if (defaultImage) {
                            acc.push({ game: title, url: defaultImage });
                        }
                    }
                    return acc;
                }, [] as Sprites[])),
            ],
            moves: baseRes.moves.reduce((acc, move) => {
                const id = trimUrl(move.move.url);
                acc[id] = move.version_group_details.reduce((acc: Record<string, string[]>, details) => {
                    const parsedName = `${details.move_learn_method.name}${!!details.level_learned_at ? `@${details.level_learned_at}` : ""}`
                    if (!!acc[parsedName]) {
                        acc[parsedName].push(details.version_group.name);
                    } else {
                        acc[parsedName] = [details.version_group.name];
                    }
                    return acc;
                }, {});
                return acc;
            }, {} as Record<string, Record<string, string[]>>),
            heldItemIDs: baseRes.held_items.map(item => trimUrl(item.item.url)),
            metaData: {
                cries: baseRes.cries.latest,
                baseExperience: baseRes.base_experience,
                height: baseRes.height,
                weight: baseRes.weight,
                details: {
                    baseHappiness: speciesRes.base_happiness,
                    captureRate: speciesRes.capture_rate,
                    growthRate: speciesRes.growth_rate?.name,
                    eggGroups: speciesRes.egg_groups.map(group => group.name),
                    genderRate: speciesRes.gender_rate,
                    hatchCounter: speciesRes.hatch_counter,
                },
            },
            speciesData: {
                genera: speciesRes.genera.find(genus => genus.language.name === "en")?.genus,
                habitat: speciesRes.habitat?.name,
                shape: speciesRes.shape?.name,
                isBaby: speciesRes.is_baby,
                isLegendary: speciesRes.is_legendary,
                isMythical: speciesRes.is_mythical,
                flavorText: speciesRes.flavor_text_entries.filter(flavorText => flavorText.language.name === "en").at(-1)?.flavor_text,
            },
            evolutions: {
                chain: trimUrl(speciesRes.evolution_chain.url),
                variants: speciesRes.varieties.map(variant => trimUrl(variant.pokemon.url)),
                formDescription: speciesRes.form_descriptions.find(desc => desc.language.name === "en")?.description,
                formSwitchable: speciesRes.forms_switchable,
            },
            encounters: {
                palPark: speciesRes.pal_park_encounters.map(enc => ({ area: enc.area.name, base_score: enc.base_score, rate: enc.rate }))
            }
        };
        return payload;
    }).catch(err => {
        return null;
    })
}

