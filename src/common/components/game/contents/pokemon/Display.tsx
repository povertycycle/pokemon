import { useState } from "react";
import Expander from "./Expander";
import Details from "./details/Details";
import Navigation from "./navigation/Navigation";
import { Pokemon } from "./interfaces/pokemon";

type DisplayProps = {
    pokemons: Pokemon[]
}

const Display: React.FC<DisplayProps> = ({ pokemons }) => {
    const [pokemon, setPokemon] = useState<string | null>(null);

    return (
        <div className={`w-full h-full justify-between flex items-center`}>
            <Details pokemon={pokemon} />
            <Navigation pokemons={pokemons} pokemon={pokemon} setPokemon={setPokemon} />
            <Expander />
        </div>
    )
}

export default Display;