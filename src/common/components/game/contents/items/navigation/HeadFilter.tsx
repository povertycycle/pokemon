import table from "@/common/styles/table.module.scss";
import { useState } from "react";
import { OrderType } from "../constants";
import HeadCellFilter from "./HeadCellFilter";

type HeadFilterProps = {
    listId: string,
}

const COMPARATOR: { [key: string]: (a: Element, b: Element) => number } = {
    "name-1": (a: Element, b: Element) => ((a.firstChild?.lastChild?.textContent || "") > (b.firstChild?.lastChild?.textContent || "") ? -1 : 1),
    "name-2": (a: Element, b: Element) => ((a.firstChild?.lastChild?.textContent || "") > (b.firstChild?.lastChild?.textContent || "") ? 1 : -1),
}

const HeadFilter: React.FC<HeadFilterProps> = ({ listId }) => {
    const [nameOrder, setNameOrder] = useState<OrderType>(OrderType.ASC);

    const doSortName = () => {
        setNameOrder(prev => {
            let newValue;
            let container = document.getElementById(listId);
            if (prev === OrderType.ASC) {
                newValue = OrderType.DESC;
            } else {
                newValue = OrderType.ASC;
            }
            if (container) {
                [...container.children]
                    .sort(COMPARATOR[`name-${nameOrder}`])
                    .forEach(node => container.appendChild(node));
            }
            return newValue;
        })
    }

    return (
        <thead>
            <tr className={`text-[1.25rem] sticky top-[2px] text-x-dark ${table.long_table_header}`}>
                <th className="relative">Item <i onClick={doSortName} className={`hover:text-base-white-dark absolute top-[50%] translate-y-[-50%] right-[8px] ${nameOrder === OrderType.ASC ? "ri-sort-alphabet-asc" : "ri-sort-alphabet-desc"} cursor-pointer text-[1.5rem] leading-4`} /></th>
                <HeadCellFilter listId={listId} id={"0wkoObmmUOV072uUwgkOwztHoeSxTsab"} type="category" />
                <HeadCellFilter listId={listId} id={"2KOzingyH1lbYVZUEN3dDZgZBe8jn9EM"} type="pocket" />
                <th>Description</th>
            </tr>
        </thead>
    )
}

export default HeadFilter;