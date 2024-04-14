import { useState } from "react";

const Logic: React.FC<{ logic: boolean, toggleLogic: (logic: boolean) => void }> = ({ logic, toggleLogic }) => {
    const [or, setOr] = useState<boolean>(logic);

    const setLogic = () => {
        setOr(prev => {
            toggleLogic(!prev);
            return !prev;
        })
    }

    return (
        <div className="h-full px-1 flex items-center justify-center cursor-pointer" onClick={setLogic}>
            <span className="w-[24px]">{or ? "OR" : "AND"}</span>
        </div>
    )
}

export default Logic;