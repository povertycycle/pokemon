import DebouncedSearchPokemon from "./DebouncedSearchPokemon";

const Navigation: React.FC = () => {
    return (
        <div className="w-full h-[72px] bg-base-red-dark/50 flex items-center justify-center">
            <DebouncedSearchPokemon />
        </div>
    )
}

export default Navigation;