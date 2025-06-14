import { InputDebounced } from "@/components/internal/InputDebounced";
import { NavigationLayout } from "@/components/layouts/NavigationLayout";
import { Dispatch, SetStateAction } from "react";

type FilterProps = {
    filter: string;
    setFilter: Dispatch<SetStateAction<string>>;
};

/**
 * Pokemon filter and navigation header
 * @param filter Name filter
 * @param setFilter onChange handler
 */
export const Filter: React.FC<FilterProps> = ({ filter, setFilter }) => {
    return (
        <NavigationLayout route="items">
            <div className="h-full sm:max-w-screen-xs w-full">
                <InputDebounced
                    defaultValue={filter}
                    clearButton
                    placeholder="Find item..."
                    onChange={setFilter}
                />
            </div>
        </NavigationLayout>
    );
};
