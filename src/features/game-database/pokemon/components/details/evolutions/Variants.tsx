import { Spinner } from "@/components/loaders/Spinner";
import { GAME_DATABASE } from "@/constants/routes";
import { PaletteContext } from "@/stores/contexts";
import { useInView } from "@/utils/hooks";
import Link from "next/link";
import { useContext, useState } from "react";
import { getPokemonData } from "../../../database/pokemon";
import { usePalette } from "../../../hooks/usePalette";
import { PokemonBase } from "../../../interfaces/pokemon";
import { getSprite } from "../../../utils/sprites";
import { getIdentifiers } from "../../../utils/strings";
import { PokeType } from "../../../../../../components/icons/PokeType";

type VariantsProps = {
    variants: number[];
    current: PokemonBase;
    description?: string | null;
    switchable: boolean | null;
};

/**
 * Variants display
 */
export const Variants: React.FC<VariantsProps> = ({
    variants,
    current,
    description,
    switchable,
}) => {
    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-5">
                {variants.map((id) => (
                    <Variant
                        key={id}
                        id={id}
                        defaultData={id === current.id ? current : undefined}
                    />
                ))}
            </div>
            {/* <span className="px-4 py-2 underline max-sm:text-[0.875rem]">{variants.length > 1 ? (switchable ? "Able to switch in between form(s)" : "Form(s) are not switchable") : "Has no other forms"}</span>
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
            } */}
        </div>
    );
};

/**
 * Variant data fetcher
 */
const Variant: React.FC<{ id: number; defaultData?: PokemonBase }> = ({
    id,
    defaultData,
}) => {
    const palette = useContext(PaletteContext);
    const [data, setData] = useState<PokemonBase | null | undefined>(
        defaultData
    );
    const ref = useInView({
        onIntoView: () => {
            if (data === undefined) {
                getPokemonData(id)
                    .then((res) => {
                        setData(res);
                    })
                    .catch((err) => {
                        setData(null);
                    });
            }
        },
    });

    return (
        <div
            ref={ref}
            className={`flex flex-col h-16 items-center justify-center relative overflow-hidden group`}
        >
            {!data ? (
                <Spinner />
            ) : (
                <Contents
                    data={data}
                    isCurrent={!!defaultData}
                    defaultPalette={
                        !!defaultData
                            ? [
                                  palette.light.background,
                                  palette.dark.background,
                              ]
                            : undefined
                    }
                />
            )}
        </div>
    );
};

/**
 * Variant data display
 */
const Contents: React.FC<{
    data: PokemonBase;
    isCurrent: boolean;
    defaultPalette?: string[];
}> = ({ data: { id, name, data }, isCurrent, defaultPalette }) => {
    const mainSprite = getSprite(data.sprites);
    const identifiers = getIdentifiers(name, data.species) || "base";
    const { palette } = usePalette(mainSprite, defaultPalette);

    return (
        <>
            {!isCurrent && (
                <Link
                    href={`${GAME_DATABASE}/pokemon/p?=${id}`}
                    className="w-full h-full absolute left-0 top-0 z-2"
                ></Link>
            )}
            <div
                className={`w-full h-full absolute top-0 left-0 z-0`}
                style={{
                    background: `linear-gradient(90deg,${palette?.[1]},${palette?.[0]})`,
                }}
            />
            <div className="w-full h-full absolute top-0 left-0 z-1 flex items-center justify-end bg-gradient-to-r from-black/35">
                {mainSprite && (
                    <img
                        className={`aspect-square w-24 object-cover ${
                            isCurrent
                                ? ""
                                : "sm:group-hover:scale-125 transition-transform"
                        }`}
                        src={mainSprite}
                        alt=""
                    />
                )}
            </div>
            <div
                className={`text-white h-full flex z-1 relative w-full flex-col justify-between`}
            >
                <div className="text-xxs sm:text-xs flex w-fit rounded-br-semi overflow-hidden">
                    {data.types.map((type) => (
                        <PokeType key={type} type={type} />
                    ))}
                </div>
                <div className="flex text-sm sm:text-base items-center px-2">
                    {identifiers.toUpperCase()}
                </div>
            </div>
            {!isCurrent && (
                <div className="top-0 right-1 absolute z-1 text-xl text-white">
                    <i className="ri-arrow-right-up-line" />
                </div>
            )}
        </>
    );
};
