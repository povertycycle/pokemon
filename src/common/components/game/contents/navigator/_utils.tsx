import { Tab } from "@/constants/enums"
import { BerryTab, CalculatorTab, EvolutionTab, ItemsTab, MachineTab, MovesTab, PokemonTab } from "./Tabs";

type NaviTabProps = {
    tab: Tab;
    size?: number;
}

const NaviTab: React.FC<NaviTabProps> = ({ tab, size }) => {
    switch (tab) {
        case Tab.Pokemon:
            return <PokemonTab size={size} />;
        case Tab.Items:
            return <ItemsTab size={size} />;
        case Tab.Berries:
            return <BerryTab size={size} />;
        case Tab.Moves:
            return <MovesTab size={size} />;
        case Tab.Evolution:
            return <EvolutionTab size={size} />;
        case Tab.Machines:
            return <MachineTab size={size} />;
        case Tab.Calculator:
            return <CalculatorTab size={size} />;
        case Tab.Return:
            return <div className="flex items-center justify-center" style={{ width: `${size ?? 50}px`, height: `${size ?? 50}px` }}><i className="ri-reply-fill" /></div>
        default:
            return null;
    }
}

export default NaviTab;