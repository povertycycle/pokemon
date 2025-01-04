import { Tab } from "@/common/constants/enums";
import { TAB_STATES } from "@/common/constants/main";
import { useState } from "react";
import DisplayContainer from "./contents/DisplayContainer";
import Navigator from "./navigator/Navigator";
import styles from "@/common/styles/transitions.module.scss";

type DatabaseDisplayProps = {
    returnToMain: () => void;
    tabState?: string | null;
}

const DatabaseDisplay: React.FC<DatabaseDisplayProps> = ({ returnToMain, tabState }) => {
    const [tab, setTab] = useState<Tab | null>(tabState ? TAB_STATES[tabState] : null);

    const returnToSelection = (source: Tab) => {
        setTab(null);
    }

    return (
        <div className={`${styles.fadeIn} w-full h-full relative z-1 flex bg-base-white`}>
            <Navigator tab={tab} setTab={setTab} returnToMain={returnToMain} />
            <DisplayContainer tab={tab} returnToSelection={returnToSelection} />
        </div>
    )
}

export default DatabaseDisplay;