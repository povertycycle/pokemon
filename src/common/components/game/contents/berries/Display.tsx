import FetchScroller from "@/common/components/_utils/data-load/FetchScroller"
import { BerryData } from "@/common/interfaces/berry"
import { RefObject, useEffect, useRef, useState } from "react"
import { DatabaseDisplayProps } from "../databases/_utils"
import Berry from "./Berry"
import Filter from "./Filter"
import { resetScroll } from "@/common/utils/dom"

type DisplayProps = {
    berries: BerryData[]
} & DatabaseDisplayProps;

const Display: React.FC<DisplayProps> = ({ berries, back }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeList, setActiveList] = useState<BerryData[]>(berries);
    const filterRef = useRef<{
        name: string;
    }>({ name: "" });

    const doFilter = () => {
        const nameFilter = filterRef.current.name.toLowerCase();
        if (!!!nameFilter) {
            setActiveList(berries);
        } else {
            setActiveList(berries.filter(p => (
                p.name.toLowerCase().includes(nameFilter))
            ))
        }
    }

    function filterByName(value: string) {
        filterRef.current.name = value;
        doFilter();
        resetScroll(scrollRef.current);
    }


    return (
        <div className="w-full h-full flex flex-col">
            <Filter back={back} filterByName={filterByName} />
            <BerryList ref={scrollRef} list={activeList} />
        </div>
    )
}

const BerryList: React.FC<{ list: BerryData[]; ref: RefObject<HTMLDivElement> }> = ({ list, ref }) => {
    const MAX_DISPLAY = useRef<number>(0);
    const [display, setDisplay] = useState<BerryData[]>([]);

    useEffect(() => {
        if (window.innerWidth < 640) {
            MAX_DISPLAY.current = 12;
        } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
            MAX_DISPLAY.current = 16;
        } else {
            MAX_DISPLAY.current = 20;
        }
    }, []);

    useEffect(() => {
        setDisplay(list.slice(0, MAX_DISPLAY.current));
    }, [list])

    function fetchNext() {
        setDisplay(prev => prev.concat(list.slice(prev.length, prev.length + MAX_DISPLAY.current)));
    }

    return (
        <FetchScroller ref={ref} hasNext={display.length < list.length} fetchNext={fetchNext} type="berries">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4 sm:p-4">
                {
                    display.map(berry => (
                        <Berry berry={berry} key={berry.name} />
                    ))
                }
            </div>
        </FetchScroller>
    )
}

export default Display;