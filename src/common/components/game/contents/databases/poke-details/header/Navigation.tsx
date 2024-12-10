import Input from "@/common/components/_utils/Input"
import Shortcuts from "@/common/components/_utils/Shortcuts"
import { usePalette } from "@/common/hooks/usePalette"
import { PokemonCard } from "@/common/interfaces/pokemon"
import { capitalize } from "@/common/utils/capitalize"
import { Tab } from "@/constants/enums"
import { TYPE_COLORS } from "@/constants/types"
import { getAllPokemons } from "@/database/pokemon-db"
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"

type NavigationProps = {
    palette?: string[];
}

const Navigation: React.FC<NavigationProps> = ({ palette }) => {
    return (
        <div className="fixed top-0 left-0 w-full flex z-[100] h-[48px] sm:h-[64px] max-sm:border-b-2 justify-between items-center p-2 sm:p-4" style={{ background: palette?.[0], borderColor: palette?.[1], }}>
            <SearchBar />
            <Shortcuts current={Tab.Pokemon} />
        </div>
    )
}

export default Navigation;

const SearchBar: React.FC = () => {
    const poolRef = useRef<PokemonCard[]>([]);
    const [data, setData] = useState<PokemonCard[]>([]);

    useEffect(() => {
        getAllPokemons().then(res => {
            poolRef.current = res?.sort((a, b) => (a.id - b.id)) ?? [];
        });
    }, [])

    const filterByName = (value: string) => {
        let _data: PokemonCard[] = [];
        if (poolRef.current) {
            for (let i = 0; (i < poolRef.current.length) && (_data.length < 5); i++) {
                if (poolRef.current[i].name.toLowerCase().includes(value.toLowerCase())) {
                    _data.push(poolRef.current[i]);
                }
            }
        };
        setData(_data);
    }

    return (
        <div className="flex flex-col relative h-full">
            <Input onChangeHandler={filterByName} placeholder="Find Pokemon..." />
            <div className="z-[0] max-sm:peer-has-[:focus]/input:block hidden fixed w-full h-full bg-black/65 top-0 left-0" />
            <div className={`peer-has-[:focus]/input:flex hidden flex-col absolute -left-2 sm:-left-4 top-full sm:top-[calc(100%+8px)] bg-base-white sm:min-w-[480px] max-sm:w-screen mt-2 gap-2 rounded-[6px] ${data.length > 0 ? "p-2" : ""}`}>
                {
                    data.map((dat, i) => (
                        <PokeMiniCard data={dat} key={dat.name} />
                    ))
                }
            </div>
        </div>
    )
}

const PokeMiniCard: React.FC<{ data: PokemonCard }> = ({ data }) => {
    const { palette } = usePalette(data.mainSprites.default);

    return (
        <div className="h-[80px] flex flex-col items-center justify-center relative overflow-hidden bg-black rounded-[4px]">
            {
                !!!palette ?
                    <div className="w-full h-[96px] flex items-center justify-center">
                        <Image className="w-[48px] sm:w-[64px] aspect-square" src={"/img/spinner.svg"} alt="" width={48} height={48} />
                    </div> :
                    <a href={`/pokemon/${data.id}`} className={`overflow-hidden w-full bg-black relative flex h-full`}>
                        <div className="w-full h-full absolute z-[0] left-0 top-0" style={{ background: `linear-gradient(90deg,${palette.at(1)}80,${palette.at(0)}80)` }} />
                        <div className="absolute left-0 top-0 w-full h-full flex items-center justify-end bg-gradient-to-r from-black/35 z-[1]">
                            <Image alt="" src={data.mainSprites.default} width={256} height={256} className="object-contain" />
                        </div>
                        <div className="w-full h-full relative z-[2] flex items-center max-sm:bg-black/25 sm:bg-black/50 sm:hover:bg-black/0">
                            <div className="h-full aspect-square shrink-0">
                                <Image alt="" src={data.mainSprites.icon} width={64} height={64} className="object-contain w-full h-full" />
                            </div>
                            <div className="h-full w-full flex flex-col text-white justify-end py-2">
                                <span className="text-[1rem] leading-3">#{`${data.index}`.padStart(4, "0")}</span>
                                <div className="flex text-[1.25rem] items-center">
                                    <span className="leading-6">{capitalize(data.species)}</span>
                                    <div className="flex ml-2 sm:ml-4 text-[0.75rem] leading-4 text-black gap-1 pt-[3px]">
                                        {
                                            data.name.replace(data.species, "").split("-").slice(1).map((id: string, i: number) => (
                                                <div className={`h-fit px-2 sm:px-4 flex items-center justify-center bg-base-white-soft rounded-[12px]`} key={i}>
                                                    {id.toUpperCase()}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="text-white absolute flex top-0 right-0 text-[0.75rem] rounded-bl-[4px] overflow-hidden max-w-full">
                                    {
                                        data.types.map((t: string, i: number) => (
                                            <div key={i} className={`w-[78px] flex items-center justify-center`} style={{ background: TYPE_COLORS[t] }}>
                                                <span className="drop-shadow-[0_0_2px_black]">{t.toUpperCase()}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </a>
            }
        </div>
    )
}





