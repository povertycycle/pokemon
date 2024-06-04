import { Dispatch, memo, SetStateAction, useRef, useState } from "react";
import { CATEGORIES, ItemData, OrderType } from "./constants";
import { capitalize } from "@/common/utils/capitalize";
import styles from "@/common/styles/custom.module.scss";
import table from "@/common/styles/table.module.scss";
import Details from "./Details";
import Searchbar from "./navigation/Searchbar";
import HeadFilter from "./navigation/HeadFilter";

type DisplayProps = {
    items: ItemData[]
}

const Display: React.FC<DisplayProps> = ({ items }) => {
    const [item, setItem] = useState<ItemData | null>(null);

    return (
        <div className={`w-full h-full justify-between flex items-center bg-black`}>
            <Navigation items={items} item={item?.name ?? null} setItem={setItem} />
            <Details item={item} />
        </div>
    )
}

type NavigationProps = {
    items: ItemData[],
    item: string | null,
    setItem: Dispatch<SetStateAction<ItemData | null>>
}

const Navigation = memo(({ items, item, setItem }: NavigationProps) => {
    const ITEMLIST_ID = "NpXnFGjMuyVZCNtFK1JL7AdtfKlswnoo";

    const search = (value: string) => {
        let container = document.getElementById(ITEMLIST_ID);
        if (container) {
            container.childNodes.forEach((tr) => {
                let name = (tr.firstChild as HTMLTableCellElement)?.lastChild?.textContent?.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
                if (name && name.includes(value.toLowerCase())) {
                    (tr as HTMLTableRowElement).style.display = "";
                } else {
                    (tr as HTMLTableRowElement).style.display = "none";
                }
            })
        }
    }

    return (
        <div className="w-[80%] h-full pl-12 pr-4 pt-12 pb-4 flex flex-col bg-base-white">
            <div className="w-fit flex max-w-full border-2 border-black">
                <Searchbar search={search} />
            </div>
            <div className={`mt-2 h-full w-full overflow-y-scroll flex justify-end pr-4 ${styles.overflowPurple}`}>
                <table className="border-separate w-full h-fit">
                    <HeadFilter listId={ITEMLIST_ID} />
                    <tbody id={ITEMLIST_ID} className={`[&>*:nth-child(odd)]:bg-white [&>*:nth-child(even)]:bg-white/50 ${table.long_table_body}`}>
                        {
                            items.sort((a, b) => (a.name > b.name ? 1 : -1)).map((item: ItemData, i: number) => (
                                <tr key={i}>
                                    <td className="flex gap-4 items-center" style={{ paddingLeft: "8px", paddingRight: "16px" }}>
                                        <div className="w-[48px] h-[48px] flex items-center justify-center">
                                            {item?.sprites ? <img alt="" className="w-full h-full" src={item.sprites} /> : <i className="ri-question-mark text-[1.5rem]" />}
                                        </div>
                                        <span className="whitespace-nowrap">{item?.names?.find(i => i.language === "en")?.name ?? capitalize(item.name)}</span>
                                    </td>
                                    <td>{CATEGORIES[item.category].name}</td>
                                    <td style={{ whiteSpace: "nowrap" }}>{CATEGORIES[item.category].pocket}</td>
                                    <td style={{ lineHeight: "18px" }}>{item.flavor_text ?? "- - -"}</td>
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