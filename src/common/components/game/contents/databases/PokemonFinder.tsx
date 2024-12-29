import Loading from "@/common/components/_utils/loading/Loading";
import { GITHUB } from "@/common/constants/constants";
import { DESTINATION, TAB_SELECTION } from "@/common/constants/main";
import { PokemonData } from "@/common/interfaces/pokemon";
import { getPokemonData } from "@/database/pokemon-db";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import Pokemon from "./poke-details/Pokemon";

type PokemonFinderProps = {
}

const PokemonFinder: React.FC<PokemonFinderProps> = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams?.get("id")
    const [data, setData] = useState<PokemonData | null>();

    useEffect(() => {
        if (!!id) {
            getPokemonData(`${id}`).then(res => {
                setData(res);
            }).catch(err => {
                setData(null);
            });
        } else {
            router.push(`/?${DESTINATION}=database&${TAB_SELECTION}=pokemon`)
        }
    }, [id])

    return (
        <div className="w-screen h-dvh sm:h-screen max-h-dvh sm:max-h-screen overflow-y-scroll flex flex-col font-default bg-black">
            {
                data === undefined ?
                    <Loading /> :
                    (
                        data === null ?
                            <DataNotFound /> :
                            <Pokemon data={data} />
                    )
            }
        </div>
    )
}

export default PokemonFinder;

const DataNotFound: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-black text-white">
            <span className="text-[]">Pokemon data corrupted!</span>
            <span>Please contact the developer <Link href={GITHUB} target="_blank" className="">here</Link>.</span>
        </div>
    )
}