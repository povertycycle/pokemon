import Spinner from "@/common/components/_utils/loading/Spinner";
import { TYPE_COLORS } from "@/common/constants/colors";
import { SENTENCES_REGEX } from "@/common/constants/regex";
import { useInView } from "@/common/hooks/useInView";
import { usePalette } from "@/common/hooks/usePalette";
import { PokemonCard } from "@/common/interfaces/pokemon";
import { getPokemonCard } from "@/database/pokemon-db";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { PaletteContext } from "../_utils";

type FormsProps = {
    variants: string[];
    current: PokemonCard;
    description?: string | null;
    switchable: boolean | null;
}

const Forms: React.FC<FormsProps> = ({ variants, current, description, switchable }) => {
    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-5">
                {
                    variants.map(variantId => (
                        <Form key={variantId} id={variantId} current={String(current.id) === variantId ? current : undefined} />
                    ))
                }
            </div>
            <span className="px-4 py-2 underline max-sm:text-[0.875rem]">{variants.length > 1 ? (switchable ? "Able to switch in between form(s)" : "Form(s) are not switchable") : "Has no other forms"}</span>
            {
                description &&
                <ul className="list-disc w-full pl-7 sm:pl-8 pr-4 text-[0.875rem] sm:text-[1rem]">
                    {
                        description?.match(SENTENCES_REGEX)?.map((t, i) => (
                            <li key={i}>
                                {t}
                            </li>
                        ))
                    }
                </ul>
            }
        </div>
    )
}

export default Forms;

const Form: React.FC<{ id: string; current?: PokemonCard }> = ({ id, current }) => {
    const { palette } = useContext(PaletteContext);
    const [data, setData] = useState<PokemonCard | null | undefined>(current);
    const { ref } = useInView({
        onIntoView: () => {
            if (data === undefined) {
                getPokemonCard(id).then(res => {
                    setData(res);
                }).catch(err => {
                    console.error(err);
                    setData(null);
                })
            }
        },
    })

    return (
        <div ref={ref} className={`flex flex-col h-[72px] items-center justify-center relative overflow-hidden group max-sm:first:border-t max-sm:border-b`} style={{ borderColor: palette[1] }}>
            {
                !!!data ?
                    <div className="w-full h-[96px] flex items-center justify-center py-1">
                        <Spinner />
                    </div> :
                    (
                        !!current ?
                            <Contents data={data} isCurrent={!!current} defaultPalette={palette} /> :
                            <Link className="w-full h-full" target="_blank" href={`/pokemon?id=${data.id}`}>
                                <Contents data={data} isCurrent={!!current} />
                            </Link>
                    )
            }
        </div>
    )
}

const Contents: React.FC<{ data: PokemonCard; isCurrent: boolean; defaultPalette?: string[]; }> = ({ data, isCurrent, defaultPalette }) => {
    const identifiers = data?.name.replace(data?.species, "").replaceAll("-", " ") || "base";
    const { palette } = usePalette(data.mainSprites.default, defaultPalette);

    return (
        <>
            <div className="w-full h-full absolute top-0 left-0 z-0" style={{ background: `linear-gradient(90deg,${palette?.[1]},${palette?.[0]})` }} />
            <div className="w-full h-full absolute top-0 left-0 z-1 flex items-center justify-end bg-gradient-to-r from-black/35">
                <Image className={`aspect-square w-[128px] object-cover ${isCurrent ? "" : "sm:group-hover:scale-125"}`} src={data.mainSprites.default} alt="" width={128} height={128} />
            </div>
            <div className={`text-white h-full flex z-1 relative w-full flex-col justify-between`}>
                <div className="flex leading-5 text-[0.75rem] overflow-hidden w-fit rounded-b-[4px]">
                    {
                        data.types.map((t: string, i: number) => (
                            <div key={i} className={`w-[78px] flex items-center justify-center`} style={{ background: TYPE_COLORS[t] }}>
                                <span className="drop-shadow-[0_0_1px_black] sm:drop-shadow-[0_0_2px_black]">{t.toUpperCase()}</span>
                            </div>
                        ))
                    }
                </div>
                <div className="flex text-[1.125rem] sm:text-[1.25rem] items-center leading-6 py-1 px-2">
                    {identifiers.toUpperCase()}
                </div>
            </div>
            {
                !isCurrent && <div className="top-1 right-1 absolute z-1 text-[1.5rem] leading-5">
                    <i className="ri-arrow-right-up-line" />
                </div>
            }
        </>
    )
}