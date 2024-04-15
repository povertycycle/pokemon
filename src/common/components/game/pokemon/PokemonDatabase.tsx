import { useEffect, useState } from "react";
import Empty from "../Empty";
import Loading from "../Loading";
import Unavailable from "../Unavailable";
import { POKEMON_DB, Stores } from "../db";
import Display from "./Display";
import { Pokemon } from "../interface";
import { BASE_API_URL_POKEMON } from "../constants";

const VALIDATOR_KEY = "PkOq3NuqNXXxgpZZofHHlOc6JcDNKLne";

const PokemonDatabase: React.FC = () => {
    const [error, setError] = useState<boolean>(false);
    const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);

    const errorHandler = (error: boolean) => {
        if (error) throw new Error("Error fetching data from API");
    }

    const retrievePokemon = async () => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const pokemonList = db.transaction(Stores.Pokemon, 'readonly').objectStore(Stores.Pokemon).getAll();

            pokemonList.onsuccess = () => {
                const dbCount = pokemonList.result.length;
                const validator = db.transaction(Stores.Validator, 'readonly').objectStore(Stores.Validator).get(VALIDATOR_KEY);

                validator.onsuccess = () => {
                    const validatorCount = validator.result;
                    if (dbCount !== validatorCount) {
                        fetch(BASE_API_URL_POKEMON).then(response => {
                            errorHandler(!response.ok);
                            return response.json();
                        }).then(response => {
                            db.transaction(Stores.Validator, 'readwrite').objectStore(Stores.Validator).put(response.count, VALIDATOR_KEY);
                            return fetch(`${BASE_API_URL_POKEMON}?offset=0&limit=${response.count}`);
                        }).then(response => {
                            errorHandler(!response.ok);
                            return response.json();
                        }).then(response => {
                            let data = response.results.map((pokemon: { name: string, url: string }) => {
                                return fetch(pokemon.url).then(nestedRes => {
                                    if (nestedRes.ok) return nestedRes.json();
                                    else return null;
                                })
                            })
                            const initData: Pokemon[] = [];
                            Promise.all(data).then(promiseRes => {
                                const insert = db.transaction(Stores.Pokemon, 'readwrite').objectStore(Stores.Pokemon);
                                promiseRes.forEach(pokemon => {
                                    const necessaryData = {
                                        abilities: pokemon.abilities.map((a: any) => (a.ability.name)),
                                        base_experience: pokemon.base_experience,
                                        id: pokemon.id,
                                        height: pokemon.height,
                                        moves: pokemon.moves.map((m: any) => (m.move.name)),
                                        name: pokemon.name,
                                        stats: pokemon.stats,
                                        types: pokemon.types.map((t: any) => (t.type.name)),
                                        weight: pokemon.weight
                                    };
                                    initData.push(necessaryData);
                                    insert.add(necessaryData, pokemon.name);
                                })
                            })
                            setPokemons(initData);
                        }).catch(err => {
                            setError(true);
                        });
                    } else {
                        setPokemons(pokemonList.result);
                    }
                }
            }
        }
    }

    useEffect(() => {
        retrievePokemon();
    }, [])

    return (
        <div className="absolute z-[0] w-full h-full overflow-hidden flex items-center justify-center">
            {
                error ?
                    <Unavailable url={BASE_API_URL_POKEMON} /> :
                    (
                        !pokemons ?
                            <Loading /> :
                            (
                                pokemons.length === 0 ?
                                    <Empty /> :
                                    <Display pokemons={pokemons} />
                            )
                    )
            }
        </div>
    )
}

export default PokemonDatabase;