import { GAME_DATABASE } from "@/constants/routes";
import { getPokemonNameById } from "@/requests/pokemon";
import Link from "next/link";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";

const CONTAINER = "gFO2YJxGK2tO7DG4MzGguRkwQWBcijYr";

interface PokeIconListProps {
    list: number[];
}

export const PokeIconList: React.FC<PokeIconListProps> = ({ list }) => {
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        const container = document.getElementById(CONTAINER);

        if (container) {
            const childNodes = container.children;
            [...childNodes].forEach((child) => {
                const name = child.getAttribute("data-name");
                let display = "";
                if (!name?.includes(search)) {
                    display = "none";
                }
                (child as HTMLElement).style.display = display;
            });
        }
    }, [search]);

    const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const clearInput = () => {
        setSearch("");
    };

    return (
        <>
            <div className="peer/input w-full h-full relative bg-white flex items-center z-1 my-2">
                <div className="absolute text-lg left-2 sm:left-3 text-gray-400">
                    <i className="ri-search-line font-medium" />
                </div>
                <input
                    className="focus:outline-none pl-8 sm:pl-10 relative bg-transparent z-1 h-full w-full text-sm placeholder:text-sm"
                    value={search}
                    onChange={changeInput}
                    placeholder={"Search Pokemon..."}
                />
                {search && (
                    <div
                        onClick={clearInput}
                        className="flex items-center justify-center rounded-full bg-black text-white cursor-pointer hover:scale-105 absolute z-1 text-lg h-5 w-5 right-2"
                    >
                        <i className="ri-close-line" />
                    </div>
                )}
            </div>
            <div
                id={CONTAINER}
                className={`grid max-sm:grid-cols-6 sm:max-md:grid-cols-12 md:grid-cols-6 xl:grid-cols-8 text-xs sm:text-sm gap-2 my-2`}
            >
                {list.map((id) => (
                    <PokeIcon key={id} id={id} />
                ))}
            </div>
        </>
    );
};

/**
 * Pokemon Icon
 */
const PokeIcon: React.FC<{ id: number }> = ({ id }) => {
    const [name, setName] = useState<string>();

    useEffect(() => {
        getPokemonNameById(id)
            .then((res) => {
                setName(res);
            })
            .catch((err) => {
                setName("missing-pokemon-name");
            });
    }, [id]);

    return (
        <Link
            href={`${GAME_DATABASE}/pokemon/p?id=${id}`}
            data-id={id}
            data-name={name ?? ""}
            className="w-full flex aspect-square bg-base-white/50 sm:hover:bg-base-white rounded-md"
        >
            {name && (
                <img
                    className="m-auto"
                    title={name
                        .replaceAll("-", " ")
                        .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                    alt=""
                    width={48}
                    height={48}
                />
            )}
        </Link>
    );
};
