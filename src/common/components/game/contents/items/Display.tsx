import { Dispatch, SetStateAction, useState } from "react";
import { Item } from "./constants";

type DisplayProps = {
    items: Item[]
}

const Display: React.FC<DisplayProps> = ({ items }) => {
    const [itemId, setItemId] = useState<string | null>(null);

    return (
        <div className={`w-full h-full justify-between flex items-center`}>
            {/* <Details pokeId={pokeId} />
            <Navigation pokemons={pokemons} pokeId={pokeId} setPokeId={setPokeId} />
            <Expander /> */}
            <Navigation items={items} itemId={itemId} setItemId={setItemId} />
        </div>
    )
}

type NavigationProps = {
    items: Item[],
    itemId: string | null,
    setItemId: Dispatch<SetStateAction<string | null>>
}

const Navigation: React.FC<NavigationProps> = ({ items, itemId, setItemId }) => {
    return (
        <div className="h-full overflow-y-scroll">
            {
                items.map((item: Item, i: number) => (
                    <div key={i}>
                        {
                            item.name
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default Display;