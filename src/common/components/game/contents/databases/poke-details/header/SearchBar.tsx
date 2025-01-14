import Input from "@/common/components/_utils/Input";
import Spinner from "@/common/components/_utils/loading/Spinner";
import { TYPE_COLORS } from "@/common/constants/colors";
import { DESTINATION, NAME_QUERY, TAB_SELECTION } from "@/common/constants/main";
import { usePalette } from "@/common/hooks/usePalette";
import { PokemonCard } from "@/common/interfaces/pokemon";
import { capitalize } from "@/common/utils/string";
import { getAllPokemons } from "@/database/pokemon-db";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SearchBar: React.FC = () => {
    const pools = useRef<PokemonCard[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [data, setData] = useState<PokemonCard[] | null>(null);
    const ref = useRef<HTMLDivElement>(null);
    const valueRef = useRef<string>("");

    useEffect(() => {
        getAllPokemons().then(res => {
            pools.current = res?.sort((a, b) => (a.id - b.id)) ?? [];
        });
    }, []);

    const filterByName = (value: string) => {
        let _data: PokemonCard[] = [];
        let _hasMore = false;
        valueRef.current = value;
        if (!!value && pools.current) {
            for (let i = 0; (i < pools.current.length); i++) {
                if (pools.current[i].name.toLowerCase().replaceAll("-", "").includes(value.toLowerCase().replaceAll(" ", ""))) {
                    if (_data.length === 5) {
                        _hasMore = true;
                        break;
                    }
                    _data.push(pools.current[i]);
                }
            };
            setHasMore(_hasMore);
            setData(_data);
        } else {
            setData(null);
        }
    };

    function hide() {
        if (ref.current) ref.current.style.display = "none";
    }

    return (
        <div className="sm:py-4 sm:order-1 flex flex-col relative max-sm:h-[32px] sm:h-full max-sm:w-1/2 z-2 max-sm:grow sm:w-full">
            <Input onChangeHandler={filterByName} placeholder="Find Pokemon..." menu={{
                ref,
                show: () => { if (ref.current) ref.current.style.display = "flex"; },
                hide,
            }} />
            <div ref={ref} className="z-0 hidden absolute max-sm:w-[calc(100vw-16px)] top-full left-0">
                <div className="z-1 sm:hidden fixed left-0 top-0 bg-black/65 w-full h-full" onClick={hide} />
                <div className={`z-2 flex-col bg-base-white sm:w-[400px] rounded-[8px] max-sm:w-screen translate-y-2 sm:-translate-y-2 sm:shadow-xl overflow-hidden`}>
                    {
                        data?.map(dat => (
                            <PokeMiniCard data={dat} key={dat.name} />
                        ))
                    }
                    {
                        !!data && (hasMore || data.length === 0) &&
                        <div className="w-full sm:py-1 text-[1rem] sm:text-[1.125rem] flex items-center justify-center">
                            <Link className="hover:text-base-red-dark" target="_blank" href={`/?${DESTINATION}=database&${TAB_SELECTION}=pokemon&${NAME_QUERY}=${valueRef.current}`}>
                                {
                                    data.length === 0 ?
                                        "No Pokemon Found" :
                                        "See More"
                                }
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchBar;

export const PokeMiniCard: React.FC<{ data: PokemonCard }> = ({ data }) => {
    const { palette, localUrl } = usePalette(data.mainSprites.default);
    const identifiers = data.name?.replace(data.species, "").replaceAll("-", " ");

    return (
        <div className="h-[80px] flex flex-col items-center justify-center relative overflow-hidden">
            {
                !!!palette ?
                    <div className="w-full h-[96px] flex items-center justify-center">
                        <Spinner />
                    </div> :
                    <Link target="_blank" href={`/pokemon?id=${data.id}`} className={`border-b border-black overflow-hidden h-full w-full bg-black relative`}>
                        <div className="w-full h-full absolute top-0 left-0 z-0" style={{ background: `linear-gradient(90deg,${palette.at(1)}80,${palette.at(0)}80)` }} />
                        <div className="w-full h-full absolute top-0 left-0 z-1 flex items-center justify-end bg-gradient-to-r from-black/35">
                            {
                                palette ?
                                    <Image className="aspect-square w-[128px] object-cover" src={localUrl} alt="" width={128} height={128} /> :
                                    <Spinner />
                            }
                        </div>
                        <div className={`text-white h-full flex z-2 relative w-full sm:hover:bg-black/0 bg-black/25 cursor-pointer`}>
                            <div className="h-full aspect-square shrink-0">
                                {
                                    !!data.mainSprites.icon && <Image alt="" src={data.mainSprites.icon} width={64} height={64} className="object-contain w-full h-full" />
                                }
                            </div>
                            <div className="w-full h-full flex flex-col justify-end py-[6px] relative">
                                <div className="absolute flex top-0 left-0 leading-[18px] text-[0.75rem] rounded-b-[4px] overflow-hidden max-w-full">
                                    {
                                        data.types.map((t: string, i: number) => (
                                            <div key={i} className={`w-[78px] flex items-center justify-center`} style={{ background: TYPE_COLORS[t] }}>
                                                <span className="drop-shadow-[0_0_2px_black]">{t.toUpperCase()}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                                <span className="text-[1rem] leading-3">#{`${data.index}`.padStart(4, "0")}</span>
                                <div className="flex text-[1.25rem] items-center">
                                    <span className="leading-6">{capitalize(data.species)}</span>
                                    {
                                        !!identifiers && <div className={`h-fit px-2 text-[0.75rem] leading-4 text-black ml-2 flex items-center justify-center bg-base-white-soft rounded-[12px]`}>
                                            {identifiers.toUpperCase()}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </Link>
            }
        </div>
    )
}





