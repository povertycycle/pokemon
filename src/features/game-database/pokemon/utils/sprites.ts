import { MAIN_SPRITE } from "@/constants/game/main";
import { Sprites } from "../interfaces/pokemon";

/**
 * Small helper function to get sprite url; default is MAIN_SPRITE
 * @param sprites List of pokemon sprites
 */
export function getSprite(
    sprites: Sprites[],
    game?: string
): string | null | undefined {
    return (
        sprites.find((sprite) => sprite.game === (game || MAIN_SPRITE)) ??
        sprites[0]
    )?.url;
}
