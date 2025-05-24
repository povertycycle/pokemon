import { Sprites } from "../../../interfaces/pokemon";
import { getSprite } from "../../../utils/sprites";
import { BOOKMARK_DATA } from "../header/Bookmarks";
import { ExtraSprites } from "./ExtraSprites";
import { Sound } from "./Sound";

type SpriteViewerProps = {
    sprites: Sprites[];
    cries: string;
};

/**
 * Pokemon sprite viewer
 * @param sprites Sprite list
 * @param cries Pokemon sound
 */
export const SpriteViewer: React.FC<SpriteViewerProps> = ({
    sprites,
    cries,
}) => {
    const mainSprite = getSprite(sprites);
    const { id } = BOOKMARK_DATA.flavor;

    return (
        <>
            <div className="aspect-square relative w-full h-full flex">
                {mainSprite ? (
                    <img
                        id={id}
                        className={`w-full h-full object-contain`}
                        alt=""
                        src={mainSprite}
                    />
                ) : (
                    <i className="ri-question-mark" />
                )}
            </div>
            <div className="absolute bottom-3 right-[10px] flex flex-col gap-3">
                <ExtraSprites sprites={sprites} />
                <Sound cries={cries} />
            </div>
        </>
    );
};
