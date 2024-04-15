import { BASE_API_URL_POKEMON } from "../constants";
import { Pokemon } from "../interface"
import Details from "./Details"
import Expander from "./Expander"
import { DisplayContext } from "./contexts"
import Navigation from "./navigation/Navigation";
import { useState, useEffect, useRef } from "react";

type DisplayProps = {
    pokemons: Pokemon[]
}

const Display: React.FC<DisplayProps> = ({ pokemons }) => {
    const [pokemon, setPokemon] = useState<string | null>(null);
    // const localCacheRef = useRef

    // useEffect(() => {
    // fetch(`${BASE_API_URL_POKEMON}/${pokemon}`).then(res => {

    // })
    // }, [pokemon]);

    return (
        <div className="w-full h-full justify-between flex items-center">
            <DisplayContext.Provider value={{ pokemon, setPokemon }}>
                <Details />
                <Navigation pokemons={pokemons} />
            </DisplayContext.Provider>
            <Expander />
        </div>
    )
}

export default Display;