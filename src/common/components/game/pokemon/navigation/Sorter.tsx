import { useEffect, useRef, useState } from "react";
import { OPTIONS, Option, OptionTag } from "../constants";


const Sorter: React.FC<{ sort: (option: OptionTag) => void }> = ({ sort }) => {
    const [options, setOptions] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const handleOffClick = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setOptions(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOffClick);
        return () => { document.removeEventListener('mousedown', handleOffClick) }
    }, []);

    const toggle = () => {
        setOptions(prev => !prev);
    }

    return (
        <div ref={containerRef} className="cursor-pointer shrink-0 aspect-square h-full text-[1.125rem] flex justify-end relative" onClick={toggle}>
            <div className="aspect-square h-full flex items-center justify-center transition-colors hover:bg-black/25 bg-base-white-soft rounded-full">
                <i className="ri-sort-desc" />
            </div>
            <div className={`text-base absolute right-0 top-full mt-2 transition-height flex flex-col bg-base-white overflow-hidden whitespace-nowrap rounded-[4px] shadow-[0_0_4px_black]`} style={{ height: options ? `${OPTIONS.length * 24}px` : 0 }}>
                {
                    OPTIONS.map((option: Option, i: number) => (
                        <div key={i} className="h-[24px] px-4 hover:bg-black/15 transition-colors">
                            {option.name}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Sorter;