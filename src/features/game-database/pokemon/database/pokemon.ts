import {
    PokeAPIData,
    PokeAPIDataMoves,
    PokeAPIDataSprites,
    PokeAPISpecies,
} from "@/interfaces/poke-api";
import { Stores } from "@/constants/game/enums";
import { MAIN_ICON, POKEMON_DB } from "@/constants/game/main";
import {
    BASE_API_URL_POKEMON,
    BASE_API_URL_SPECIES,
} from "@/constants/game/urls";
import { getService } from "@/requests/fetch";
import { parseUrlAsId } from "@/utils/strings";
import {
    IMoves,
    PokeData,
    PokemonBase,
    PokemonData,
    PokemonDetails,
    PokeRequest,
    Sprites,
    IStats,
} from "../interfaces/pokemon";

/**
 * Get all pokemon data from database
 *
 * @returns List of pokemon data or null
 */
export async function getAllPokemons(): Promise<PokeRequest[]> {
    return new Promise((res, reject) => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            const db: IDBDatabase = request.result;
            const pokemonList = db
                .transaction(Stores.Pokemon, "readonly")
                .objectStore(Stores.Pokemon)
                .getAll();

            pokemonList.onsuccess = () => {
                res(pokemonList.result);
            };

            pokemonList.onerror = (e: any) => {
                reject(e?.message);
            };
        };
    });
}

/**
 * Get individual pokemon data from the database
 *
 * @param id Pokemon Id
 * @returns Pokemon base data without details
 */
export async function getPokemonData(id: number): Promise<PokemonBase> {
    return new Promise((result, reject) => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            const db: IDBDatabase = request.result;
            const pokeRequest = db
                .transaction(Stores.Pokemon, "readonly")
                .objectStore(Stores.Pokemon)
                .get(id);
            pokeRequest.onsuccess = () => {
                const pokeData = pokeRequest.result;

                if (!pokeData.data) {
                    fetchData(id)
                        .then((data) => {
                            const newData = {
                                ...pokeData,
                                data,
                            };

                            const insertTx = db
                                .transaction(Stores.Pokemon, "readwrite")
                                .objectStore(Stores.Pokemon)
                                .put(newData, id);
                            insertTx.onsuccess = () => {
                                result(newData);
                            };
                        })
                        .catch((err) => {
                            reject(err?.message);
                        });
                } else {
                    result(pokeData);
                }
            };

            pokeRequest.onerror = (e: any) => {
                reject(e);
            };
        };
    });
}

/**
 * Helper function to retrieve incomplete data from PokeAPI
 *
 * @param id Pokemon Id
 * @returns PokeData formatted response
 */
async function fetchData(id: number): Promise<PokeData> {
    return getService(`${BASE_API_URL_POKEMON}/${id}`).then(
        (res: PokeAPIData) => {
            return {
                abilities: res.abilities.map((ability) => ({
                    id: parseUrlAsId(ability.ability.url),
                    isHidden: ability.is_hidden,
                })),
                index: parseUrlAsId(res.species.url),
                species: res.species.name,
                types: res.types.map((t) => t.type.name),
                stats: res.stats.reduce((acc, stat) => {
                    acc[stat.stat.name] = {
                        baseStat: stat.base_stat,
                        effort: stat.effort,
                    };
                    return acc;
                }, {} as IStats),
                heldItems: res.held_items.map((item) =>
                    parseUrlAsId(item.item.url)
                ),
                metaData: {
                    cries: res.cries.latest,
                    baseExperience: res.base_experience,
                    height: res.height,
                    weight: res.weight,
                    details: null,
                },
                sprites: formatSprites(res.sprites),
                moves: formatMoves(res.moves),
            };
        }
    );
}

/**
 * Helper to format sprites
 * @param sprites PokeAPI sprites
 */
