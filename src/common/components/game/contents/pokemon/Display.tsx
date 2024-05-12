import { useState } from "react";
import Expander from "./Expander";
import { DisplayContext } from "./context";
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
            <DisplayContext.Provider value={{ pokemon, setPokemon }}>
                <Details pokemon={pokemon} />
                <Navigation pokemons={pokemons} />
            </DisplayContext.Provider>
            <Expander />
        </div>
    )
}

export default Display;