import { useEffect, useRef, useState } from "react";

type Option = {
    name: string
}

const Sorter: React.FC = () => {
    const OPTIONS: Option[] = [
        { name: "Name (Ascending)" },
        { name: "Name (Descending)" }
    ]
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
        <div ref={containerRef} className="shrink-0 aspect-square cursor-pointer hover:shadow-[0_0_4px_black] transition-[box-shadow] h-full text-[1.5rem] leading-[1.5rem] flex text-base-red-dark border-2 border-base-red-dark rounded-[4px] relative" onClick={toggle}>
            <div className="aspect-square h-full flex items-center justify-center">
                <i className="ri-sort-desc" />
            </div>
            <div className={`text-base absolute right-0 top-full mt-2 transition-height flex flex-col bg-base-white overflow-hidden whitespace-nowrap rounded-[4px] shadow-[0_0_4px_black]`} style={{ height: options ? `${OPTIONS.length * 24}px` : 0 }}>
                {
                    OPTIONS.map((option: Option, i: number) => (
                        <div key={i} className="h-[24px] px-4">
                            {option.name}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Sorter;