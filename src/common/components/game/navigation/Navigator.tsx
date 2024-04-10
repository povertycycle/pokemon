
export enum Tab {
    Pokemon = "Pokemon",
    Evolution = "Evolution",
    Encounters = "Encounters",
    Machines = "Machines",
    Moves = "Moves",
    Items = "Items",
    Berries = "Berries",
    Locations = "Locations",
    Games = "Games",
}

const Navigator: React.FC = () => {
    return (
        <div>

            Berries
            Encounters
            Evolution
            Games
            Items
            Locations
            Machines
            Moves
            Pokemon
        </div>
    )
}

export default Navigator;