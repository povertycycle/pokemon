import { Pokemon } from "../interface"
import Details from "./Details"
import Navigation from "./navigation/Navigation"

type DisplayProps = {
    pokemons: Pokemon[]
}

const Display: React.FC<DisplayProps> = ({ pokemons }) => {
    return (
        <div className="w-full h-full justify-between flex items-center">
            <Details />
            <Navigation pokemons={pokemons} />
        </div>
    )
}

export default Display;