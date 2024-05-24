import { useEffect, useState } from "react";
import { getAllPokemons } from "../../database/pokemonDB";
import Empty from "../../utils/Empty";
import Loading from "../../utils/Loading";
import Display from "./Display";
import { Pokemon } from "./interfaces/pokemon";

const PokemonDatabase: React.FC = () => {
    const [pokemons, setPokemons] = useState<Pokemon[] | null | undefined>();

    useEffect(() => {
        getAllPokemons().then(res => {
            setPokemons(res?.sort((a, b) => (a.name > b.name ? 1 : (a.name < b.name ? -1 : 0))));
        });
    }, [])

    return (
        <div className="absolute z-[0] w-full h-full overflow-hidden flex items-center justify-center top-0">
            {
                pokemons === undefined ?
                    <Loading /> :
                    (
                        pokemons === null || pokemons.length === 0 ?
                            <Empty /> :
                            <Display pokemons={pokemons} />
                    )
            }
        </div>
    )
}

export default PokemonDatabase;