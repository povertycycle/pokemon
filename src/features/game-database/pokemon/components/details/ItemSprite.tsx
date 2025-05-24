import { useItemSprite } from "../../hooks/useItemSprite";

/**
 * Item sprite
 */
export const ItemSprite: React.FC<{ id: number; className?: string }> = ({
    id,
    className,
}) => {
    const { name, sprite } = useItemSprite(id);

    return !!sprite ? (
        <>
            <img
                alt=""
                src={sprite}
                className={`${className} inline h-7 aspect-square`}
            />
            <span className="capitalize text-xs sm:text-sm self-center">
                {name}
            </span>
        </>
    ) : (
        <i className="ri-question-mark text-xl" />
    );
};
