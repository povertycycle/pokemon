import { useContext } from "react";
import { PageContext } from "./contexts";
import { PageState } from "./types";

const ReturnButton: React.FC = () => {
    const { setSection } = useContext(PageContext);

    const returnToMenu = () => {
        setSection(PageState.Main);
    }

    return (
        <div className="z-[2] absolute top-0 right-0 p-4 text-[1.25rem]">
            <div className="group/x cursor-pointer p-2 hover:w-[272px] w-[36px] h-[36px] transition-width duration-500 bg-base-white rounded-[4px] flex items-center justify-between relative overflow-hidden" onClick={returnToMenu}>
                <div className="flex items-center justify-center relative h-full bg-base-white aspect-square z-[1]"><i className="ri-shut-down-line" /></div>
                <div className="flex items-center justify-end group-hover/x:w-full w-0 h-full duration-500 whitespace-nowrap overflow-hidden transition-width">Return to Main menu</div>
            </div>
        </div>
    )
}

export default ReturnButton;