import { TYPE_COLORS } from "@/constants/game/colors";

interface PokeTypeProps {
    type: string;
}

/**
 * Type display with darkened type color
 */
export const PokeType: React.FC<PokeTypeProps & { className?: string }> = ({
    type,
    className,
}) => {
    return (
        <div
            className={`overflow-hidden flex items-center justify-center px-3 sm:px-4 ${className}`}
            style={{ background: TYPE_COLORS[type] }}
        >
            {type.toUpperCase()}
        </div>
    );
};
