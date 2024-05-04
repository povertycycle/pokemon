import { useContext } from "react";
import { PageContext } from "./context";
import { PageState } from "./constants";

const Return: React.FC = () => {
    const { setSection } = useContext(PageContext);

    const returnToMenu = () => {
        setSection(PageState.Main);
    }

    return (
        <div className="z-[2] mr-4 mt-[12px] absolute top-0 right-0 group/x cursor-pointer p-2 hover:w-[226px] w-[32px] h-[32px] shadow-[2px_2px_4px_black] transition-width duration-500 bg-base-white rounded-[4px] flex items-center justify-between overflow-hidden" onClick={returnToMenu}>
            <div className="flex items-center justify-center relative h-full bg-base-white aspect-square z-[1]"><i className="ri-shut-down-line" /></div>
            <div className="flex items-center justify-end group-hover/x:w-full w-0 h-full duration-500 whitespace-nowrap overflow-hidden transition-width">Return to Main menu</div>
        </div>
    )
}

export default Return;