function formatSprites(sprites: PokeAPIDataSprites): Sprites[] {
    const gameSprites: Sprites[] = [
        {
            game: MAIN_ICON,
            url: sprites.front_default,
        },
    ];

    Object.entries(sprites.versions).forEach(([gen, values]) => {
        Object.entries(values).forEach(([game, views]) => {
            const url = views["front_default"] || Object.values(views)[0];
            if (url) {
                gameSprites.push({
                    game: game.toLowerCase().includes("icons")
                        ? `${gen}-icon`
                        : game,
                    url,
                });
            }
        });
    });

    Object.entries(sprites.other).forEach(([title, images]) => {
        const defaultImage = images["front_default"];
        if (defaultImage) {
            gameSprites.push({ game: title, url: defaultImage });
        }
    });

    return gameSprites;
}

/**
 * Helper function to format move list from PokeAPI
 * @param moves PokeAPI move list
 */
function formatMoves(moves: PokeAPIDataMoves[]): IMoves {
    const formatted: IMoves = {};

    moves.forEach(({ move, version_group_details }) => {
        const moveId = parseUrlAsId(move.url);
        version_group_details.forEach((details) => {
            const method = details.move_learn_method.name;
            const version = details.version_group.name;
            const level = details.level_learned_at;
            const payload =
                method === "level-up" ? `${moveId}@${level}` : moveId;

            if (formatted[version]) {
                if (formatted[version][method]) {
                    formatted[version][method].push(payload);
                } else {
                    formatted[version][method] = [payload];
                }
            } else {
                formatted[version] = {
                    [method]: [payload],
                };
            }
        });
    });

    return formatted;
}

/**
 * Get pokemon full details
 * @param id Pokemon id
 * @returns Pokemon data
 */
export async function getPokemonDetails(
    id: number
): Promise<PokemonData | null> {
    return new Promise((result, reject) => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            getPokemonData(id)
                .then((res) => {
                    const db: IDBDatabase = request.result;
                    const detailsRequest = db
                        .transaction(Stores.PokeDetails, "readonly")
                        .objectStore(Stores.PokeDetails)
                        .get(id);

                    detailsRequest.onsuccess = () => {
                        const details = detailsRequest.result as PokemonDetails;

                        if (!!details) {
                            result({
                                ...res,
                                details,
                            });
                        } else {
                            fetchDetails(res.data.species).then(
                                (detailsRes) => {
                                    const insertTx = db
                                        .transaction(
                                            Stores.PokeDetails,
                                            "readwrite"
                                        )
                                        .objectStore(Stores.PokeDetails)
                                        .put(detailsRes, id);

                                    insertTx.onsuccess = () => {
                                        result({
                                            ...res,
                                            details: detailsRes,
                                        });
                                    };
                                }
                            );
                        }
                    };

                    detailsRequest.onerror = () => {
                        reject(null);
                    };
                })
                .catch((err) => {
                    reject(err?.message);
                });
        };
    });
}

async function fetchDetails(species: string): Promise<PokemonDetails> {
    return getService(`${BASE_API_URL_SPECIES}/${species}`).then(
        (res: PokeAPISpecies) => {
            const payload: PokemonDetails = {
                metaData: {
                    baseHappiness: res.base_happiness,
                    captureRate: res.capture_rate,
                    growthRate: res.growth_rate?.name,
                    eggGroups: res.egg_groups.map((group) => group.name),
                    genderRate: res.gender_rate,
                    hatchCounter: res.hatch_counter,
                },
                species: {
                    genus: res.genera.find(
                        (genus) => genus.language.name === "en"
                    )?.genus,
                    habitat: res.habitat?.name,
                    shape: res.shape?.name,
                    isBaby: res.is_baby,
                    isLegendary: res.is_legendary,
                    isMythical: res.is_mythical,
                    flavorText: res.flavor_text_entries
                        .filter(
                            (flavorText) => flavorText.language.name === "en"
                        )
                        .at(-1)?.flavor_text,
                },
                evolutions: {
                    chain: parseUrlAsId(res.evolution_chain.url),
                    variants: res.varieties.map((variant) =>
                        parseUrlAsId(variant.pokemon.url)
                    ),
                    formDescription: res.form_descriptions.find(
                        (desc) => desc.language.name === "en"
                    )?.description,
                    formSwitchable: res.forms_switchable,
                },
                encounters: {
                    palPark: res.pal_park_encounters.map((enc) => ({
                        area: enc.area.name,
                        base_score: enc.base_score,
                        rate: enc.rate,
                    })),
                },
            };
            return payload;
        }
    );
}
