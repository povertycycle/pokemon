import { useState } from "react";
import "remixicon/fonts/remixicon.css";
import AskCache from "./home/cache/AskCache";
import VisitPage from "./home/VisitPage";
import PageSelector from "./home/PageSelector";
import TCGDatabase from "./tcg/TCGDatabase";
import { DESTINATION, DESTINATION_STATES, PageState, TAB_SELECTION } from "../constants/main";
import { useSearchParams } from "next/navigation";
import DatabaseDisplay from "./game/DatabaseDisplay";

const MainPage: React.FC = () => {
    const searchParams = useSearchParams();
    const pageState = searchParams?.get(DESTINATION) ?? "";
    const tabState = searchParams?.get(TAB_SELECTION);
    const [section, setSection] = useState<PageState>(DESTINATION_STATES[pageState] ?? PageState.Main);

    const returnToMain = () => {
        setSection(PageState.Main);
    }

    return (
        <div className="w-screen h-dvh sm:h-screen flex flex-col overflow-hidden font-default">
            <div className={`w-full h-full relative ${section === PageState.Main ? "z-0" : "z-1"}`}>
                {
                    (() => {
                        switch (section) {
                            case PageState.Database:
                                return <DatabaseDisplay returnToMain={returnToMain} tabState={tabState} />
                            case PageState.TCG:
                                return <TCGDatabase returnToMain={returnToMain} />
                            case PageState.Main:
                            default:
                                return;
                        }
                    })()
                }
            </div>
            <PageSelector shouldAnimate={!!!pageState} section={section} setSection={setSection} />
            {section === PageState.Main && <VisitPage />}
            <AskCache />
        </div>
    )
}

export default MainPage;