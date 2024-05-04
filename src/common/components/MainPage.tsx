import { useState } from "react";
import "remixicon/fonts/remixicon.css";
import AskCache from "./home/cache/AskCache";
import VisitPage from "./home/VisitPage";
import { PageContext } from "./context";
import GameDatabase from "./game/GameDatabase";
import PageSelector from "./home/PageSelector";
import TCGDatabase from "./tcg/TCGDatabase";
import { PageState } from "./constants";

const MainPage: React.FC = () => {
    const [section, setSection] = useState<PageState>(PageState.Main);

    return (
        <div className="w-screen h-screen flex flex-col overflow-hidden font-default">
            <PageContext.Provider value={{ section, setSection }}>
                <div className={`w-full h-full relative ${section === PageState.Main ? "z-[0]" : "z-[1]"}`}>
                    {
                        (() => {
                            switch (section) {
                                case PageState.Database:
                                    return <GameDatabase />
                                case PageState.TCG:
                                    return <TCGDatabase />
                                case PageState.Main:
                                default:
                                    return;
                            }
                        })()
                    }
                </div>
                <PageSelector section={section} setSection={setSection} />
                <VisitPage inside={section !== PageState.Main} />
                <AskCache />
            </PageContext.Provider>
        </div>
    )
}

export default MainPage;