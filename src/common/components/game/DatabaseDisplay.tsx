import Navigator, { Tab } from "./navigation/Navigator";
import { useState } from "react";

const DatabaseDisplay: React.FC = () => {
    const [tab, setTab] = useState<Tab | null>(null);

    return (
        <div className="w-full h-full relative z-[1]">
            <Navigator />
        </div>
    )
}

export default DatabaseDisplay;