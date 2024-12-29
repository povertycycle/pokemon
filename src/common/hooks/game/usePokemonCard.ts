import { PokemonCard } from "@/common/interfaces/pokemon";
import { getPokemonCard } from "@/database/pokemon-db";
import { useEffect, useState } from "react";

export const usePokemonCard = (id: string) => {
    const [data, setData] = useState<PokemonCard | null>();

    useEffect(() => {
        if (!!id) {
            getPokemonCard(id).then(res => {
                setData(res);
            })
        }
    }, [])

    return data;
}