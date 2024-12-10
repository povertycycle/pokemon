import { Dispatch, memo, SetStateAction, useRef, useState } from "react";
import { CATEGORIES, ItemData, OrderType } from "./constants";
import { capitalize } from "@/common/utils/capitalize";
import styles from "@/common/styles/custom.module.scss";
import table from "@/common/styles/table.module.scss";
import Details from "./details/Details";
import HeadFilter from "./navigation/HeadFilter";
import Image from "next/image";
import GenFilter from "../_utils/GenFilter";
import { standardize } from "@/common/utils/normalize";

type DisplayProps = {
    items: ItemData[]
}

const Display: React.FC<DisplayProps> = ({ items }) => {
    const [item, setItem] = useState<ItemData | null>(null);

    return (
        <div className={`w-full h-full justify-between flex items-center bg-black`}>
            <Navigation items={items} setItem={setItem} />
            <Details item={item} />
        </div>
    )
}

type NavigationProps = {
    items: ItemData[],
    setItem: Dispatch<SetStateAction<ItemData | null>>
}

const Navigation = memo(({ items, setItem }: NavigationProps) => {
    const ITEMLIST_ID = "NpXnFGjMuyVZCNtFK1JL7AdtfKlswnoo";
    const filterRef = useRef<{ n: string | null, g: string | null, c: string | null, p: string | null }>({ n: null, g: null, c: null, p: null });

    function doFilter() {
        let container = document.getElementById(ITEMLIST_ID);
        if (container) {
            container.childNodes.forEach((tr) => {
                let disp = "";
                if (filterRef.current.n && !standardize(tr.childNodes?.[0]?.lastChild?.textContent?.toLowerCase())?.includes(filterRef.current.n.toLowerCase())) {
                    disp = "none";
                } else if (filterRef.current.g && !!!(tr as HTMLTableRowElement).getAttribute("data-gen")?.split(";").find(g => g === filterRef.current.g)) {
                    disp = "none";
                } else if (filterRef.current.c && (tr as HTMLTableRowElement).getAttribute("data-category") !== filterRef.current.c) {
                    disp = "none";
                } else if (filterRef.current.p && (tr as HTMLTableRowElement).getAttribute("data-pocket") !== filterRef.current.p) {
                    disp = "none";
                }
                (tr as HTMLTableRowElement).style.display = disp;
            })
        }
    }

    const search = (value: string) => {
        filterRef.current.n = value ?? null;
        doFilter();
    }

    const filterGen = (value: string | null) => {
        filterRef.current.g = value ?? null;
        doFilter();
    }

    const filterCategory = (value: string | null) => {
        filterRef.current.c = value ?? null;
        doFilter();
    }

    const filterPocket = (value: string | null) => {
        filterRef.current.p = value ?? null;
        doFilter();
    }

    return (
        <div className="w-[80%] h-full pl-12 pr-4 pt-12 pb-4 flex flex-col bg-base-white">
            <div className="w-full flex justify-between z-[2] pr-[28px]">
                {/* <Searchbar search={search} /> */}
                <GenFilter filter={filterGen} />
            </div>
            <div className={`mt-2 h-full w-full overflow-y-scroll flex justify-end pr-4 ${styles.overflowPurple}`}>
                <table className="border-separate w-full h-fit">
                    <HeadFilter listId={ITEMLIST_ID} filterCategory={filterCategory} filterPocket={filterPocket} />
                    <tbody id={ITEMLIST_ID} className={`z-[0] [&>tr]:bg-white/75 ${table.long_table_body}`}>
                        {
                            items.sort((a, b) => (a.name > b.name ? 1 : -1)).map((data: ItemData, i: number) => (
                                <tr key={i} data-gen={data?.games?.map(g => g.split("-").map(s => s.charAt(0)).join("")).join(";") ?? ""}
                                    data-category={data.category} data-pocket={CATEGORIES[data.category].pocket.toLowerCase().replaceAll(" ", "-")}
                                    className="hover:bg-base-white-dark/25 transition-transform cursor-pointer hover:translate-x-[8px]"
                                    onClick={() => { setItem(prev => prev?.name === data?.name ? prev : data) }}>
                                    <td className="cursor-pointer flex gap-4 items-center" style={{ paddingLeft: "8px", paddingRight: "16px" }}>
                                        <div className="w-[48px] h-[48px] flex items-center justify-center">
                                            {data?.sprites ? <Image width={48} height={48} loading="lazy" alt="" className="w-full h-full" src={data.sprites} /> : <i className="ri-question-mark text-[1.5rem]" />}
                                        </div>
                                        <span className="whitespace-nowrap">{data?.names?.find(i => i.language === "en")?.name ?? capitalize(data.name)}</span>
                                    </td>
                                    <td className="whitespace-nowrap">{CATEGORIES[data.category].name}</td>
                                    <td style={{ whiteSpace: "nowrap" }}>{CATEGORIES[data.category].pocket}</td>
                                    <td style={{ lineHeight: "18px" }}>{data.flavor_text ?? "- - -"}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
})

export default Display;