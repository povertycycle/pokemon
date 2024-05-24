import { useState } from "react";
import Expander from "./Expander";
import Details from "./details/Details";
import Navigation from "./navigation/Navigation";
import { Pokemon } from "./interfaces/pokemon";

type DisplayProps = {
    pokemons: Pokemon[]
}

const Display: React.FC<DisplayProps> = ({ pokemons }) => {
    const [pokeId, setPokeId] = useState<string | null>(null);

    return (
        <div className={`w-full h-full justify-between flex items-center`}>
            <Details pokeId={pokeId} />
            <Navigation pokemons={pokemons} pokeId={pokeId} setPokeId={setPokeId} />
            <Expander />
        </div>
    )
}

export default Display;