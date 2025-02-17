import { useEffect, useState } from "react";
import Empty from "../../../../_utils/Empty";
import Display from "./Display";
import styles from "@/common/styles/transitions.module.scss";
import Loading from "@/common/components/_utils/loading/Loading";
import { PokemonCard } from "@/common/interfaces/pokemon";
import { getAllPokemons } from "@/database/pokemon-db";
import { DatabaseDisplayProps } from "../_utils";

const PokemonDatabase: React.FC<DatabaseDisplayProps> = ({ back }) => {
    const [pokemons, setPokemons] = useState<PokemonCard[] | null>();

    useEffect(() => {
        getAllPokemons().then(res => {
            setPokemons(res?.sort((a, b) => {
                const d = a.index - b.index;
                return d === 0 ?
                    (a.name.localeCompare(b.name)) :
                    d
            }));
        });
    }, []);

    return (
        <div className={`relative w-full h-full overflow-hidden flex items-center justify-center top-0 ${styles.fadeIn}`}>
            {
                pokemons === undefined ?
                    <Loading /> :
                    (
                        pokemons === null || pokemons.length === 0 ?
                            <Empty /> :
                            <Display pokemons={pokemons} back={back} />
                    )
            }
        </div>
    )
}

export default PokemonDatabase;