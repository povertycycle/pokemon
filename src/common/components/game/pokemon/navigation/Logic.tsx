import { useState } from "react";

type LogicProps = {
    toggle: (logic: boolean) => void,
    isDark: boolean
}

const Logic: React.FC<LogicProps> = ({ toggle, isDark }) => {
    const [or, setOr] = useState<boolean>(false);

    const setLogic = () => {
        setOr(prev => {
            toggle(!prev);
            return !prev;
        })
    }

    return (
        <div className={`h-full w-[56px] border-x-2 text-base shrink-0 flex items-center justify-center tracking-[1px] transition-colors hover:bg-black/25 ${isDark ? "text-white" : "text-black hover:text-white"} bg-transparent cursor-pointer`} onClick={setLogic}>
            <span>{or ? "OR" : "AND"}</span>
        </div>
    )
}

export default Logic;